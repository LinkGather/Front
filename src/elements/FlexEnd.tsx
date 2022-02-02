import * as React from 'react';
import styled from 'styled-components';

const FlexEnd: React.FC = (props) => {
  const { children } = props;
  return <End>{children}</End>;
};

const End = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default FlexEnd;
