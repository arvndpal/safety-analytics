import { createBrowserRouter } from 'react-router-dom';

import { RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Transcripts from './pages/transcripts/Transcripts';
import MyCourses from './pages/my-courses/MyCourses';
import NavbarWrapper from './components/NavbarWrapper';

const MainRouter = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },

    {
      path: '/dashboard',
      element: (
        <NavbarWrapper>
          <Dashboard />
        </NavbarWrapper>
      ),
    },

    {
      path: '/my-courses',
      element: (
        <NavbarWrapper>
          <MyCourses />
        </NavbarWrapper>
      ),
    },

    {
      path: '/transcripts',
      element: (
        <NavbarWrapper>
          <Transcripts />
        </NavbarWrapper>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default MainRouter;
