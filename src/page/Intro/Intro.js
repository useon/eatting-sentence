import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'myBase';
import logo from 'assets/images/Logo.png';
import * as Styled from './Intro.styles';

const Intro = () => {
  const navigate = useNavigate();

  const timeout = () => {
    setTimeout(() => {
      authService.onAuthStateChanged((user) => {
        if (user) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      });
    }, 3000);
  };

  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Styled.LogoContainer>
      <Styled.LogoSize src={logo} alt='Sentence Eatting의 로고 이미지' />
    </Styled.LogoContainer>
  );
};

export default Intro;
