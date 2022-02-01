import React from 'react';
import styled from 'styled-components';
import { BsFillChatFill } from 'react-icons/bs';

function Kakao(props) {
  const a = () => {
    window.location.href = 'http://localhost:3001/users/kakao';
  };
  return (
    <Kbutton onClick={a}>
      <BsFillChatFill />
      <span>카카오 로그인</span>
    </Kbutton>
  );
}

const Kbutton = styled.button`
  display: flex;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  padding: 20px;
  font-size: 16px;
  font-weight: 700;
  border: 0;
  border-radius: 3px;
  background-color: #faef3f;
  align-items: center;
  justify-content: center;
  & span {
    margin-left: 10px;
  }
`;

export default Kakao;
