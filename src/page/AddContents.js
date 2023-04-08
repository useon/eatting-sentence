import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { useNavigate } from 'react-router-dom';

const AddContents = () => {
  const navigate = useNavigate();

  return (
    <div className="AddContents">
      <MyHeader
      leftChild={
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      }
      />
      <section>
        <SentenceEditor/>
      </section>
    </div>
  );
}

export default AddContents