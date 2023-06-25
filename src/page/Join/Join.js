import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import logo from 'assets/images/Logo.png';
import * as Styled from 'styles/Shared/JoinAndLogIn';

const Join = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errorActive, setErrorActive] = useState({
    email: false,
    passwordCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const isEntered =
      userInfo.email !== '' && userInfo.password !== '' && userInfo.passwordCheck !== '';
    const isNotError = errorActive.email === false && errorActive.passwordCheck === false;
    if (isEntered && isNotError) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [userInfo]);

  const onChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (name === '이메일') {
      setUserInfo({ ...userInfo, email: value });
      if (value.includes('@') && value.includes('.')) {
        setErrorActive({ ...errorActive, email: false });
      } else {
        setErrorActive({ ...errorActive, email: true });
      }
    }
    if (name === '비밀번호') {
      setUserInfo({ ...userInfo, password: value });
    }
    if (name === '비밀번호확인') {
      const password = event.target.previousSibling.value;
      setUserInfo({ ...userInfo, passwordCheck: value });
      if (value === password) {
        setUserInfo({ ...userInfo, password: value });
        setErrorActive({ ...errorActive, passwordCheck: false });
      } else {
        setErrorActive({ ...errorActive, passwordCheck: true });
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password).then(
        (userCredential) => {
          const { user } = userCredential;
        }
      );
      navigate('/login');
    } catch (error) {
      setErrorMessage('이미 등록된 회원입니다');
    }
  };

  return (
    <Styled.FormWrapper>
      <Styled.Logo src={logo} />
      <Styled.WelcomeText>회원가입</Styled.WelcomeText>
      <Styled.Form>
        <Styled.Input name='이메일' placeholder='이메일' required onChange={onChange} />
        {errorActive.email && <Styled.ErrorText>이메일 형식을 확인해주세요</Styled.ErrorText>}
        <Styled.Input
          name='비밀번호'
          type='password'
          placeholder='비밀번호'
          required
          onChange={onChange}
        />
        <Styled.Input
          name='비밀번호확인'
          type='password'
          placeholder='비밀번호확인'
          required
          onChange={onChange}
        />
        {errorActive.passwordCheck && (
          <Styled.ErrorText>비밀번호가 일치하지 않습니다</Styled.ErrorText>
        )}
        <Styled.BtnWrapper fill={btnDisabled ? 'gray' : 'black'}>
          <Styled.SubmitBtn
            color={btnDisabled ? 'black' : 'white'}
            disabled={btnDisabled}
            onClick={onSubmit}
          >
            확인
          </Styled.SubmitBtn>
        </Styled.BtnWrapper>
        {errorMessage !== '' && <Styled.ErrorText>{errorMessage}</Styled.ErrorText>}
        <Styled.AnotherPageBtn type='button' onClick={() => navigate('/login')}>
          로그인하기
        </Styled.AnotherPageBtn>
      </Styled.Form>
    </Styled.FormWrapper>
  );
};

export default Join;
