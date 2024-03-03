import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

//CONTEXT
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';

// ROUTER DOM
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

//STYLE
import './index.css';

//ROUTES / ROOT
import Root from './routes/root';

//ROUTES / PAGES
import Home from './routes/Home';
import ErrorPage from './routes/error-page';
import Schedules from './routes/Schedules';
import Requester from './routes/Requester';
import Login from './routes/Login';
import Signup from './routes/Signup';
import HomeUser from './routes/HomeUser';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuthContext();

  return user ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/homeuser',
        element: <HomeUser />,
      },
      {
        path: '/request',
        element: <ProtectedRoute element={<Requester />} />,
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
