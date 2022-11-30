import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import SearchBook from 'components/SearchBook';
import { dbService } from 'myBase';
import { useState } from 'react';

const AddBook = () => {
  const [bookData, setBookData] = useState({});

  const addBookToState = (title, authors, thumbnail) => {
    setBookData({
      title: title,
      authors: authors,
      thumbnail: thumbnail,
    });
  };

  const addBookToDb = (e) => {
    e.preventDefault();
    if (window.confirm('선택한 책을 등록하시겠습니까 ?')) {
      dbService
        .collection('Books')
        .doc(bookData.title)
        .set({
          authors: bookData.authors.join(' '),
          thumbnail: bookData.thumbnail,
          sentences: {},
        });
    }
  };

  return (
    <div className="AddBook">
      <MyHeader
        leftChild={<MyButton text={'뒤로가기'} />}
        rightChild={
          <button className="MyButton" onClick={(e) => addBookToDb(e)}>
            {'완료하기'}
          </button>
        }
      />
      <section>
        <SearchBook addBookToState={addBookToState} />
      </section>
    </div>
  );
};

export default AddBook;
