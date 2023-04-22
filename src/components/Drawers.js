import { useNavigate } from 'react-router-dom';

const Drawers = ({drawer}) => {
  const navigate = useNavigate();

  const goDrawerPage = () => {
    navigate(`/drawer/${drawer}`, {
      state: { drawer: drawer, },
    });
  } 

  return (
    <div onClick={goDrawerPage}>
      <p>{drawer}</p>
    </div>
  )
}

export default Drawers;
