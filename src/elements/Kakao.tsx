import * as React from 'react';
import styled from 'styled-components';
import { BsFillChatFill } from 'react-icons/bs';

function Kakao() {
  const a = () => {
    window.location.href = 'https://linkgather.shop/users/kakao';
  };
  return (
    <Kbutton onClick={a}>
      <BsFillChatFill />
    </Kbutton>
  );
}

const Kbutton = styled.button`
  display: flex;
  width: 44px;
  margin: 10px 10px 0 0;
  cursor: pointer;
  height: 44px;
  font-size: 16px;
  font-weight: 700;
  border: 0;
  border-radius: 50%;
  background-color: #faef3f;
  align-items: center;
  justify-content: center;
  & span {
    margin-left: 10px;
  }
`;

export default Kakao;
