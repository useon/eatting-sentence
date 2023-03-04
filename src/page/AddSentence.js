import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { dbService } from 'myBase';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const AddSentence = () => {
  const userEmail = useSelector(state=> {
    return state.user.value;
  });

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
      await dbService.collection(userEmail).doc(title).get()
    ).data().sentences;

    if (window.confirm('문장을 추가하시겠습니까?')) {
      if(sentenceContent === undefined) {
        const randomKey = new Date().getTime();
        if(Object.keys(prevSentences).length !== 0) {
          dbService
          .collection(userEmail)
          .doc(title)
          .update({
            sentences: {
              ...prevSentences,
              [randomKey]: setencesData,
            },
          });
        } else {
          dbService
          .collection(userEmail)
          .doc(title)
          .update({
            sentences: {
              [randomKey]: setencesData,
            },
          });
        }
      } else {
        dbService
        .collection(userEmail)
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
        leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={
          <button className="MyButton" onClick={(e) => addSentenceToDB(e)}>
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
