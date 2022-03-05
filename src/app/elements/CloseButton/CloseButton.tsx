import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseButtonProps } from '../../libs/interfaces';

const Close = styled.button`
  position: fixed;
  font-size: 25px;
  top: -35px;
  right: -3px;
  border: 0;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
`;

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { _onClick } = props;
  return (
    <Close>
      <AiOutlineClose className="handleModal" onClick={_onClick} />
    </Close>
  );
};

export { CloseButton };
