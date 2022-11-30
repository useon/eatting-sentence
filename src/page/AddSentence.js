import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import SentenceEditor from 'components/SentenceEditor';
import { dbService } from 'myBase';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddSentence = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const [setencesData, setSentenceData] = useState({});

  const addSentenceToState = (sentence) => {
    setSentenceData(sentence);
  };

  const addSentenceToDB = async (element) => {
    element.preventDefault();
    const prevSentences = (
      await dbService.collection('Books').doc(title).get()
    ).data().sentences;

    if (window.confirm('문장을 추가하시겠습니까?')) {
      const randomKey = new Date().getTime();

      if (Object.keys(prevSentences).length !== 0) {
        dbService
          .collection('Books')
          .doc(title)
          .update({
            sentences: {
              ...prevSentences,
              [randomKey]: setencesData,
            },
          });
      } else {
        dbService
          .collection('Books')
          .doc(title)
          .update({
            sentences: {
              [randomKey]: setencesData,
            },
          });
      }
    }
  };

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
        <SentenceEditor addSentenceToState={addSentenceToState} />
      </section>
    </div>
  );
};
export default AddSentence;
