import MyHeader from 'components/MyHeader';
import SentenceList from 'components/SentenceList';
import React from 'react';
import { dbService } from 'myBase';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectEmail } from 'redux/userSlice';

const Drawer = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const authors = location.state.authors;
  
  const goAddSentence = () => {
    navigate('/addSentence', { state: { title: title } });
  };

  const removeBookToDB = async(element) => {
    element.preventDefault();
    if(window.confirm('이 책을 삭제하시겠습니까?')) {
      userDataRef
      .collection('Bookshelf')
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
          <div>
            <span>{title}</span>
            <span>{authors}</span>
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
