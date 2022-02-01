import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TopArrow } from '../images/TopArrow.svg';

const TopButton = (props) => {
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
`;

export default TopButton;
