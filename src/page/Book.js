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
  const [docSnapshot, setDocSnapshot] = useState([]);
  const [listData, setListData] = useState([]);
  const [senteceSorting, setSenteceSorting] = useState('페이지오름차순');
  
  useEffect(() => {
    getBookData();
  },[]);

  useEffect(() => {
    reprocesser();
  },[docSnapshot, senteceSorting]);

  const getBookData = async() => {
    const data = (await userDataRef.collection('sentences').where('title', '==', title).where('authors', '==', authors).get()).docs;
    setDocSnapshot(data);
  }

  const selectHandler = (event) => {
    setSenteceSorting(event.target.value);
  }

  const reprocesser = () => {
    const sortedArray = [];
    if(senteceSorting.includes('페이지')) {
      docSnapshot.map((query) => {
        sortedArray.push([query.data().page, [query.id, query.data().drawers, query.data().registeredTime]]);
      })
      sortedArray.sort((a, b) => a[0] - b[0]);
      if(senteceSorting === '페이지오름차순')
        setListData(sortedArray);
      if(senteceSorting === '페이지내림차순')
        setListData(sortedArray.reverse());
    } else {
      docSnapshot.map((query) => {
        sortedArray.push([query.data().registeredTime, [query.id, query.data().page, query.data().drawers]]);
      })
      sortedArray.sort((a, b) => b[0] - a[0]);
      if(senteceSorting === '최신순')
        setListData(sortedArray);
      if(senteceSorting === '오래된순')
        setListData(sortedArray.reverse());
    }
  }

  const paintSentenceList = () => {
    const result = [];
    if(senteceSorting.includes('페이지')) {
      listData.map((array) => {
        result.push(<SentenceList type={'book'} sentence={array[1][0]} page={array[0]} drawer={array[1][1]} registeredTime={array[1][2]}/>);
      });
      return result;
    } else {
      listData.map((array) => {
        result.push(<SentenceList type={'book'} sentence={array[1][0]} page={array[1][1]} drawer={array[1][2]} registeredTime={array[0]}/>)
      });
      return result;
    }
  }

  return (
    <div>
      <MyHeader
        leftChild={
          <button onClick={() => navigate(-1)}>{'뒤로가기'}</button>
        }
        rightChild={
          <div>
            <button>문장추가하기</button>
            <button>삭제</button>
          </div>
        }
      />
      <div>
        <select value={senteceSorting} onChange={selectHandler}>
          <option value='페이지오름차순'>페이지오름차순</option>
          <option value='페이지내림차순'>페이지내림차순</option>
          <option value='최신순'>최신순</option>
          <option value='오래된순'>오래된순</option>
        </select>
      </div>
      <section className="book">
        <div className="book information">
          <div>
            <span>{title}</span>
            <span>{authors}</span>
          </div>
        </div>
        <div className="book sentencesWrapper">
          {paintSentenceList()}
        </div>
      </section>
    </div>
  );
};

export default Book;
