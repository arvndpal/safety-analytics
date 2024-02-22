import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Siderbar.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const Mocktest = () => {
  return (
    <Router>
      <Sidebar />
    </Router>
  );
};
describe('Siderbar Component', () => {
  test('renders without crashing', () => {
    render(<Mocktest />);
  });

  const customPathname = '/dashboard';

  render(
    <MemoryRouter initialEntries={[customPathname]}>
      <Routes>
        <Route path='/dashboard' element={<Sidebar />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText('Dashboard')).toBeInTheDocument();

  expect(screen.getByText('Transcripts')).toBeInTheDocument();
  expect(screen.getByText('My Courses')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
