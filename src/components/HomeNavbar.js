import { dbService } from 'myBase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import SearchModal from './SearchModal';

const HomeNavbar = () => {
  const userEmail = useSelector(selectEmail);
  const [onModal, setOnModal] = useState(false);
  const [bookcaseData, setBookcaseData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getBookcase();
  }, []);

  const getBookcase = async () => {
    const booksDB = await dbService.collection(userEmail).doc('userData').collection('Bookshelf').get();
    const bookDataArr = [];
    booksDB.forEach((data) => {
      bookDataArr.push([data.id, data.data().authors]);
    });
    setBookcaseData(bookDataArr);
  }

  const textUpdate = e => {
      const text = e.target.value;
      if(text.length === 0) {
        setSearchResult([]);
      }
      if(text.length > 0) {
        searchDB(text);
      }
    }
  

  const showModal = () => {
    setOnModal(true);
  }
  
  const searchDB = (keyword) => {
    const resultArr = [];
    bookcaseData.forEach((data) => {
      if(data[0].includes(keyword)) {
        resultArr.push([data[0], data[1]]);
      }
    });
    setSearchResult(resultArr);
  }

  return (
    <div className='HomeNavbar'>
      <div className='left_area'>
        <div className='tab_wrap'>        
          <button>책장</button>
          <button>서랍</button>
        </div>
        <select className='option_wrap'>
          <option>최신순</option>
          <option>오래된순</option>
        </select>
      </div>
      <div className='rigth_area'>
        <div className='search_wrap'>
          <input onChange={textUpdate} onClick={showModal}></input>
          <div className='search_result'>
          {onModal && searchResult.length > 0 && searchResult.map((data) => (
            <SearchModal title={data[0]} authors={data[1]}/>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar;