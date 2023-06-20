import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import logo from 'assets/images/Logo.png';
import {
  BtnWrapper,
  Form,
  FormWrapper,
  Input,
  Logo,
  SubmitBtn,
  WelcomeText,
} from 'styles/Shared/JoinAndLogIn';

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
    <FormWrapper>
      <Logo src={logo} alt='레터링로고' />
      <WelcomeText>로그인</WelcomeText>
      <Form onSubmit={onSubmit}>
        <Input name='email' required value={email} onChange={onChange} placeholder='이메일' />
        <Input
          name='password'
          type='password'
          required
          value={password}
          onChange={onChange}
          placeholder='비밀번호'
        />
        <BtnWrapper fill='black'>
          <SubmitBtn onClick={onSubmit} color='white'>
            로그인하기
          </SubmitBtn>
        </BtnWrapper>
        {error}
      </Form>
      <button type='button' onClick={() => navigate('/join')}>
        회원가입하기
      </button>
    </FormWrapper>
  );
};
export default LogIn;
