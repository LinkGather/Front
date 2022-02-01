import React, { useContext, useRef, useState } from 'react';
import Title from '../elements/Title';
import Button from '../elements/Button';
import styled from 'styled-components';
import { loginApi } from '../axios/axios';
import { UserContext } from '../contextAPI/users';
import CloseButton from '../elements/CloseButton';
import Kakao from '../elements/Kakao';

const LoginModal = (props) => {
  //modal state
  const [open, setOpen] = useState(false);

  //로그인 정보 state
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //err state
  const [loginErr, setLoginErr] = useState(false);
  const [emailNull, setEmailNull] = useState(false);
  const [passwordNull, setPasswordNull] = useState(false);

  //ref
  const emailRef = useRef();
  const passwordRef = useRef();

  //useContext
  const { setState } = useContext(UserContext);

  //input onChange event
  const emailChange = (e) => {
    const EMAIL = e.target.value;
    setEmail(EMAIL);
  };

  const passwordChange = (e) => {
    const PASSWORD = e.target.value;
    setPassword(PASSWORD);
  };

  //modal controll
  const handleLoginModal = (e) => {
    if (e.target.className.includes('handleModal')) {
      setOpen(!open);
      setLoginErr(false);
    }
  };

  //login submit
  const login = async () => {
    const data = {
      email,
      password,
    };
    if (!email) {
      setEmailNull(true);
      setLoginErr(false);
      setPasswordNull(false);
      emailRef.current.focus();
      return;
    }
    if (!password) {
      setPasswordNull(true);
      setEmailNull(false);
      setLoginErr(false);
      passwordRef.current.focus();
      return;
    }
    const res = await loginApi(data);

    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      setState(true);
      setOpen(!open);
    } else {
      setEmailNull(false);
      setPasswordNull(false);
      setLoginErr(true);
    }
  };
  const enterLogin = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <>
      <ModalButton className="handleModal" onClick={handleLoginModal}>
        로그인
      </ModalButton>
      {open ? (
        <GrayBackground className="handleModal" onClick={handleLoginModal}>
          <PopUpWrap>
            <Title text={'로그인'} />
            <CloseButton _onClick={handleLoginModal} />
            <>
              <InputWrap>
                <Label>이메일</Label>
                <InputEl
                  type="text"
                  placeholder="example@example.com"
                  ref={emailRef}
                  onChange={emailChange}
                  onKeyPress={enterLogin}
                />
                {emailNull ? <ErrMessage>이메일을 입력해주세요</ErrMessage> : null}
              </InputWrap>
              <InputWrap>
                <Label>패스워드</Label>
                <InputEl
                  type="password"
                  placeholder="********"
                  ref={passwordRef}
                  onChange={passwordChange}
                  onKeyPress={enterLogin}
                />
                {passwordNull ? <ErrMessage>패스워드를 입력해주세요</ErrMessage> : null}
                {loginErr ? <ErrMessage>이메일 및 패스워드를 확인해주세요</ErrMessage> : null}
              </InputWrap>
              <Button isFill={false} _onClick={login}>
                로그인
              </Button>
              <Kakao />
            </>
          </PopUpWrap>
        </GrayBackground>
      ) : null}
    </>
  );
};

const ModalButton = styled.div`
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
`;

const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const PopUpWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  z-index: 10;
  width: 370px;
  padding: 50px 60px;
  background-color: #fff;
`;

const InputWrap = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const InputEl = styled.input`
  padding: 15px 10px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  width: 350px;
`;

const ErrMessage = styled.span`
  font-size: 0.6em;
  color: #ff6b6b;
`;

export default LoginModal;
