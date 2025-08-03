import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import userEvent from '@testing-library/user-event';
import { vi, expect, describe, it } from 'vitest';

const Consumer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <p>{theme}</p>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('should throws error when used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow('theme error');
    spy.mockRestore();
  });

  it('should provides default dark theme and toggles it', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    await user.click(screen.getByText('Set Light'));
    expect(screen.getByText('light')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    await user.click(screen.getByText('Set Dark'));
    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
