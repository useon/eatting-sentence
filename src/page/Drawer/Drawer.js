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

const Drawer = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const navigate = useNavigate();
  const location = useLocation();
  const drawerName = location.state.drawer;

  const [docSnapshot, setDocSnapshot] = useState([]);
  const [listData, setListData] = useState([]);
  const [senteceSorting, setSenteceSorting] = useState('최신순');
  const [editMode, setEditMode] = useState(false);
  const [deleteSentence, setDeleteSentence] = useState('');
  const selectRef = useRef(null);

  const getData = async () => {
    const data = (
      await userDataRef.collection('sentences').where('drawers', 'array-contains', drawerName).get()
    ).docs;
    setDocSnapshot(data);
  };

  const reprocesser = () => {
    const sortedArray = [];
    docSnapshot.forEach((query) => {
      sortedArray.push([
        query.data().registeredTime,
        [query.id, query.data().title, query.data().page, query.data().authors],
      ]);
    });
    sortedArray.sort((a, b) => b[0] - a[0]);
    if (senteceSorting === '최신순') setListData(sortedArray);
    if (senteceSorting === '오래된순') setListData(sortedArray.reverse());
  };

  const deleteSentenceToDB = async () => {
    await userDataRef.collection('sentences').doc(deleteSentence).delete();
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    reprocesser();
  }, [docSnapshot, senteceSorting]);

  useEffect(() => {
    if (deleteSentence !== '') deleteSentenceToDB();
  }, [deleteSentence]);

  const paintSentenceList = () => {
    const result = [];
    if (editMode === true) {
      listData.forEach((array) => {
        const registeredTime = array[0];
        result.push(
          <SentenceList
            key={registeredTime}
            type='drawer'
            edit
            title={array[1][1]}
            authors={array[1][3]}
            sentence={array[1][0]}
            page={array[1][2]}
            registeredTime={array[0]}
            setDeleteSentence={setDeleteSentence}
          />
        );
      });
      return result;
    }
    if (editMode === false) {
      listData.forEach((array) => {
        const registeredTime = array[0];
        result.push(
          <SentenceList
            key={registeredTime}
            type='drawer'
            edit={false}
            title={array[1][1]}
            authors={array[1][3]}
            sentence={array[1][0]}
            page={array[1][2]}
            registeredTime={array[0]}
            setDeleteSentence={false}
          />
        );
      });
      return result;
    }
  };

  const goAddContents = () => {
    navigate('/addContents', {
      state: { settingMode: 'unEntered' },
    });
  };

  const handleSelect = () => {
    setSenteceSorting(selectRef.current.selected);
  };

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
        {/* <Styled.Select ref={selectRef} selected={senteceSorting} onMouseLeave={handleSelect}>
          <Styled.Item value='최신순'>최신순</Styled.Item>
          <Styled.Item value='오래된순'>오래된순</Styled.Item>
        </Styled.Select> */}
        <Styled.Section>
          <Styled.Info>
            <Styled.Title>{drawerName}</Styled.Title>
          </Styled.Info>
          <Styled.SentencesWrapper>{paintSentenceList()}</Styled.SentencesWrapper>
        </Styled.Section>
      </Styled.NotePad>
    </>
  );
};

export default Drawer;
