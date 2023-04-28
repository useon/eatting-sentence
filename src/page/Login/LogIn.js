import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { LoginBtn, LoginForm, LoginInput, LoginWrapper } from './LogInStyle';
import logo from '../../assets/images/임시로고.JPG'
import { LogoSize } from 'page/Intro/IntroStyle';
import { useNavigate } from 'react-router-dom';

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
    event.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUser(email));
        })
    } catch (error) {
      setError('아이디 또는 비밀번호를 다시 확인해주세요');
    }
  };

  return (
    <LoginWrapper>
      <LogoSize src={logo} alt='레터링로고'></LogoSize>
      <span>로그인</span>
      <LoginForm onSubmit={onSubmit}>
        <LoginInput
        name="email"
        required
        value={email}
        onChange={onChange}
        placeholder='이메일'
        />
        <LoginInput
        name="password"
        type='password'
        required
        value={password}
        onChange={onChange}
        placeholder='비밀번호'
        />
        <LoginBtn onClick={onSubmit}>로그인하기</LoginBtn>
        {error}
      </LoginForm>
      <button onClick={() => navigate('/join')}>회원가입하기</button>
    </LoginWrapper>
  );
};
export default LogIn;
