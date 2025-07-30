import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';
import type { SearchProps } from '../../types';

describe('Search Component', () => {
  const mockOnQuery = vi.fn();
  const defaultProps: SearchProps = {
    onQuery: mockOnQuery,
    initialQuery: '',
  };
  const renderSearch = (props: Partial<SearchProps> = {}) => {
    return render(<Search {...defaultProps} {...props} />);
  };

  it('Search input', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Search for tracks, artists..');
    expect(input).toBeDefined();
  });

  it('Search button', () => {
    renderSearch();
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });

  it('updates Search input value on change', () => {
    renderSearch();
    const input = screen.getByPlaceholderText(
      'Search for tracks, artists..'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toEqual('new value');
  });

  it('updates query when initialQuery prop changes', () => {
    const { rerender } = renderSearch({ initialQuery: 'initial' });
    const input = screen.getByPlaceholderText(
      'Search for tracks, artists..'
    ) as HTMLInputElement;
    expect(input.value).toEqual('initial');
    rerender(<Search {...defaultProps} initialQuery="updated" />);
    expect(input.value).toEqual('updated');
  });

  it('Search bar button click', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Search for tracks, artists..');
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(button);
    expect(mockOnQuery).toHaveBeenCalledWith({ query: 'search term' });
  });
  it('search bar enter key press', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Search for tracks, artists..');
    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnQuery).toHaveBeenCalledWith({ query: 'search term' });
  });
});
