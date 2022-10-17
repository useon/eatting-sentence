import { Link } from 'react-router-dom';

const MyButton = ({ text, type, auth, onClick }) => {
  return (
    <Link to={`${auth}`}>
      <button className={['MyButton', `MyButton_${type}`].join(" ")} onClick={onClick}>{text}</button>
    </Link>
  );
}

export default MyButton;