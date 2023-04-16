import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBook from './SearchBook';
import DrawerEditor from './DrawerEditor';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { dbService } from 'myBase';
import nowTime from 'utils/nowTime';

const SentenceEditor = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [addDrawerActive, setAddDrawerActive] = useState(false);
  const [bookInfo, setbookInfo] = useState({});
  const [drawerList, setDrawerList] = useState([]);
  const [errorActive, setErrorActive] = useState([]);

  useEffect(() => {
    getToDrawer();
  }, [])

  useEffect(() => {
    getToDrawer();
  }, [addDrawerActive])

  const getBookInfo = (title, authors, thumbnail) => {
    setbookInfo({
      title: title,
      authors: authors,
      thumbnail: thumbnail,
    })
  };

  const getToDrawer = async() => {
    const drawerArray = [];
    const data = (await userDataRef.collection('drawers').get()).docs;
    data.forEach((element) => {
      drawerArray.push(element.id);
    })
    setDrawerList(drawerArray);
  }

  const paintDrawer = () => {
    return (
      drawerList.map((drawer) => (
        <button onClick={(e) => selectHandler(e)} type='button' value={drawer} data-check={false}>{drawer}</button>
      ))
    )
  }

  const selectHandler = (e) => {
    const target = e.target;
    if(target.dataset.check === 'true') {
      target.dataset.check = 'false';
    } else {
      target.dataset.check = 'true';
    }
  }

  const selectedDrawerToState = (element) => {
    const drawerButton = element.target.previousSibling.children[0].children[1].childNodes;
    const selectedDrawerArray = [];
    for(let index = 0; index < drawerButton.length; index++) {
      const isSelected = drawerButton[index].dataset.check;
      const drawerName = drawerButton[index].value;
      if(isSelected === 'true') selectedDrawerArray.push(drawerName);
    }
    return selectedDrawerArray;
  }

  const dataToDB = ({sentence, selectedDrawer, page}) => {
    userDataRef
    .collection('sentences')
    .doc(sentence)
    .set({
      title: bookInfo.title,
      authors: bookInfo.authors,
      thumbnail: bookInfo.thumbnail,
      page: Number(page),
      drawers: selectedDrawer,
      registeredTime: nowTime(),
    })
    navigate(-1);
  }

  const submitController = (event) => {
    const error = [];
    let submit = true;
    const bookTitle = event.target.parentNode.firstChild.children[1].value;
    const sentence = event.target.previousSibling.previousSibling.previousSibling.children[1].value;
    const page = event.target.previousSibling.previousSibling.children[1].value;
    const selectedDrawer = selectedDrawerToState(event);

    if(bookTitle === '') {
      submit = false;
      error.push(true);
    } else {
      error.push(false);
    }
    if(sentence === '') {
      submit = false;
      error.push(true);
    } else {
      error.push(false);
    }
    if(isNaN(Number(page))) {
      submit = false;
      error.push(true);
    } else {
      error.push(false);
    }

    setErrorActive(error)
    if(submit) dataToDB({sentence, selectedDrawer, page});
  }

  return (
    <div className='sentenceEditor'>
      <div>
        <p>책 검색</p>
        <input placeholder='책을 검색하세요.' required onClick={() => setSearchActive(true)} value={bookTitle}/>
        {errorActive[0] && <p>책을 입력해주세요.</p>}
      </div>
      <div>
        {searchActive && <SearchBook getBookInfo={getBookInfo} setSearchActive={setSearchActive} setBookTitle={setBookTitle}/>}
      </div>
      <div>
        <p>문장</p>
        <textarea placeholder='문장을 입력해주세요.'></textarea>
        {errorActive[1] && <p>문장을 입력해주세요.</p>}
      </div>
      <div>
        <p>페이지</p>
        <input type='text'/>
        {errorActive[2] && <p>숫자만 입력해주세요.</p>}
      </div>
      <div>
        <div>
          <p>서랍</p>
          <div>{drawerList.length !== 0 && paintDrawer()}</div>
          <button onClick={() => setAddDrawerActive(!addDrawerActive)}>새 서랍 추가</button>
        </div>
        {addDrawerActive && <DrawerEditor setAddDrawerActive={setAddDrawerActive}/>}
      </div>
      <button onClick={(event) => submitController(event)}>확인</button>
    </div>
  )
}

export default SentenceEditor;
