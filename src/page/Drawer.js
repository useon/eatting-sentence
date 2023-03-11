import MyHeader from 'components/MyHeader';
import SentenceList from 'components/SentenceList';
import { dbService } from 'myBase';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectEmail } from 'redux/userSlice';

const Drawer = () => {
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const thumbnail = location.state.thumbnail;
  const goAddSentence = () => {
    navigate('/addSentence', { state: { title: title } });
  };

  const removeBookToDB = async(element) => {
    element.preventDefault();
    if(window.confirm('이 책을 삭제하시겠습니까?')) {
      dbService
      .collection(userEmail)
      .doc(title)
      .delete();
      navigate(-1);
    }
  }
  return (
    <div>
      <MyHeader
        leftChild={
          <button onClick={() => navigate(-1)}>
          {'뒤로가기'}
        </button>
        }
        rightChild={
          <div>
          <button
            onClick={goAddSentence}
          >
            문장추가하기
          </button>
          <button
            onClick={removeBookToDB}
          >
            삭제
          </button>
          </div>
        }
      />
      <section className="drawer">
        <div className="drawer information">
          <img src={thumbnail} alt="책표지" />
          <div>
            <span></span>
            <span>{title}</span>
          </div>
        </div>
        <div className="drawer sentencesWrapper">
          <SentenceList title={title} />
        </div>
      </section>
    </div>
  );
};
export default Drawer;
