import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardContent from '../pages/dashboard/DashboardContent.jsx';

describe('Dashboard Component', () => {
  test('renders without crashing', () => {
    render(<DashboardContent />);
  });

  test('My Info exist in container', async () => {
    render(<DashboardContent />);
    expect(screen.getByText('My Info')).toBeInTheDocument();
  });
  test('School Info exist in container', async () => {
    render(<DashboardContent />);
    expect(screen.getByText('School Info')).toBeInTheDocument();
  });
  test('Contact Info exist in container', async () => {
    render(<DashboardContent />);
    expect(screen.getByText('Contact Info')).toBeInTheDocument();
  });
  test('Course Registration exist in container', async () => {
    render(<DashboardContent />);
    expect(screen.getByText('Course Registration')).toBeInTheDocument();
  });
});
