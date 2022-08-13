/* eslint-disable import/no-cycle */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IndexScreen, LoginScreen, MyPageScreen, SearchScreen, SignUpScreen } from '../screens';
import { ROUTE_ROOT, ROUTE_LOGIN, ROUTE_MYPAGE, ROUTE_SEARCH, ROUTE_SIGNUP, ROUTE_SOCIAL } from './const';

function AppRouter() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // formik

  // query hooks

  // calculated values

  // effects

  // handlers
  return (
    <Routes>
      <Route path={ROUTE_ROOT} element={<IndexScreen />} />
      <Route path={ROUTE_SIGNUP} element={<SignUpScreen />} />
      <Route path={ROUTE_LOGIN} element={<LoginScreen />} />
      <Route path={ROUTE_MYPAGE} element={<MyPageScreen />} />
      <Route path={ROUTE_SEARCH} element={<SearchScreen />} />
      <Route path={ROUTE_SOCIAL} element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export { AppRouter };
