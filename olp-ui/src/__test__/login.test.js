import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../pages/login/Login.jsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const Mocktest = () => {
  return (
    <Router>
      <Login />
    </Router>
  );
};
describe('Login Component', () => {
  test('renders without crashing', () => {
    render(<Mocktest />);
  });

  test('allows users to input username and password', async () => {
    render(<Mocktest />);
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(usernameInput, { target: { value: 'arvind@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Arvind@123' } });

    expect(usernameInput.value).toBe('arvind@gmail.com');
    expect(passwordInput.value).toBe('Arvind@123');
  });

  test('displays error message on invalid login attempt', async () => {
    render(<Mocktest />);
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getAllByText('Login')[0];
    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    fireEvent.click(loginButton);
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
  });

  test('Keep me looged in exist', async () => {
    render(<Mocktest />);
    expect(screen.getByText('Keep me looged in')).toBeInTheDocument();
  });

  test('Forgot password?', async () => {
    render(<Mocktest />);
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  test('Login with', async () => {
    render(<Mocktest />);
    expect(screen.getByText('Login with')).toBeInTheDocument();
  });
});
