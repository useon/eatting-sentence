import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'myBase';

const IsLogIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/signIn');
      }
    });
  }, []);
};

export default IsLogIn;
