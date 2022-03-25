import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { publicRoutes, privateRoutes } from '../router';
import Posts from '../components/pages/Posts';

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
          exact={route.exact}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
          exact={route.exact}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
