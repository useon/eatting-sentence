import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinInfo, JoinInput, JoinSubmit, JoinWrapper } from './JoinStyle';

const Join = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({email: '', password: '', passwordCheck: ''});
  const [errorActive, setErrorActive] = useState({email: false, passwordCheck: false});
  const [errorMessage, setErrorMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [submitColor, setSubmitColor] = useState('gray')

  useEffect(() => {
    const isEntered = (userInfo.email !== '' && userInfo.password !== '' && userInfo.passwordCheck !== '');
    const isNotError = (errorActive.email === false && errorActive.passwordCheck === false)
    if(isEntered && isNotError) {
      setBtnDisabled(false);
      setSubmitColor('black');
    } else {
      setBtnDisabled(true);
      setSubmitColor('gray');
    }
  }, [userInfo])

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name === '이메일') {
      setUserInfo({...userInfo, email: value});
      if(value.includes('@')) {
        setErrorActive({...errorActive, email: false});
      } else {
        setErrorActive({...errorActive, email: true});
      }
    }
    if(name === '비밀번호') {
      setUserInfo({...userInfo, password: value});
    }
    if(name === '비밀번호확인') {
      const password = event.target.previousSibling.value;
      setUserInfo({...userInfo, passwordCheck: value});
      if(value === password) {
        setUserInfo({...userInfo, password: value});
        setErrorActive({...errorActive, passwordCheck: false});
      } else {
        setErrorActive({...errorActive, passwordCheck: true});
      }
    }
  }

  const onSubmit = async() => {
    try {
      await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      navigate('/login');
    } catch (error) {
      setErrorMessage('이미 등록된 회원입니다');
    }
  }

  return (
    <JoinWrapper onChange={onChange}>
      <JoinInfo>회원가입</JoinInfo>
      <JoinInput name='이메일' placeholder='이메일' required></JoinInput>
      {errorActive.email && <span>이메일 형식을 확인해주세요</span>}
      <JoinInput name='비밀번호' type='password' placeholder='비밀번호' required></JoinInput>
      <JoinInput name='비밀번호확인' type='password' placeholder='비밀번호확인' required></JoinInput>
      {errorActive.passwordCheck && <span>비밀번호가 일치하지 않습니다</span>}
      <JoinSubmit submitColor={submitColor} disabled={btnDisabled} onClick={onSubmit}>확인</JoinSubmit>
      {errorMessage !== '' && <p>{errorMessage}</p>}
    </JoinWrapper>
  )
}

export default Join;