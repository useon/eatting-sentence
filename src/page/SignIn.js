import { authService } from 'myBase';
import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
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
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="welcomeWrapper">
      <span className="welcomeWrapper info">
        {newAccount ? '회원 가입' : '로그인'}
      </span>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          required
          value={password}
          onChange={onChange}
        />
        <input
          className="MyButton"
          type="submit"
          value={newAccount ? '계정 만들기' : '로그인 하기'}
        />
        {error}
      </form>
      <span className="welcomeWrapper loginOrCreate" onClick={toggleAccount}>
        {newAccount ? '로그인 하기' : '계정 만들기'}
      </span>
    </div>
  );
};
export default SignIn;
