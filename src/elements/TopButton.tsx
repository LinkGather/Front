import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as TopArrow } from '../images/TopArrow.svg';

const TopButton = () => {
  const toTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <TopDiv onClick={toTop}>
      <TopArrow />
    </TopDiv>
  );
};

const TopDiv = styled.div`
  position: fixed;
  cursor: pointer;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  z-index: 10;
  @media (max-width: 575px) {
    position: fixed;
    cursor: pointer;
    bottom: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
  }
`;

export default TopButton;
