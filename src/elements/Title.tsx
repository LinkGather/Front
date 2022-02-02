import * as React from 'react';
import styled from 'styled-components';
import { TitleProps } from '../interfaces/props';

const Title: React.FC<TitleProps> = (props) => {
  const { text } = props;
  return <T className="handleModal">{text}</T>;
};

const T = styled.div`
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: -0.6px;
`;

export default Title;
