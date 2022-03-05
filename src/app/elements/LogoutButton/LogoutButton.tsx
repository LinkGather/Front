import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../libs/contextAPI';

const LogoutButton = styled.div`
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
  @media (max-width: 767px) {
    margin-left: 10%;
  }
  @media (max-width: 575px) {
    margin-left: 8px;
  }
`;

const Logout = () => {
  const { setState } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setState(false);
  };
  return <LogoutButton onClick={logout}>로그아웃</LogoutButton>;
};

export { Logout };
