import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contextAPI/users';

const Logout = (props) => {
  const { setState } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setState(false);
  };
  return <LogoutButton onClick={logout}>로그아웃</LogoutButton>;
};

const LogoutButton = styled.div`
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
`;

export default Logout;
