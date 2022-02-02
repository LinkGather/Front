import * as React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseButtonProps } from '../interfaces/props';

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { _onClick } = props;
  return (
    <Close className="handleModal" onClick={_onClick}>
      <AiOutlineClose />
    </Close>
  );
};

const Close = styled.button`
  position: fixed;
  font-size: 25px;
  top: -35px;
  right: 0px;
  border: 0;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
`;

export default CloseButton;
