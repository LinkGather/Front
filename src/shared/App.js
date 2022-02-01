import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../contextAPI/users';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import { isToken } from '../util/getToken';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const setState = (state) => setIsLogin(state);
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
