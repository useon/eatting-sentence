import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { dbService } from 'myBase';
import SentenceList from 'components/SenteceList/SentenceList';
import { ReactComponent as PlusIcon } from 'assets/icons/Plus.svg';
import { ReactComponent as BackIcon } from 'assets/icons/Back.svg';
import { ReactComponent as EditIcon } from 'assets/icons/Edit.svg';
import { ReactComponent as CancelIcon } from 'assets/icons/Cancel.svg';
import { Header } from 'styles/Shared/shared';
import * as Styled from 'styles/Shared/BookAndDrawer';

const Book = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.settingTitle;
  const authors = location.state.settingAuthors;
  const thumbnail = location.state.settingThumbnail;
  const [docSnapshot, setDocSnapshot] = useState([]);
  const [listData, setListData] = useState([]);
  const [sentenceSorting, setSentenceSorting] = useState('페이지오름차순');
  const [editMode, setEditMode] = useState(false);
  const [deleteSentence, setDeleteSentence] = useState('');
  const [reprocessorAction, setReprocessorAction] = useState(false);
  const selectRef = useRef(null);

  const getBookData = async () => {
    const data = (
      await userDataRef
        .collection('sentences')
        .where('title', '==', title)
        .where('authors', '==', authors)
        .get()
    ).docs;
    setDocSnapshot(data);
  };

  const reprocessor = () => {
    const sortedArray = [];
    if (sentenceSorting.includes('페이지')) {
      docSnapshot.forEach((query) => {
        sortedArray.push([
          query.data().page,
          [query.id, query.data().drawers, query.data().registeredTime],
        ]);
      });
      sortedArray.sort((a, b) => a[0] - b[0]);
      if (sentenceSorting === '페이지오름차순') {
        return setListData(sortedArray);
      }
      if (sentenceSorting === '페이지내림차순') {
        return setListData(sortedArray.reverse());
      }
    } else {
      docSnapshot.forEach((query) => {
        sortedArray.push([
          query.data().registeredTime,
          [query.id, query.data().page, query.data().drawers],
        ]);
      });
      sortedArray.sort((a, b) => b[0] - a[0]);
      if (sentenceSorting === '최신순') {
        return setListData(sortedArray);
      }
      if (sentenceSorting === '오래된순') {
        return setListData(sortedArray.reverse());
      }
    }
  };

  const paintSentenceList = () => {
    const result = [];
    if (editMode === true) {
      if (sentenceSorting.includes('페이지')) {
        listData.forEach((array) => {
          const registeredTime = array[1][2];
          result.push(
            <SentenceList
              key={registeredTime}
              type='book'
              edit
              title={title}
              authors={authors}
              sentence={array[1][0]}
              page={array[0]}
              drawer={array[1][1]}
              registeredTime={array[1][2]}
              setDeleteSentence={setDeleteSentence}
              thumbnail={thumbnail}
            />
          );
        });
        return result;
      }
      if (sentenceSorting.includes('페이지') === false) {
        listData.forEach((array) => {
          const registeredTime = array[0];
          result.push(
            <SentenceList
              key={registeredTime}
              type='book'
              edit
              title={title}
              authors={authors}
              sentence={array[1][0]}
              page={array[1][1]}
              drawer={array[1][2]}
              registeredTime={array[0]}
              setDeleteSentence={setDeleteSentence}
              thumbnail={thumbnail}
            />
          );
        });
        return result;
      }
    }

    if (editMode === false) {
      if (sentenceSorting.includes('페이지')) {
        listData.forEach((array) => {
          const registeredTime = array[1][2];
          result.push(
            <SentenceList
              key={registeredTime}
              type='book'
              edit={false}
              title={title}
              authors={authors}
              sentence={array[1][0]}
              page={array[0]}
              drawer={array[1][1]}
              registeredTime={array[1][2]}
              setDeleteSentence={false}
              thumbnail={thumbnail}
            />
          );
        });
        return result;
      }
      if (sentenceSorting.includes('페이지') === false) {
        listData.forEach((array) => {
          const registeredTime = array[0];
          result.push(
            <SentenceList
              key={registeredTime}
              type='book'
              edit={false}
              title={title}
              authors={authors}
              sentence={array[1][0]}
              page={array[1][1]}
              drawer={array[1][2]}
              registeredTime={array[0]}
              setDeleteSentence={false}
              thumbnail={thumbnail}
            />
          );
        });
        return result;
      }
    }
  };

  const goAddContents = () => {
    navigate('/addContents', {
      state: {
        settingTitle: title,
        settingAuthors: authors,
        settingThumbnail: thumbnail,
        settingMode: 'bookEntered',
      },
    });
  };

  const deleteSentenceToDB = async () => {
    await userDataRef.collection('sentences').doc(deleteSentence).delete();
    await getBookData();
  };

  const handleSelect = () => {
    setSentenceSorting(selectRef.current.selected);
  };

  useEffect(() => {
    getBookData();
  }, []);

  useEffect(() => {
    setReprocessorAction(false);
    reprocessor();
  }, [docSnapshot, sentenceSorting]);

  useEffect(() => {
    setReprocessorAction(true);
  }, [listData]);

  useEffect(() => {
    if (deleteSentence !== '') deleteSentenceToDB();
  }, [deleteSentence]);

  return (
    <>
      <Header>
        <button type='button' onClick={() => navigate(-1)} title='뒤로가기'>
          <BackIcon />
        </button>
        <div>
          <button type='button' onClick={goAddContents} title='문장추가'>
            <PlusIcon />
          </button>
          {editMode && (
            <button type='button' onClick={() => setEditMode(false)} title='취소하기'>
              <CancelIcon />
            </button>
          )}
          {editMode === false && (
            <button type='button' onClick={() => setEditMode(true)} title='수정하기'>
              <EditIcon />
            </button>
          )}
        </div>
      </Header>
      <Styled.NotePad>
        <Styled.Select ref={selectRef} selected={sentenceSorting} onMouseLeave={handleSelect}>
          <Styled.Item value='페이지오름차순'>페이지오름차순</Styled.Item>
          <Styled.Item value='페이지내림차순'>페이지내림차순</Styled.Item>
          {/* <Styled.Item value='최신순'>최신순</Styled.Item>
          <Styled.Item value='오래된순'>오래된순</Styled.Item> */}
        </Styled.Select>
        <Styled.Section>
          <Styled.Info>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Authors>{authors.length > 1 ? authors.join(', ') : authors}</Styled.Authors>
          </Styled.Info>
          <Styled.SentencesWrapper>
            {reprocessorAction && paintSentenceList()}
          </Styled.SentencesWrapper>
        </Styled.Section>
      </Styled.NotePad>
    </>
  );
};

export default Book;
