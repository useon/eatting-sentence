import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

const SignIn = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

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
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUser(email));
        })
      }
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
        <div>
          <span>아이디</span>
          <input
          name="email"
          type="email"
          required
          value={email}
          onChange={onChange}
          />
        </div>
        <div>
          <span>비밀번호</span>
          <input
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
          />
        </div>
        <input
          className='loginBtn'
          type="submit"
          value={newAccount ? '계정 만들기' : '로그인'}
        />
        {error}
      </form>
      <span className="welcomeWrapper loginOrCreate" onClick={toggleAccount}>
        {newAccount ? '로그인' : '계정 만들기'}
      </span>
    </div>
  );
};
export default SignIn;
