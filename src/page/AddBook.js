import MyHeader from 'components/MyHeader';
import SearchBook from 'components/SearchBook';
import { dbService } from 'myBase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';

const AddBook = () => {
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
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
        .collection(userEmail)
        .doc(bookData.title)
        .set({
          authors: bookData.authors.join(' '),
          thumbnail: bookData.thumbnail,
          sentences: {},
        });
        navigate(-1);
    }
  };

  return (
    <div className="AddBook">
      <MyHeader
        leftChild={
          <button className="" onClick={() => navigate(-1)}>
          {'뒤로가기'}
        </button>
        }
        rightChild={
          <button className="" onClick={(e) => addBookToDb(e)}>
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
