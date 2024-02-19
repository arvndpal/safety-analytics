import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header.jsx';

describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('Welcome text exist in container', async () => {
    render(<Header />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
