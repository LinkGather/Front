/* eslint-disable import/no-cycle */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRepository } from '../../repositories';
import { Button, Title } from '../../elements';

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

const InputWrap = styled.div`
  margin-bottom: 20px;
`;

const DivLine = styled.div`
  padding-top: 18px;
  border-top: 4px solid #000;
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

const ErrMessage = styled.span`
  font-size: 0.6em;
  color: #ff6b6b;
`;

const InfoMessage = styled.span`
  font-size: 0.6em;
  color: #333;
`;

const SignUp = () => {
  const navigate = useNavigate();
  // 회원가입 정보 state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 에러처리 state
  const [nameErr, setNameErr] = useState(false);
  const [nameNull, setNameNull] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailNull, setEmailNull] = useState(false);
  const [emailDupErr, setEmailDupErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordNull, setPasswordNull] = useState(false);
  const [passwordCheckErr, setPasswordCheckErr] = useState(false);
  const [passwordCheckNull, setPasswordCheckNull] = useState(false);

  // Ref
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  // input onChange event
  const nameChange = (e: React.ChangeEvent<HTMLElement>) => {
    const NAME = (e.target as HTMLInputElement).value;
    setName(NAME);
  };
  const emailChange = (e: React.ChangeEvent<HTMLElement>) => {
    const EMAIL = (e.target as HTMLInputElement).value;
    setEmail(EMAIL);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLElement>) => {
    const PASSWORD = (e.target as HTMLInputElement).value;
    setPassword(PASSWORD);
  };
  const passwordCheckChange = (e: React.ChangeEvent<HTMLElement>) => {
    const PASSWORDCHECK = (e.target as HTMLInputElement).value;
    setPasswordCheck(PASSWORDCHECK);
  };

  // signup submit
  const SignUp = async () => {
    const data = {
      name,
      email,
      password,
      passwordCheck,
    };
    if (!name) {
      setNameNull(true);
      setPasswordCheckNull(false);
      setPasswordNull(false);
      setEmailNull(false);
      nameRef.current?.focus();
      return;
    }
    if (!email) {
      setEmailNull(true);
      setPasswordCheckNull(false);
      setPasswordNull(false);
      setNameNull(false);
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setPasswordNull(true);
      setPasswordCheckNull(false);
      setEmailNull(false);
      setNameNull(false);
      passwordRef.current?.focus();
      return;
    }
    if (!passwordCheck) {
      setPasswordCheckNull(true);
      setPasswordNull(false);
      setEmailNull(false);
      setNameNull(false);
      passwordCheckRef.current?.focus();
      return;
    }
    const res = await userRepository.signUp(data);
    if (res.success) {
      alert('회원가입 성공');
      setNameErr(false);
      setNameNull(false);
      setEmailDupErr(false);
      setEmailNull(false);
      setEmailErr(false);
      setPasswordErr(false);
      setPasswordNull(false);
      setPasswordCheckErr(false);
      setPasswordCheckNull(false);
      navigate('/login');
    } else if (!res.success) {
      if (res.msg === '이메일이 중복됩니다.') {
        setEmailDupErr(true);
        setEmailErr(false);
        emailRef.current?.focus();
      } else if (res.msg === '이메일을 확인해주세요') {
        setEmailErr(true);
        setEmailDupErr(false);
        emailRef.current?.focus();
      } else if (res.msg === '비밀번호 체크란을 확인해주세요') {
        setPasswordCheckErr(true);
        setEmailDupErr(false);
        passwordCheckRef.current?.focus();
      } else if (res.msg === '비밀번호를 확인해주세요') {
        setPasswordErr(true);
        setEmailDupErr(false);
        passwordRef.current?.focus();
      }
    }
  };

  return (
    <PopUpWrap>
      <Title text={'회원가입'} />
      <DivLine />
      <InputWrap>
        <Label>이름</Label>
        <InputEl type="text" placeholder="홍길동" ref={nameRef} onChange={nameChange} />
        {nameErr && <ErrMessage>이름을 확인해주세요</ErrMessage>}
        {nameNull && <ErrMessage>이름을 입력해주세요</ErrMessage>}
      </InputWrap>

      <InputWrap>
        <Label>이메일</Label>
        <InputEl type="text" placeholder="example@example.com" ref={emailRef} onChange={emailChange} />
        {emailDupErr ? <ErrMessage>중복된 이메일입니다.</ErrMessage> : null}
        {emailErr ? <ErrMessage>이메일 형식을 확인해주세요</ErrMessage> : null}
        {emailNull ? <ErrMessage>이메일을 입력해주세요</ErrMessage> : null}
      </InputWrap>

      <InputWrap>
        <Label>패스워드</Label>
        <InputEl type="password" placeholder="********" ref={passwordRef} onChange={passwordChange} />
        {!passwordNull && passwordErr && <InfoMessage>패스워드는 영문,숫자,특수문자 포함 8~16자 입니다. </InfoMessage>}
        {passwordErr ? <ErrMessage>패스워드를 확인해주세요(영문+숫자+특수문자, 8~16글자)</ErrMessage> : null}
        {passwordNull ? <ErrMessage>패스워드를 입력해주세요</ErrMessage> : null}
      </InputWrap>

      <InputWrap>
        <Label>패스워드 확인</Label>
        <InputEl type="password" placeholder="********" ref={passwordCheckRef} onChange={passwordCheckChange} />
        {passwordCheckErr ? <ErrMessage>패스워드를 확인해주세요</ErrMessage> : null}
        {passwordCheckNull ? <ErrMessage>패스워드 확인을 입력해주세요</ErrMessage> : null}
      </InputWrap>

      <Button isFill={false} _onClick={SignUp}>
        회원가입
      </Button>
    </PopUpWrap>
  );
};

export { SignUp };
