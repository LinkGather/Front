import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import Logo from '../elements/Logo';
import Logout from '../elements/LogoutButton';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { UserContext } from '../contextAPI/users';
import { GrSearch } from 'react-icons/gr';
import MyPageButton from '../elements/MyPageButton';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
  let { isLogin } = useContext(UserContext);

  //ref
  const searchRef = useRef();

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

  const enterSearch = (e) => {
    if (e.key === 'Enter') {
      search();
    }
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
              <>
                <SignUpModal />
                <LoginModal />
              </>
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
  z-index: 2;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #000;
`;

const SearchInput = styled.input`
  width: 260px;
  height: 34px;
  padding-left: 20px;
  outline: none;
  border-radius: 22px;
`;

const SearchIcon = styled.div`
  margin-left: -30px;
  cursor: pointer;
`;

const MemberBox = styled.div`
  flex: 1;
  display: flex;
  font-size: 14px;
  justify-content: flex-end;
  align-items: center;
`;

const Box = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export default Header;
