import React, { useEffect, useRef, useState } from 'react';
import Button from '../elements/Button';
import Title from '../elements/Title';
import styled from 'styled-components';
import { signUpApi } from '../axios/axios';
import { validatePassword, validatePasswordCheck } from '../util/passwordValidator';
import { validateEmail } from '../util/emailValidator';
import CloseButton from '../elements/CloseButton';

const SignUpModal = (props) => {
  //modal state
  const [open, setOpen] = useState(false);

  //회원가입 정보 state
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);

  //에러처리 state
  const [nameErr, setNameErr] = useState(false);
  const [nameNull, setNameNull] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailNull, setEmailNull] = useState(false);
  const [emailDupErr, setEmailDupErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordNull, setPasswordNull] = useState(false);
  const [passwordCheckErr, setPasswordCheckErr] = useState(false);
  const [passwordCheckNull, setPasswordCheckNull] = useState(false);

  //Ref
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  //이메일 확인
  useEffect(() => {
    if (!validateEmail(email) || !email) {
      setEmailErr(true);
      setEmailDupErr(false);
      setEmailNull(false);
    } else if (emailDupErr) {
      setEmailErr(false);
      setEmailDupErr(true);
      setEmailNull(false);
    } else {
      setEmailErr(false);
      setEmailDupErr(false);
      setEmailNull(false);
    }
  }, [email]);

  //패스워드 확인
  useEffect(() => {
    if (!validatePassword(password)) {
      setPasswordErr(true);
      setPasswordNull(false);
    } else {
      setPasswordErr(false);
      setPasswordNull(false);
    }
  }, [password]);

  //패스워드 체크 확인
  useEffect(() => {
    if (!validatePasswordCheck(password, passwordCheck)) {
      setPasswordCheckErr(true);
      setPasswordCheckNull(false);
    } else {
      setPasswordCheckErr(false);
      setPasswordCheckNull(false);
    }
  }, [passwordCheck]);

  //input onChange event
  const nameChange = (e) => {
    const NAME = e.target.value;
    setName(NAME);
  };
  const emailChange = (e) => {
    const EMAIL = e.target.value;
    setEmail(EMAIL);
  };
  const passwordChange = (e) => {
    const PASSWORD = e.target.value;
    setPassword(PASSWORD);
  };
  const passwordCheckChange = (e) => {
    const PASSWORDCHECK = e.target.value;
    setPasswordCheck(PASSWORDCHECK);
  };

  //modal controll
  const handleSignUpModal = (e) => {
    if (e.target.className.includes('handleModal')) {
      setOpen(!open);
      setNameErr(false);
      setEmailDupErr(false);
      setEmailErr(false);
      setPasswordErr(false);
      setPasswordCheckErr(false);
      setNameNull(false);
      setPasswordCheckNull(false);
      setPasswordNull(false);
      setEmailNull(false);
      setName(null);
      setEmail(null);
      setPassword(null);
      setPasswordCheck(null);
    }
  };

  //signup submit
  const SignUp = async () => {
    const data = {
      name,
      email,
      password,
      passwordCheck,
    };
    console.log(data);
    if (!name) {
      setNameNull(true);
      setPasswordCheckNull(false);
      setPasswordNull(false);
      setEmailNull(false);
      nameRef.current.focus();
      return;
    }
    if (!email) {
      setEmailNull(true);
      setPasswordCheckNull(false);
      setPasswordNull(false);
      setNameNull(false);
      emailRef.current.focus();
      return;
    }
    if (!password) {
      setPasswordNull(true);
      setPasswordCheckNull(false);
      setEmailNull(false);
      setNameNull(false);
      passwordRef.current.focus();
      return;
    }
    if (!passwordCheck) {
      setPasswordCheckNull(true);
      setPasswordNull(false);
      setEmailNull(false);
      setNameNull(false);
      passwordCheckRef.current.focus();
      return;
    }
    const res = await signUpApi(data);
    if (res.status === 200) {
      alert('회원가입 성공');
      setOpen(!open);
      setNameErr(false);
      setNameNull(false);
      setEmailDupErr(false);
      setEmailNull(false);
      setEmailErr(false);
      setPasswordErr(false);
      setPasswordNull(false);
      setPasswordCheckErr(false);
      setPasswordCheckNull(false);
    } else if (res.status === 400) {
      if (res.data.msg === '이메일이 중복됩니다.') {
        setEmailDupErr(true);
        setEmailErr(false);
        emailRef.current.focus();
      } else if (res.data.msg === '이메일을 확인해주세요') {
        setEmailErr(true);
        setEmailDupErr(false);
        emailRef.current.focus();
      } else if (res.data.msg === '비밀번호 체크란을 확인해주세요') {
        setPasswordCheckErr(true);
        setEmailDupErr(false);
        passwordCheckRef.current.focus();
      } else if (res.data.msg === '비밀번호를 확인해주세요') {
        setPasswordErr(true);
        setEmailDupErr(false);
        passwordRef.current.focus();
      }
    }
  };

  return (
    <>
      <div
        className="handleModal"
        style={{ color: '#fff', cursor: 'pointer' }}
        onClick={handleSignUpModal}
      >
        회원가입
      </div>
      {open ? (
        <GrayBackground className="handleModal" onClick={handleSignUpModal}>
          <PopUpWrap>
            <Title text={'회원가입'} />
            <CloseButton _onClick={handleSignUpModal} />

            <InputWrap>
              <Label>이름</Label>
              <InputEl type="text" placeholder="홍길동" ref={nameRef} onChange={nameChange} />
              {nameErr ? <ErrMessage>이름을 확인해주세요</ErrMessage> : null}
              {nameNull ? <ErrMessage>이름을 입력해주세요</ErrMessage> : null}
            </InputWrap>

            <InputWrap>
              <Label>이메일</Label>
              <InputEl
                type="text"
                placeholder="example@example.com"
                ref={emailRef}
                onChange={emailChange}
              />
              {emailDupErr ? <ErrMessage>중복된 이메일입니다.</ErrMessage> : null}
              {emailErr ? <ErrMessage>이메일 형식을 확인해주세요</ErrMessage> : null}
              {emailNull ? <ErrMessage>이메일을 입력해주세요</ErrMessage> : null}
            </InputWrap>

            <InputWrap>
              <Label>패스워드</Label>
              <InputEl
                type="password"
                placeholder="********"
                ref={passwordRef}
                onChange={passwordChange}
              />
              {passwordErr ? <ErrMessage>패스워드를 확인해주세요</ErrMessage> : null}
              {passwordNull ? <ErrMessage>패스워드를 입력해주세요</ErrMessage> : null}
            </InputWrap>

            <InputWrap>
              <Label>패스워드 확인</Label>
              <InputEl
                type="password"
                placeholder="********"
                ref={passwordCheckRef}
                onChange={passwordCheckChange}
              />
              {passwordCheckErr ? <ErrMessage>패스워드를 확인해주세요</ErrMessage> : null}
              {passwordCheckNull ? <ErrMessage>패스워드 확인을 입력해주세요</ErrMessage> : null}
            </InputWrap>

            <Button isFill={false} _onClick={SignUp}>
              회원가입
            </Button>
          </PopUpWrap>
        </GrayBackground>
      ) : null}
    </>
  );
};

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

export default SignUpModal;
