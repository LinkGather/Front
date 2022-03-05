import React from 'react';
import styled from 'styled-components';

const End = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FlexEnd: React.FC = (props) => {
  const { children } = props;
  return <End>{children}</End>;
};

export { FlexEnd };
