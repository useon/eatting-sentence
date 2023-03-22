import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { authService, dbService } from 'myBase';
import MyHeader from 'components/MyHeader';
import Bookshelf from 'components/Bookshelf';
import IsLogIn from 'components/IsLogIn';
import HomeNavbar from 'components/HomeNavbar';

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  const logOut = () => {
    authService.signOut();
    IsLogIn();
  };

  const getBookshelf = async () => {
    const books = await dbService.collection(userEmail).doc('userData').collection('Bookshelf').get();
    const booksMap = new Map();
    const booksArr = [];

    books.forEach((document) => {
      booksMap.set(document.id, document.data());
    });

    if (booksMap.size !== undefined) {
      for (let key of booksMap.keys()) {
        booksArr.push([booksMap.get(key).thumbnail, key, booksMap.get(key).authors]);
      }
      setBookData(booksArr);
    }
  };

  useEffect(() => {
    getBookshelf();
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
      <HomeNavbar/>
      <section className="bookcase">
        <div className="bookcase compartment">
          {bookData.map((data) => (
            <Bookshelf thumbnail={data[0]} title={data[1]} key={data[1]} authors={data[2]}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
