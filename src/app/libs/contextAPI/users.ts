import { createContext } from 'react';

export const UserContext = createContext({
  isLogin: false,
  setState: (state: boolean) => {},
});
