import { useEffect } from 'react';
import logo from '../../assets/images/임시로고.JPG'
import { useNavigate } from 'react-router-dom';
import { LogoContainer, LogoSize } from './IntroStyle';
import { authService } from 'myBase';

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(timeout);
    }
  })

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
  }

  return (
    <LogoContainer>
      <LogoSize src={logo} alt='로고' />
    </LogoContainer>
  )
}

export default Intro;