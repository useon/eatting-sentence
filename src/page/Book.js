import MyHeader from 'components/MyHeader';
import SentenceList from 'components/SentenceList';
import React, { useEffect, useState } from 'react';
import { dbService } from 'myBase';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectEmail } from 'redux/userSlice';

const Book = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const authors = location.state.authors;
  const [sentenceData, setSentenceData] = useState([]);
  
  useEffect(() => {
    getBookData();
  },[])

  const getBookData = async() => {
    const data = (await userDataRef.collection('sentences').where('title', '==', title).where('authors', '==', authors).get()).docs;
    const sentence = [];
    data.map((query) => sentence.push(query.id));
    setSentenceData(sentence);
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
          >
            문장추가하기
          </button>
          <button
          >
            삭제
          </button>
          </div>
        }
      />
      <section className="book">
        <div className="book information">
          <div>
            <span>{title}</span>
            <span>{authors}</span>
          </div>
        </div>
        <div className="book sentencesWrapper">
          {sentenceData.map((sentence) => <SentenceList sentence={sentence}/>)}
        </div>
      </section>
    </div>
  );
};

export default Book;
