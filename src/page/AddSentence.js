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
    console.log(sentence);
    setSentenceData(sentence);
  };

  return (
    <div className="AddBook">
      <MyHeader
        leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={<button text={'완료하기'} type={'complete'} />}
      />
      <section>
        <SentenceEditor addSentenceToState={addSentenceToState} />
      </section>
    </div>
  );
};
export default AddSentence;
