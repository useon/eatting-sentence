import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/icons/Cancel.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/Search.svg';
import alternateImage from 'assets/images/Book.png';
import SearchResult from './components/SearchResult/SearchResult';
import * as Styled from './SearchBook.styles';
import Pagenate from './components/Pagenate/Pagenate';

const KAKAO_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const KAKAO = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${KAKAO_KEY}`,
  },
});

const kakaoSearch = (params) => KAKAO.get('/v3/search/book', { params });

const SearchBook = ({ getBookInfo, setSearchActive, setBookTitle }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [checkArr, setCheckArr] = useState([]);
  const [page, setPage] = useState(1);
  const [submit, setSubmit] = useState(false);
  const searchInput = useRef(null);
  const pageBtnNumber = useRef();

  const getBook = async () => {
    const params = {
      query,
      size: 5,
      page,
      title: 'title',
    };

    const result = await kakaoSearch(params);
    let pageableCount = result.data.meta.pageable_count;
    if (pageableCount > 50) pageableCount = 50;
    pageBtnNumber.current = Math.ceil(pageableCount / 5);
    setBooks(result.data.documents);
    setSubmit(true);
  };

  useEffect(() => {
    getBook();
  }, [page]);

  const submitKeyWord = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      getBook();
    }
  };

  const onTextUpdate = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value === '') {
      setBooks([]);
      pageBtnNumber.current = 0;
      setSubmit(false);
    }
  };

  const checkHandler = ({ id, thumbnail, title, authors }) => {
    const newArr = Array(books.length).fill(false);
    newArr[parseInt(id, 10)] = true;
    setCheckArr(newArr);
    getBookInfo(title, authors, thumbnail);
    setSearchActive(false);
    setBookTitle(title);
  };

  const searchResultPaint = () => {
    if (books.length === 0) {
      return (
        <div>
          <span>&#34;{query}&#34;에 대한 검색결과가 없습니다.</span>
        </div>
      );
    } else {
      const result = [];
      books.forEach((book, index) => {
        if (book.thumbnail === '') {
          result.push(
            <SearchResult
              key={book.isbn}
              id={index}
              thumbnail={alternateImage}
              title={book.title}
              authors={book.authors}
              isCheck={checkArr[index]}
              checkHandler={checkHandler}
            />
          );
        } else {
          result.push(
            <SearchResult
              key={book.isbn}
              id={index}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              isCheck={checkArr[index]}
              checkHandler={checkHandler}
            />
          );
        }
      });
      return result;
    }
  };

  const pageBtnPaint = () => {
    const result = [];
    const pageBtnNumberArr = new Array(pageBtnNumber.current).fill(0);
    pageBtnNumberArr.forEach((value, index) => {
      const pageNumber = index + 1;
      result.push(
        <Pagenate
          key={pageNumber}
          setPage={setPage}
          number={pageNumber}
          fontWeight={page === pageNumber ? 900 : 'nomal'}
        />
      );
    });
    return result;
  };

  return (
    <Styled.SearchOutside>
      <Styled.SaerchWrapper>
        <Styled.Modal>
          <Styled.SearchClose>
            <button type='button' onClick={() => setSearchActive(false)}>
              <CancelIcon />
            </button>
          </Styled.SearchClose>
          <Styled.SearchBox>
            <Styled.SearchForm
              onSubmit={(e) => {
                submitKeyWord(e);
              }}
            >
              <Styled.SearchBar>
                <Styled.Input
                  type='search'
                  ref={searchInput}
                  placeholder='검색어를 입력해주세요.'
                  value={query}
                  onChange={onTextUpdate}
                />
                <button type='button' onClick={(e) => submitKeyWord(e)}>
                  <SearchIcon />
                </button>
              </Styled.SearchBar>
              <Styled.Divider />
            </Styled.SearchForm>
          </Styled.SearchBox>
          <Styled.ResultUl className='SearchResult'>
            {submit && searchResultPaint()}
          </Styled.ResultUl>
          {pageBtnNumber.current !== 0 && <Styled.PageWrapper>{pageBtnPaint()}</Styled.PageWrapper>}
        </Styled.Modal>
      </Styled.SaerchWrapper>
    </Styled.SearchOutside>
  );
};

export default SearchBook;
