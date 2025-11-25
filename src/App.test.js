import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add New Expense button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Add New Expense/i);
  expect(buttonElement).toBeInTheDocument();
});
