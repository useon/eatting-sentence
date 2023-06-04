/* eslint-disable no-script-url */
import { useNavigate } from 'react-router-dom';
import * as Styled from './Drawers.styles';

const Drawers = ({ drawer }) => {
  const navigate = useNavigate();

  const goDrawerPage = () => {
    navigate(`/drawer/${drawer}`, {
      state: { drawer },
    });
  };

  return (
    <Styled.Drawer elevation={2}>
      <Styled.NameTag onClick={goDrawerPage} elevation={2} href='javascript:void(0)'>
        {drawer}
      </Styled.NameTag>
      <Styled.Handle onClick={goDrawerPage} />
    </Styled.Drawer>
  );
};

export default Drawers;
