import * as React from 'react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';
import Logo from '../elements/Logo';
import Logout from '../elements/LogoutButton';
import { UserContext } from '../contextAPI/users';
import { GrSearch } from 'react-icons/gr';
import MyPageButton from '../elements/MyPageButton';
import { useHistory } from 'react-router-dom';

const Header = () => {
  let { isLogin } = useContext(UserContext);

  //ref
  const searchRef = useRef<HTMLInputElement>();

  //useHistroy
  const history = useHistory();

  //search
  const search = () => {
    if (history.location.pathname === '/search') {
      window.location.replace(`/search?words=${searchRef.current.value}`);
    } else {
      history.push(`/search?words=${searchRef.current.value}`);
    }
  };

  const enterSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const goLogin = () => {
    history.push('/login');
  };

  return (
    <Head>
      <Container>
        <Box>
          <Logo />
          <SearchInput
            type="text"
            placeholder="검색어 입력"
            ref={searchRef}
            onKeyPress={enterSearch}
          />
          <SearchIcon onClick={search}>
            <GrSearch />
          </SearchIcon>
          <MemberBox>
            {isLogin ? (
              <>
                <MyPageButton />
                <Logout />
              </>
            ) : (
              <LoginButton onClick={goLogin}>로그인</LoginButton>
            )}
          </MemberBox>
        </Box>
      </Container>
    </Head>
  );
};

const Head = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #000;
  @media (max-width: 1200px) {
    padding: 0 15px;
    box-sizing: border-box;
  }
`;

const SearchInput = styled.input`
  width: 260px;
  height: 34px;
  padding-left: 20px;
  outline: none;
  border-radius: 22px;
  @media (max-width: 767px) {
    width: 35%;
  }
  @media (max-width: 575px) {
    width: 30%;
    padding-left: 15px;
  }
`;

const SearchIcon = styled.div`
  margin-left: -30px;
  cursor: pointer;
  @media (max-width: 575px) {
    margin-left: -25px;
  }
`;

const MemberBox = styled.div`
  flex: 1;
  display: flex;
  font-size: 14px;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 575px) {
    font-size: 12px;
  }
`;

const LoginButton = styled.div`
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
  @media (max-width: 767px) {
    margin-left: 10%;
  }
  @media (max-width: 575px) {
    margin-left: 8px;
  }
`;

const Box = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export default Header;
