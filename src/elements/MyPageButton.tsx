import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const MyPageButton = (props) => {
  const history = useHistory();
  const toMyPage = () => {
    history.push(`/mypage`);
  };
  return <MyButton onClick={toMyPage}>내 작성글 보기</MyButton>;
};

const MyButton = styled.div`
  color: #fff;
  cursor: pointer;
`;

export default MyPageButton;
