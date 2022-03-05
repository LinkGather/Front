import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_MYPAGE } from '../../routes';
import styled from 'styled-components';

const MyButton = styled.div`
  color: #fff;
  cursor: pointer;
`;

const MyPageButton = () => {
  const history = useHistory();
  const toMyPage = () => {
    history.push(ROUTE_MYPAGE);
  };
  return <MyButton onClick={toMyPage}>내 작성글 보기</MyButton>;
};

export { MyPageButton };
