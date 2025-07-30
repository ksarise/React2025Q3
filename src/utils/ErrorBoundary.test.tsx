// ErrorBoundary.test.tsx
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { Component } from 'react';

describe('ErrorBoundary Component', () => {
  class ErrorComponent extends Component {
    render() {
      throw new Error('Test error');
      return <div> not render</div>;
    }
  }

  const FallbackComponent = () => <div>Something went wrong</div>;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should displays fallback UI when child component throws error', () => {
    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should logs error to console when error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain(
      'Error: Uncaught [Error: Test error]'
    );
    expect(consoleErrorSpy.mock.calls[0][1]).toBeInstanceOf(Error);
  });
});
