import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import { UserContext } from './libs/contextAPI';
import { isToken } from './libs/util/getToken';
import { AppRouter } from './routes';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const setState = (state: boolean) => setIsLogin(state);
  useEffect(() => {
    setState(isToken());
  }, []);

  if (window.location.pathname.includes('social')) {
    const token = window.location.pathname.split('=')[1];
    localStorage.setItem('token', token);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLogin, setState }}>
        <Header />
        <AppRouter />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
