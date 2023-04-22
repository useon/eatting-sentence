import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { useLocation, useNavigate } from 'react-router-dom';

const AddContents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let settingTitle;
  let settingAuthors;
  let settingThumbnail;
  const settingBook = location.state.settingBook;

  if(settingBook) {
    settingTitle = location.state.settingTitle;
    settingAuthors = location.state.settingAuthors;
    settingThumbnail = location.state.settingThumbnail;
  }

  return (
    <div className="AddContents">
      <MyHeader
      leftChild={
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      }
      />
      <section>
        {settingBook && <SentenceEditor settingBook={settingBook} settingBookInfo={[settingTitle, settingAuthors, settingThumbnail]} />}
        {settingBook === false && <SentenceEditor settingBook={settingBook} settingBookInfo= {[]} />}
      </section>
    </div>
  );
}

export default AddContents