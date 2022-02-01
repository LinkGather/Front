import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { children } = props;
  return <GridEl>{children}</GridEl>;
};

const GridEl = styled.div`
  width: 1176px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px 20px;
  align-items: start;
`;

export default Grid;
