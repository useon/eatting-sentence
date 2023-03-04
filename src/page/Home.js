import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'myBase';

import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import BookCase from 'components/BookCase';
import IsLogIn from 'components/IsLogIn';
import { useSelector } from 'react-redux';

const Home = () => {
  const userEmail = useSelector(state=> {
    return state.user.value;
  });
  
  const [bookcase, setBookcase] = useState([]);
  let bookcaseData = [];

  const logOut = () => {
    authService.signOut();
    IsLogIn();
  };

  const getBookcase = async () => {
    const books = await dbService.collection(userEmail).get();
    const booksMap = new Map();
    books.forEach((document) => {
      booksMap.set(document.id, document.data());
    });

    if (booksMap.size !== undefined) {
      for (let key of booksMap.keys()) {
        bookcaseData.push([booksMap.get(key).thumbnail, key]);
      }
      setBookcase(bookcaseData);
    }
  };

  useEffect(() => {
    getBookcase();
  }, []);

  return (
    <div>
      <MyHeader
        leftChild={
          <button className="MyButton" onClick={() => logOut()}>
            {'로그아웃'}
          </button>
        }
        rightChild={
          <MyButton text={'책 추가하기'} type={'add'} auth={'/addBook'} />
        }
      />
      <section className="bookcase">
        <div className="bookcase compartment">
          {bookcase.map((index) => (
            <BookCase thumbnail={index[0]} title={index[1]} key={index[1]} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
