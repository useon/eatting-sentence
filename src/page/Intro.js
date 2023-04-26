import { useEffect } from 'react';
import logo from '../assets/임시로고.JPG'
import { useNavigate } from 'react-router-dom';
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
          navigate('/signIn');
        }
      });
    }, 2000);
  }

  return (
    <div>
      <img src={logo} alt='로고' />
    </div>
  )
}

export default Intro;