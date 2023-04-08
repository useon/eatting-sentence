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
    const drawerButton = element.target.previousSibling.firstChild.firstChild.childNodes;
    const selectedDrawerArray = [];
    for(let index = 0; index < drawerButton.length; index++) {
      const isSelected = drawerButton[index].dataset.check;
      const drawerName = drawerButton[index].value;
      if(isSelected === 'true') selectedDrawerArray.push(drawerName);
    }
    return selectedDrawerArray;
  }

  const dataToDB = (e) => {
    const selectedDrawer = selectedDrawerToState(e);
    const sentence = e.target.previousSibling.previousSibling.value;
    userDataRef
    .collection('sentences')
    .doc(sentence)
    .set({
      title: bookInfo.title,
      authors: bookInfo.authors,
      thumbnail: bookInfo.thumbnail,
      drawers: selectedDrawer,
      registeredTime: nowTime(),
    })
    navigate(-1);
  }

  return (
    <div className='sentenceEditor'>
      <input placeholder='책을 입력해주세요.' required onClick={() => setSearchActive(true)} value={bookTitle}/>
      <div>
        {searchActive && <SearchBook getBookInfo={getBookInfo} setSearchActive={setSearchActive} setBookTitle={setBookTitle}/>}
      </div>
      <textarea></textarea>
      <div>
        <div>
          <div>{drawerList.length !== 0 && paintDrawer()}</div>
          <button onClick={() => setAddDrawerActive(!addDrawerActive)}>새 서랍 추가</button>
        </div>
        {addDrawerActive && <DrawerEditor setAddDrawerActive={setAddDrawerActive}/>}
      </div>
      <button onClick={(e) => dataToDB(e)}>확인</button>
    </div>
  )
}

export default SentenceEditor;
