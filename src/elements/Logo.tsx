import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TitleImg } from '../images/TitleLogo.svg';
import styled from 'styled-components';

const Logo = () => {
  return (
    <ImgBox>
      <Link to={'/'}>
        <TitleImg style={{ width: '95%', height: '95%' }} />
      </Link>
    </ImgBox>
  );
};

const ImgBox = styled.div`
  display: inline-block;
  height: 50px;
  margin-right: 60px;
  padding: 10px 0;
`;

export default Logo;
