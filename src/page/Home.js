import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { authService, dbService } from 'myBase';
import MyHeader from 'components/MyHeader';
import Bookshelf from 'components/Bookshelf';
import IsLogIn from 'components/IsLogIn';
import HomeNavbar from 'components/HomeNavbar';
import Drawer from 'components/Drawer';

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [mode, setMode] = useState('bookshelf')

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

  const modeHandler = (mode) => {
    if(mode === 'bookshelf') setMode('bookshelf');
    if(mode === 'drawer') setMode('drawer');
  }

  return (
    <div>
      <MyHeader
        leftChild={
          <button onClick={() => logOut()}>
            {'로그아웃'}
          </button>
        }
        rightChild={
          <button onClick={() => navigate('/addContents')}>
            {'추가'}
          </button>
        }
      />
      <HomeNavbar modeHandler={modeHandler}/>
      <section className="">
        <div className="bookcase compartment">
          {mode==='bookshelf'? bookData.map((data) => (
            <Bookshelf thumbnail={data[0]} title={data[1]} key={data[1]} authors={data[2]}/>
          )) : <Drawer/>}
        </div>
      </section>
    </div>
  );
};

export default Home;
