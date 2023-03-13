import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { authService, dbService } from 'myBase';
import MyHeader from 'components/MyHeader';
import BookCase from 'components/BookCase';
import IsLogIn from 'components/IsLogIn';

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
  const [bookcase, setBookcase] = useState([]);
  let bookcaseData = [];

  const logOut = () => {
    authService.signOut();
    IsLogIn();
  };


  const getBookcase = async () => {
    const books = await dbService.collection(userEmail).doc('userData').collection('Bookshelf').get();
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
          <button onClick={() => logOut()}>
            {'로그아웃'}
          </button>
        }
        rightChild={
          <button onClick={() => navigate('/addBook')}>
            {'추가'}
          </button>
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
