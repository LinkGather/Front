import React from 'react';
import styled from 'styled-components';

const GridEl = styled.div`
  width: 1176px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px 20px;
  align-items: start;
  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Grid: React.FC = (props) => {
  const { children } = props;
  return <GridEl>{children}</GridEl>;
};

export { Grid };
