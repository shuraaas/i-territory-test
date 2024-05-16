import { ReactElement, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { Home } from '../../pages/home-page';
import { LoginPage } from '../../pages/login-page';
import { RegisterPage } from '../../pages/register-page';

import { useAuthStore } from '../../store/authStore';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuthStore(store => store.isAuth);
  return isAuth ? children : <Navigate to="/" />;
};

const privateRoute = (el: ReactElement) => <PrivateRoute>{el}</PrivateRoute>;

const router = createBrowserRouter([
  { path: '/', element: privateRoute(<Home />) },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <h3>Такой страницы не существует</h3> },
]);

export const App = () => {
  const [isInit, setIsInit] = useAuthStore(store => [
    store.isInit,
    store.setIsInit,
  ]);
  const checkAuth = useAuthStore(store => store.checkAuth);

  useEffect(() => {
    if (isInit) return;
    if (!localStorage.getItem('token')) return setIsInit(true);
    checkAuth();
  }, []);

  if (!isInit) return <p>Loading...</p>;

  return <RouterProvider router={router} />;
};
