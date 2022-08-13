/* eslint-disable import/no-cycle */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MYPAGE } from '../../routes';

const MyButton = styled.div`
  color: #fff;
  cursor: pointer;
`;

const MyPageButton = () => {
  const navigate = useNavigate();
  const toMyPage = () => {
    navigate(ROUTE_MYPAGE);
  };
  return <MyButton onClick={toMyPage}>내 작성글 보기</MyButton>;
};

export { MyPageButton };
