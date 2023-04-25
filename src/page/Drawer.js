import MyHeader from 'components/MyHeader';
import SentenceList from 'components/SentenceList';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { dbService } = require('myBase');
const { useSelector } = require('react-redux');
const { selectEmail } = require('redux/userSlice');

const Drawer = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const location = useLocation();
  const navigate = useNavigate();
  const drawerName = location.state.drawer;
  const [docSnapshot, setDocSnapshot] = useState([]);
  const [senteceSorting, setSenteceSorting] = useState('최신순');
  const [listData, setListData] = useState([]);
  const [deleteSentence, setDeleteSentence] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    reprocesser();
  }, [docSnapshot, senteceSorting]);

  useEffect(() => {
    if(deleteSentence !== '') deleteSentenceToDB();
  }, [deleteSentence])

  const getData = async() => {
    const data = (await userDataRef.collection('sentences').where('drawers', 'array-contains', drawerName).get()).docs;
    setDocSnapshot(data);
  }

  const reprocesser = () => {
    const sortedArray = [];
    docSnapshot.map((query) => {
      sortedArray.push([query.data().registeredTime, [query.id, query.data().title, query.data().authors, query.data().thumbnail, query.data().page, query.data().drawers]]);
    })
    sortedArray.sort((a, b) => b[0] - a[0]);
    if(senteceSorting === '최신순')
      setListData(sortedArray);
    if(senteceSorting === '오래된순')
      setListData(sortedArray.reverse());
  }

  const deleteSentenceToDB = async() => {
    await userDataRef.collection('sentences').doc(deleteSentence).delete();
    await getData();
  }

  const selectHandler = (event) => {
    setSenteceSorting(event.target.value);
  }

  const paintSentenceList = () => {
    const result = [];
    if(editMode === true) {
      listData.map((array) => {
        result.push(<SentenceList type={'drawer'} edit={true} title={array[1][1]} authors={array[1][2]} sentence={array[1][0]} page={array[1][4]} drawer={array[1][5]} registeredTime={array[0]} setDeleteSentence={setDeleteSentence} thumbnail={array[1][3]}/>);
      });
    } else {
      listData.map((array) => {
        result.push(<SentenceList type={'drawer'} edit={false} title={array[1][1]} authors={array[1][2]} sentence={array[1][0]} page={array[1][4]} drawer={array[1][5]} registeredTime={array[0]} setDeleteSentence={false} thumbnail={array[1][3]}/>);
      });
    }

    return result;
  }

  const goAddContents = () => {
    navigate('/addContents', {
      state: { mode : 'unEntered' },
    })
  }

  return (
    <div>
      <MyHeader
      leftChild={
        <button onClick={() => navigate(-1)}>
        {'뒤로가기'}
        </button>
      }
      rightChild={
      <div>
        <button onClick={goAddContents}>문장추가하기</button>
        {editMode && <button onClick={() => setEditMode(false)}>취소</button>}
        {editMode === false && <button onClick={() => setEditMode(true)}>편집</button>}
      </div>
      }
      />
      <div>
        <select value={senteceSorting} onChange={selectHandler}>
          <option value='최신순'>최신순</option>
          <option value='오래된순'>오래된순</option>
        </select>
      </div>
      <section className="book">
        <div className="book information">
          <div>
            <span>{drawerName}</span>
          </div>
        </div>
        <div className="book sentencesWrapper">
          {paintSentenceList()}
        </div>
      </section>
  </div>
  )
}

export default Drawer;
