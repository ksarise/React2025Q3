import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

vi.mock('react-icons/fa', () => ({
  FaChevronLeft: () => <span>LeftIcon</span>,
  FaChevronRight: () => <span>RightIcon</span>,
}));

describe('Pagination', () => {
  const onPrev = vi.fn();
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders current page and total pages correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('should renders Previous and Next buttons with correct icons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('LeftIcon')).toBeInTheDocument();
    expect(screen.getByText('RightIcon')).toBeInTheDocument();
  });

  it('should disables Previous button when on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass(
      'bg-gray-200 text-gray-500 cursor-not-allowed'
    );
  });

  it('should disables Next button when on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass(
      'bg-gray-200 text-gray-500 cursor-not-allowed'
    );
  });

  it('should enables both buttons when on middle page', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(prevButton).not.toBeDisabled();
    expect(prevButton).toHaveClass('bg-gray-400 text-black');

    expect(nextButton).not.toBeDisabled();
    expect(nextButton).toHaveClass('bg-gray-400 text-black');
  });

  it('should calls onPrev when Previous button is clicked and enabled', async () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByText('Previous');
    await userEvent.click(prevButton);

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).not.toHaveBeenCalled();
  });

  it('should calls onNext when Next button is clicked and enabled', async () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).not.toHaveBeenCalled();
  });

  it('should  not call onPrev when Previous button is disabled', async () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevButton = screen.getByText('Previous');
    await userEvent.click(prevButton);

    expect(onPrev).not.toHaveBeenCalled();
  });

  it('should not call onNext when Next button is disabled', async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);

    expect(onNext).not.toHaveBeenCalled();
  });

  it('should renders correct aria-labels for accessibility', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    expect(screen.getByText('Previous')).toHaveAttribute(
      'aria-label',
      'Previous page'
    );
    expect(screen.getByText('Next')).toHaveAttribute('aria-label', 'Next page');
  });
});
