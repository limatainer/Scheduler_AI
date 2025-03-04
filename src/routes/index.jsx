import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// Layouts

// Pages
import Home from '../pages/Home';
import HomeUser from '../pages/HomeUser';
import Schedules from '../pages/Schedules';
import Request from '../pages/Requester';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/error-page';
import Root from '../routes/root';

// Protected route component
const ProtectedRoute = ({ element }) => {
  const { user } = useAuthContext();
  return user ? element : <Navigate to="/login" />;
};
const HomeRoute = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/homeuser" /> : <Home />;
};

// Create and export the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <HomeRoute />,
      },
      {
        path: '/homeuser',
        element: <ProtectedRoute element={<HomeUser />} />,
      },
      {
        path: '/request',
        element: <ProtectedRoute element={<Request />} />,
      },
      {
        path: '/schedule',
        element: <ProtectedRoute element={<Schedules />} />,
      },
      {
        path: '/schedule/:id',
        element: <ProtectedRoute element={<Schedules />} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
