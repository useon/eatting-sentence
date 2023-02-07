import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import SentenceList from 'components/SentenceList';
import { dbService } from 'myBase';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Drawer = () => {
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
      .collection('Books')
      .doc(title)
      .delete();
      navigate(-1);
    }
  }
  return (
    <div>
      <MyHeader
        leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={
          <div>
          <button
            className={['MyButton', 'MyButton_add'].join(' ')}
            onClick={goAddSentence}
          >
            문장추가하기
          </button>
          <button
            className={['MyButton', 'MyButton_add'].join(' ')}
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
