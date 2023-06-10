import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { dbService } from 'myBase';
import nowTime from 'utils/nowTime';
import { ReactComponent as PlusIcon } from 'assets/icons/Plus.svg';
import SearchBook from '../SearchBook/SearchBook';
import DrawerEditor from './components/DrawerEditor/DrawerEditor';
import * as Styled from './SentenceEditor.styles';
import DrawerList from './components/DrawerList/DrawerList';

const SentenceEditor = ({ settingMode, settingInfo }) => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [addDrawerActive, setAddDrawerActive] = useState(false);
  const [bookInfo, setbookInfo] = useState({});
  const [allDrawers, setAllDrawers] = useState([]);
  const [errorActive, setErrorActive] = useState({});
  const [userInput, setUserInput] = useState({
    sentence: '',
    page: '',
  });

  const getBookInfo = (title, authors, thumbnail) => {
    setbookInfo({
      title,
      authors,
      thumbnail,
    });
  };

  const getToDrawer = async () => {
    const drawerArray = [];
    const data = (await userDataRef.collection('drawers').get()).docs;
    data.forEach((element) => {
      drawerArray.push(element.id);
    });
    setAllDrawers(drawerArray);
  };

  useEffect(() => {
    if (settingMode !== 'unEntered') {
      getBookInfo(
        settingInfo.settingTitle,
        settingInfo.settingAuthors,
        settingInfo.settingThumbnail
      );
    }
    if (settingMode === 'edit') {
      setUserInput({
        sentence: settingInfo.settingSentence,
        page: settingInfo.settingPage,
        drawer: settingInfo.settingDrawer,
      });
    }
    getToDrawer();
  }, []);

  useEffect(() => {
    getToDrawer();
  }, [addDrawerActive]);

  const selectedDrawerToState = () => {
    const drawerButtons = drawerRef.current.childNodes;
    const selectedDrawerArray = [];
    drawerButtons.forEach((value, index) => {
      const { selected } = drawerButtons[index].dataset;
      const drawerName = drawerButtons[index].value;
      if (selected === 'true') selectedDrawerArray.push(drawerName);
    });
    return selectedDrawerArray;
  };

  const dataToDB = async ({ sentence, selectedDrawer, page }) => {
    if (settingMode === 'edit') {
      await userDataRef.collection('sentences').doc(settingInfo.settingSentence).delete();
    }
    await userDataRef
      .collection('sentences')
      .doc(sentence)
      .set({
        title: bookInfo.title,
        authors: bookInfo.authors,
        thumbnail: bookInfo.thumbnail,
        page: Number(page),
        drawers: selectedDrawer,
        registeredTime: nowTime(),
      });
    navigate(-1);
  };

  const submitController = (event) => {
    event.preventDefault();
    let submit = true;
    const error = {
      title: false,
      sentence: false,
      page: false,
    };
    const title = bookInfo.title;
    const sentence = userInput.sentence;
    const page = userInput.page;
    const selectedDrawer = selectedDrawerToState();

    if (title === undefined) {
      submit = false;
      error.title = true;
    }

    if (sentence === '') {
      submit = false;
      error.sentence = true;
    }

    if (page !== '') {
      if (Number.isNaN(Number(page))) {
        submit = false;
        error.page = true;
      }
    }

    setErrorActive({ ...error });

    if (submit) {
      if (settingMode !== 'edit') {
        dataToDB({ sentence, selectedDrawer, page });
      }
      if (settingMode === 'edit' && settingInfo.sentence !== sentence) {
        dataToDB({ sentence, selectedDrawer, page });
      }
    }
  };

  const errorMessage = (message) => <Styled.ErrorArea>{message}</Styled.ErrorArea>;

  const handlerUserInput = (event, name) => {
    const { value } = event.target;
    if (name === 'sentence') {
      setUserInput({ ...userInput, sentence: value });
    }
    if (name === 'page') {
      setUserInput({ ...userInput, page: value });
    }
  };

  if (settingMode === 'unEntered') {
    return (
      <Styled.RightPage elevation={2}>
        {searchActive && (
          <SearchBook
            getBookInfo={getBookInfo}
            setSearchActive={setSearchActive}
            setBookTitle={setBookTitle}
          />
        )}
        <Styled.ListWrapper>
          <Styled.List>
            <Styled.Item className='titleLine'>
              <span>*&nbsp;제목</span>
              <Styled.Input
                placeholder='책을 검색하세요.'
                onClick={() => setSearchActive(true)}
                value={bookTitle}
                onChange={(event) => handlerUserInput(event, 'book')}
              />
            </Styled.Item>
            {errorActive.title && errorMessage('책을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='sentenceLine'>
              <span>*&nbsp;문장</span>
              <Styled.TextArea
                rows={4}
                placeholder='문장을 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'sentence')}
              />
            </Styled.Item>
            {errorActive.sentence && errorMessage('문장을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='pageLine'>
              <span>페이지</span>
              <Styled.Input
                placeholder='페이지를 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'page')}
              />
            </Styled.Item>
            {errorActive.page && errorMessage('숫자만 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.AddDrawerBtnWrapper>
              <button type='button' onClick={() => setAddDrawerActive(!addDrawerActive)}>
                <PlusIcon />
              </button>
            </Styled.AddDrawerBtnWrapper>
            <Styled.Item className='drawerBtnLine'>
              <span>서랍</span>
              <Styled.DrawerBtnWrapper ref={drawerRef}>
                {allDrawers.length > 0 && (
                  <DrawerList
                    allDrawers={allDrawers}
                    settingMode={settingMode}
                    selectedDrawers={settingInfo.settingDrawer}
                  />
                )}
              </Styled.DrawerBtnWrapper>
              {addDrawerActive && <DrawerEditor setAddDrawerActive={setAddDrawerActive} />}
            </Styled.Item>
          </Styled.List>
          <Styled.SubmitBtnWrapper>
            <Styled.SubmitBtn onClick={(event) => submitController(event)}>확인</Styled.SubmitBtn>
          </Styled.SubmitBtnWrapper>
        </Styled.ListWrapper>
      </Styled.RightPage>
    );
  }

  if (settingMode === 'bookEntered') {
    return (
      <Styled.RightPage elevation={2}>
        {searchActive && (
          <SearchBook
            getBookInfo={getBookInfo}
            setSearchActive={setSearchActive}
            setBookTitle={setBookTitle}
          />
        )}
        <Styled.ListWrapper>
          <Styled.List>
            <Styled.Item className='titleLine'>
              <span>*&nbsp;제목</span>
              <Styled.Input
                placeholder='책을 검색하세요.'
                onClick={() => setSearchActive(true)}
                value={bookInfo.title}
                onChange={(event) => handlerUserInput(event, 'book')}
              />
            </Styled.Item>
            {errorActive.title && errorMessage('책을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='sentenceLine'>
              <span>*&nbsp;문장</span>
              <Styled.TextArea
                rows={4}
                placeholder='문장을 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'sentence')}
              />
            </Styled.Item>
            {errorActive.sentence && errorMessage('문장을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='pageLine'>
              <span>페이지</span>
              <Styled.Input
                placeholder='페이지를 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'page')}
              />
            </Styled.Item>
            {errorActive.page && errorMessage('숫자만 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.AddDrawerBtnWrapper>
              <button type='button' onClick={() => setAddDrawerActive(!addDrawerActive)}>
                <PlusIcon />
              </button>
            </Styled.AddDrawerBtnWrapper>
            <Styled.Item className='drawerBtnLine'>
              <span>서랍</span>
              <Styled.DrawerBtnWrapper ref={drawerRef}>
                {allDrawers.length > 0 && (
                  <DrawerList
                    allDrawers={allDrawers}
                    settingMode={settingMode}
                    selectedDrawers={settingInfo.settingDrawer}
                  />
                )}
              </Styled.DrawerBtnWrapper>
              {addDrawerActive && <DrawerEditor setAddDrawerActive={setAddDrawerActive} />}
            </Styled.Item>
          </Styled.List>
          <Styled.SubmitBtnWrapper>
            <Styled.SubmitBtn onClick={(event) => submitController(event)}>확인</Styled.SubmitBtn>
          </Styled.SubmitBtnWrapper>
        </Styled.ListWrapper>
      </Styled.RightPage>
    );
  }

  if (settingMode === 'edit') {
    return (
      <Styled.RightPage elevation={2}>
        {searchActive && (
          <SearchBook
            getBookInfo={getBookInfo}
            setSearchActive={setSearchActive}
            setBookTitle={setBookTitle}
          />
        )}
        <Styled.ListWrapper>
          <Styled.List>
            <Styled.Item className='titleLine'>
              <span>*&nbsp;제목</span>
              <Styled.Input
                placeholder='책을 검색하세요.'
                onClick={() => setSearchActive(true)}
                value={bookInfo.title}
                onChange={(event) => handlerUserInput(event, 'book')}
              />
            </Styled.Item>
            {errorActive.title && errorMessage('책을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='sentenceLine'>
              <span>*&nbsp;문장</span>
              <Styled.TextArea
                rows={4}
                placeholder='문장을 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'sentence')}
                value={userInput.sentence}
              />
            </Styled.Item>
            {errorActive.sentence && errorMessage('문장을 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.Item className='pageLine'>
              <span>페이지</span>
              <Styled.Input
                placeholder='페이지를 입력해주세요.'
                onChange={(event) => handlerUserInput(event, 'page')}
                value={userInput.page !== undefined ? userInput.page : ''}
              />
            </Styled.Item>
            {errorActive.page && errorMessage('숫자만 입력해주세요.')}
          </Styled.List>
          <Styled.List>
            <Styled.AddDrawerBtnWrapper>
              <button type='button' onClick={() => setAddDrawerActive(!addDrawerActive)}>
                <PlusIcon />
              </button>
            </Styled.AddDrawerBtnWrapper>
            <Styled.Item className='drawerBtnLine'>
              <span>서랍</span>
              <Styled.DrawerBtnWrapper ref={drawerRef}>
                {allDrawers.length > 0 && (
                  <DrawerList
                    allDrawers={allDrawers}
                    settingMode={settingMode}
                    selectedDrawers={settingInfo.settingDrawer}
                  />
                )}
              </Styled.DrawerBtnWrapper>
              {addDrawerActive && <DrawerEditor setAddDrawerActive={setAddDrawerActive} />}
            </Styled.Item>
          </Styled.List>
          <Styled.SubmitBtnWrapper>
            <Styled.SubmitBtn onClick={(event) => submitController(event)}>확인</Styled.SubmitBtn>
          </Styled.SubmitBtnWrapper>
        </Styled.ListWrapper>
      </Styled.RightPage>
    );
  }
};

export default SentenceEditor;
