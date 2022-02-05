import * as React from 'react';
import styled from 'styled-components';
import { TitleProps } from '../interfaces/props';

const Title: React.FC<TitleProps> = (props) => {
  const { text } = props;
  return <T>{text}</T>;
};

const T = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 44px;
  letter-spacing: -0.6px;
`;

export default Title;
