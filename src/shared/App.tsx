import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../contextAPI/users';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import { isToken } from '../util/getToken';

function App() {
  console.log(
    '%c                ',
    'font-size:100px; background:url(https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png) no-repeat center;'
  );
  console.log(
    '%c  Link Gather  ',
    'font-size: 100px; font-weight:bolder; background-color:black; color:rgb(255,255,255,1);'
  );
  const [isLogin, setIsLogin] = useState(false);
  const setState = (state: boolean) => setIsLogin(state);
  const history = useHistory();
  useEffect(() => {
    setState(isToken());
  }, []);

  if (window.location.pathname.includes('social')) {
    const token = window.location.pathname.split('=')[1];
    localStorage.setItem('token', token);
    history.replace('/');
  }

  return (
    <UserContext.Provider value={{ isLogin, setState }}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
