import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { UserContext } from '../contextAPI/users';
import Header from '../components/Header';
import LoginPage from '../pages/LoginPage';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import SignupPage from '../pages/SignupPage';
import { isToken } from '../util/getToken';

function App() {
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
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
