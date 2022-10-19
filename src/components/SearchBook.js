import axios from 'axios';
import { useState } from 'react';
import SearchResult from './SearchResult';

const KAKAO_KEY = process.env.REACT_APP_KAKAO_API_KEY
const KAKAO = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${KAKAO_KEY}`
  }
});

const kakaoSearch = (params) => {
  return KAKAO.get("/v3/search/book", { params })
};

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const submitKeyWord = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      getBook(query, true);
    }
  }

  const onTextUpdate = e => {
    setQuery(e.target.value);
  }

  const getBook = async (query, reset) => {
    const params = {
      query: query,
      size: 10,
      title: 'title',
    }

    const result = await kakaoSearch(params)

    if (reset) {
      setBooks(result.data.documents);
    } else {
      setBooks(books.concat(result.data.documents));
    }

  };

  return (
    <div className='SearchBook'>
      <div className='search_input'>
        <form onSubmit={(e) => { submitKeyWord(e) }}>
          <input
            type='search'
            placeholder='검색어를 입력해주세요.'
            value={query}
            onChange={onTextUpdate}
          />
          <button className='MyButton' />
        </form>
      </div>
      <ul className='SearchResult'>
      </ul>
    </div>
  )
};

export default SearchBook;