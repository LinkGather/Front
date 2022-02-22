import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contextAPI/users';
import Header from '../components/Header';
import { isToken } from '../util/getToken';
import { AppRouter } from './routes';

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
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
