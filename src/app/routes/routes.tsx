import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IndexScreen, LoginScreen, MyPageScreen, SearchScreen, SignUpScreen } from '../screens';
import { ROUTE_ROOT, ROUTE_LOGIN, ROUTE_MYPAGE, ROUTE_SEARCH, ROUTE_SIGNUP } from './const';

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
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_ROOT} component={IndexScreen} />
        <Route path={ROUTE_SIGNUP} component={SignUpScreen} />
        <Route path={ROUTE_LOGIN} component={LoginScreen} />
        <Route path={ROUTE_MYPAGE} component={MyPageScreen} />
        <Route path={ROUTE_SEARCH} component={SearchScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export { AppRouter };
