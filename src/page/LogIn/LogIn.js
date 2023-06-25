import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import logo from 'assets/images/Logo.png';
import * as Styled from 'styles/Shared/JoinAndLogIn';

const LogIn = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(email));
        navigate('/home');
      });
    } catch {
      setError('아이디 또는 비밀번호를 다시 확인해주세요');
    }
  };

  return (
    <Styled.FormWrapper>
      <Styled.Logo src={logo} alt='레터링로고' />
      <Styled.WelcomeText>로그인</Styled.WelcomeText>
      <Styled.Form onSubmit={onSubmit}>
        <Styled.Input
          name='email'
          required
          value={email}
          onChange={onChange}
          placeholder='이메일'
        />
        <Styled.Input
          name='password'
          type='password'
          required
          value={password}
          onChange={onChange}
          placeholder='비밀번호'
        />
        <Styled.BtnWrapper fill='black'>
          <Styled.SubmitBtn onClick={onSubmit} color='white'>
            로그인하기
          </Styled.SubmitBtn>
        </Styled.BtnWrapper>
        <Styled.ErrorText>{error}</Styled.ErrorText>
      </Styled.Form>
      <Styled.AnotherPageBtn type='button' onClick={() => navigate('/join')}>
        회원가입하기
      </Styled.AnotherPageBtn>
    </Styled.FormWrapper>
  );
};
export default LogIn;
