import React, { useEffect, useState } from 'react';
import { dbService } from 'myBase';

import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import Drawer from './Drawer';

const Home = () => {
  const [bookcase, setBookcase] = useState([]);
  let bookcaseData = [];

  const getBookcase = async () => {
    const books = await dbService.collection('Books').get();
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
        leftChild={<MyButton text={'로그아웃'} />}
        rightChild={
          <MyButton text={'책 추가하기'} type={'add'} auth={'/addBook'} />
        }
      />
      <section>
        <div className="">
          {bookcase.map((index) => (
            <Drawer thumbnail={index[0]} title={index[1]} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
