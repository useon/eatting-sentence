import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { useLocation, useNavigate } from 'react-router-dom';

const AddContents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let settingTitle;
  let settingAuthors;
  let settingThumbnail;
  let settingDrawer;
  let settingSentence;
  let settingPage;
  const mode = location.state.mode;

  if(mode !== 'unEntered') {
    settingTitle = location.state.settingTitle;
    settingAuthors = location.state.settingAuthors;
    settingThumbnail = location.state.settingThumbnail;
    if(mode === 'edit') {
      settingSentence = location.state.settingSentence;
      settingPage = location.state.settingPage;
      settingDrawer = location.state.settingDrawer;
    }
  }

  return (
    <div className="AddContents">
      <MyHeader
      leftChild={
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      }
      />
      <section>
        {mode === 'unEntered' && <SentenceEditor mode={mode} settingInfo= {[]} />}
        {mode === 'bookEntered' && <SentenceEditor mode={mode} settingInfo={[settingTitle, settingAuthors, settingThumbnail]} />}
        {mode === 'edit' && <SentenceEditor mode={mode} settingInfo={[settingTitle, settingAuthors, settingThumbnail, settingSentence, settingPage, settingDrawer]} />}
      </section>
    </div>
  );
}

export default AddContents