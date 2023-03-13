import { dbService } from 'myBase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { selectEmail } from 'redux/userSlice';

const SentenceList = ({ title }) => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const [sentencesData, setSentenceData] = useState({});
  const navigate = useNavigate();

  const deleteData = async(element) => {
    element.preventDefault();
    const sentenceObj = (
      await userDataRef.collection('Bookshelf').doc(title).get()
    ).data().sentences;

    const id = element.target.parentNode.parentNode.id;

    if(window.confirm('이 문장을 삭제하시겠습니까?')) {
      delete sentenceObj[id];
      setSentenceData(sentenceObj);
      userDataRef
      .collection('Bookshelf')
      .doc(title)
      .update({
        sentences: {
          ...sentenceObj,
        },
      });
    }
  }

  const transmitData = (element) => {
    const id = element.target.parentNode.parentNode.id;
    const content = element.target.parentNode.parentNode.lastChild.data;
    navigate('/addSentence', {state: {title: title, sentenceId: id, sentenceContent: content}
  });
  }

  const getSentences = async () => {
    const sentencesObj = (
      await userDataRef.collection('Bookshelf').doc(title).get()
    ).data().sentences;
    setSentenceData(sentencesObj);
  };

  useEffect(() => {
    getSentences();
  }, []);

  const sentencesArr = Object.entries(sentencesData);
  if(sentencesArr.length !== 0) {
    return sentencesArr.map((data) => (
        <div className="sentenceList" id={data[0]}>
          <div>
            <button onClick={transmitData}>수정</button>
            <button onClick={deleteData}>삭제</button>
            </div>
          {data[1]}
        </div>
        ))
  }
};

export default SentenceList;