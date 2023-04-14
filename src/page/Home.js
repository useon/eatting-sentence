import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { authService, dbService } from 'myBase';
import MyHeader from 'components/MyHeader';
import Bookshelf from 'components/Bookshelf';
import IsLogIn from 'components/IsLogIn';
import HomeNavbar from 'components/HomeNavbar';
import Drawer from 'components/Drawer';

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');

  const navigate = useNavigate();
  const [mode, setMode] = useState('bookshelf');
  const [bookshelfData, setBookshelfData] = useState([]);
  const [drawersData, setDrawersData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async() =>{
    const sentencesSnapshot = (await userDataRef.collection('sentences').get()).docs
    const drawersSnapshot = (await userDataRef.collection('drawers').get()).docs
    const sentencesList = [];
    const drawersList = [];
    const bookInfoMap = new Map(); 
    sentencesSnapshot.map((query) => sentencesList.push(query.id));
    drawersSnapshot.map((query) => drawersList.push(query.id));

    await Promise.all(sentencesList.map(async(document) => {
      const data = (await userDataRef.collection('sentences').doc(document).get()).data();
      bookInfoMap.set(data.registeredTime, {
        title: data.title,
        authors: data.authors,
        thumbnail: data.thumbnail,
        drawers: data.drawers,
        })
    }))
    reprocesser(bookInfoMap);
    setDrawersData(drawersList);
  }

  const reprocesser = (bookInfoMap) => {
    const sortedBookData = new Map([...bookInfoMap].sort((a, b) => b[0] - a[0]));
    const nonOverlapping = new Map();
    for(let [key, value] of sortedBookData) {
        if(nonOverlapping.has(value.title) === false) {
        nonOverlapping.set(value.title, {
          authors: value.authors,
          thumbnail: value.thumbnail,
        })
      }
    }
    setBookshelfData(nonOverlapping);
  }

  const paintBookshelf = () => {
    const result = [];
    for(let [key, value] of bookshelfData) {
      result.push(<Bookshelf title={key} authors={value.authors} thumbnail={value.thumbnail}/>)
    }
    return result;
  }

  const paintDrawer = () => {
    const result = [];
    drawersData.map((drawer) => {
      result.push(<Drawer drawer={drawer}/>)
    })
    return result;
  }

  const logOut = () => {
    authService.signOut();
    IsLogIn();
  };

  const modeHandler = (mode) => {
    if(mode === 'bookshelf') setMode('bookshelf');
    if(mode === 'drawer') setMode('drawer');
  }            

  return (
    <div>
      <MyHeader
        leftChild={
          <button onClick={() => logOut()}>
            {'로그아웃'}
          </button>
        }
        rightChild={
          <button onClick={() => navigate('/addContents')}>
            {'추가'}
          </button>
        }
      />
      <HomeNavbar modeHandler={modeHandler}/>
      <section className="">
        <div className="bookcase compartment">
          {mode==='bookshelf' && paintBookshelf()}
          {mode === 'drawer' && paintDrawer()}
        </div>
      </section>
    </div>
  );
};

export default Home;
