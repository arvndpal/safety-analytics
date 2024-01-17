import { createBrowserRouter } from 'react-router-dom';

import { RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NavbarSisdebarWrapper from './components/shared/NavbarSidebarWrapper';
import UserManagement from './pages/user-management/UserManagement';
import NotFound from './pages/404/NotFound';
import CompetitiveAnalysis from './pages/competitive-analysis/CompetitiveAnalysis';

const MainRouter = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/user-management',
      element: (
        <NavbarSisdebarWrapper>
          <UserManagement />
        </NavbarSisdebarWrapper>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <NavbarSisdebarWrapper>
          <Dashboard />
        </NavbarSisdebarWrapper>
      ),
    },
    {
      path: '/competative-analysis',
      element: (
        <NavbarSisdebarWrapper>
          <CompetitiveAnalysis />
        </NavbarSisdebarWrapper>
      ),
    },
    {
      path: '*',
      element: (
        <NavbarSisdebarWrapper>
          <NotFound />
        </NavbarSisdebarWrapper>
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
