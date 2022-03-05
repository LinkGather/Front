import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { userRepository } from '../../repositories';
import { UserContext } from '../../libs/contextAPI';
import { Button, Kakao, Title } from '../../elements';
import { ROUTE_SIGNUP } from '../../routes';

const PopUpWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  z-index: 10;
  width: 490px;
  padding: 50px 60px;
  background-color: #fff;
  box-sizing: border-box;
  @media (max-width: 767px) {
    width: 80%;
    min-width: auto;
  }
  @media (max-width: 575px) {
    padding: 20px;
  }
`;

const DivLine = styled.div`
  padding-top: 18px;
  border-top: 4px solid #000;
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
  width: 100%;
  box-sizing: border-box;
`;

const SocialWrap = styled.div`
  margin: 35px 0 80px;
  text-align: center;
  box-sizing: border-box;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const ToSignup = styled.div`
  height: 56px;
  border: 1px solid #dee2e6;
  border-radius: 28px;
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
  text-align: center;
  line-height: 56px;
  cursor: pointer;
`;

const ErrMessage = styled.span`
  font-size: 0.6em;
  color: #ff6b6b;
`;

const Login = () => {
  const history = useHistory();

  // 로그인 정보 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // err state
  const [loginErr, setLoginErr] = useState(false);
  const [emailNull, setEmailNull] = useState(false);
  const [passwordNull, setPasswordNull] = useState(false);

  // ref
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useContext
  const { setState } = useContext(UserContext);

  // input onChange event
  const emailChange = (e: React.ChangeEvent<HTMLElement>) => {
    const EMAIL = (e.target as HTMLInputElement).value;
    setEmail(EMAIL);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLElement>) => {
    const PASSWORD = (e.target as HTMLInputElement).value;
    setPassword(PASSWORD);
  };

  // login submit
  const login = async () => {
    const data = {
      email,
      password,
    };
    if (!email) {
      setEmailNull(true);
      setLoginErr(false);
      setPasswordNull(false);
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setPasswordNull(true);
      setEmailNull(false);
      setLoginErr(false);
      passwordRef.current?.focus();
      return;
    }
    const res = await userRepository.login(data);

    if (res.success) {
      localStorage.setItem('token', res.token);
      setState(true);
      history.push('/');
    } else {
      setEmailNull(false);
      setPasswordNull(false);
      setLoginErr(true);
    }
  };
  const enterLogin = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  const goSignUp = () => {
    history.push(ROUTE_SIGNUP);
  };

  return (
    <PopUpWrap>
      <Title text={'로그인'} />
      <DivLine />
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
        <SocialWrap>
          <span>SNS 계정으로 로그인하기</span>
          <IconWrap>
            <Kakao />
          </IconWrap>
        </SocialWrap>
        <ToSignup onClick={goSignUp}>계정이 없으신가요? 간편가입하기</ToSignup>
      </>
    </PopUpWrap>
  );
};

export { Login };
