import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { dbService } from 'myBase';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectEmail } from 'redux/userSlice';

const AddSentence = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const sentenceId = location.state.sentenceId;
  const sentenceContent = location.state.sentenceContent;
  const [setencesData, setSentenceData] = useState({});

  const addSentenceToState = (sentence) => {
    setSentenceData(sentence);
  };

  const addSentenceToDB = async (element) => {
    element.preventDefault();
    const prevSentences = (
      await userDataRef.collection('Bookshelf').doc(title).get()
    ).data().sentences;

    if (window.confirm('문장을 추가하시겠습니까?')) {
      if(sentenceContent === undefined) {
        const randomKey = new Date().getTime();
        if(Object.keys(prevSentences).length !== 0) {
          userDataRef
          .collection('Bookshelf')
          .doc(title)
          .update({
            sentences: {
              ...prevSentences,
              [randomKey]: setencesData,
            },
          });
        } else {
          userDataRef
          .collection('Bookshelf')
          .doc(title)
          .update({
            sentences: {
              [randomKey]: setencesData,
            },
          });
        }
      } else {
        userDataRef
        .collection('Bookshelf')
        .doc(title)
        .update({
          sentences: {
            ...prevSentences,
            [sentenceId]: setencesData,
          },
        });
      }
    }
    navigate(-1)
  }
  
  return (
    <div className="AddSentence">
      <MyHeader
        leftChild={
          <button className="" onClick={() => navigate(-1)}>
          {'뒤로가기'}
        </button>
        }        
        rightChild={
          <button className="" onClick={(e) => addSentenceToDB(e)}>
            {'완료하기'}
          </button>
        }
      />
      <section>
        <SentenceEditor addSentenceToState={addSentenceToState} sentenceContent={sentenceContent} />
      </section>
    </div>
  );
}

export default AddSentence;
