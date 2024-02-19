import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCard from '../components/InfoCard.jsx';

describe('InfoCard Component render', () => {
  test('renders without crashing', () => {
    render(<InfoCard />);
  });

  test('Get More Details text exists', async () => {
    render(<InfoCard />);
    expect(screen.getByText('Get More Details...')).toBeInTheDocument();
  });
});
