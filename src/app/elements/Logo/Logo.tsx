import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as TitleImg } from '../../../assets/images/TitleLogo.svg';

const ImgBox = styled.div`
  display: inline-block;
  height: 50px;
  margin-right: 60px;
  padding: 10px 0;
  @media (max-width: 575px) {
    margin-right: 15px;
  }
`;
const Logo = () => {
  return (
    <ImgBox>
      <Link to={'/'}>
        <TitleImg style={{ width: '95%', height: '95%' }} />
      </Link>
    </ImgBox>
  );
};

export { Logo };
