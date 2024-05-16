import { ReactElement, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { LoginPage } from '../../pages/login-page';
import { RegisterPage } from '../../pages/register-page';
import { useStore } from '../../store/store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useStore(store => store.isAuth);
  return isAuth ? children : <Navigate to="/" />;
};

const privateRoute = (el: ReactElement) => <PrivateRoute>{el}</PrivateRoute>;

const router = createBrowserRouter([
  { path: '/', element: privateRoute(<p>app</p>) },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <h3>Такой страницы не существует</h3> },
]);

export const App = () => {
  const [isInit, setIsInit] = useStore(store => [
    store.isInit,
    store.setIsInit,
  ]);
  const checkAuth = useStore(store => store.checkAuth);

  useEffect(() => {
    if (isInit) return;
    if (!localStorage.getItem('token')) return setIsInit(true);
    checkAuth();
  }, []);

  if (!isInit) return <p>Loading...</p>;

  return <RouterProvider router={router} />;
};
