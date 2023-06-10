import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import { authService, dbService } from 'myBase';
import { persistor } from 'index';
import Bookshelf from 'components/Bookshelf/Bookshelf';
import Drawers from 'components/Drawers/Drawers';
import logo from 'assets/images/Logo.png';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/Plus.svg';
import { Header, Note } from 'styles/Shared/shared';
import * as Styled from './Home.styles';

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');

  const navigate = useNavigate();
  const [mode, setMode] = useState('bookshelf');
  const [bookshelfData, setBookshelfData] = useState([]);
  const [drawersData, setDrawersData] = useState([]);

  const getData = async () => {
    const sentencesSnapshot = (await userDataRef.collection('sentences').get()).docs;
    const drawersSnapshot = (await userDataRef.collection('drawers').get()).docs;
    const sentencesList = [];
    const drawersList = [];
    const bookInfoMap = new Map();
    sentencesSnapshot.map((query) => sentencesList.push(query.id));
    drawersSnapshot.map((query) => drawersList.push(query.id));

    const reprocesser = (bookInfoData) => {
      const sortedBookData = new Map([...bookInfoData].sort((a, b) => b[0] - a[0]));
      const nonOverlapping = new Map();

      sortedBookData.forEach((value, key) => {
        if (nonOverlapping.has(`${value.title} ${value.authors}`) === false) {
          nonOverlapping.set(`${value.title} ${value.authors}`, {
            title: value.title,
            authors: value.authors,
            thumbnail: value.thumbnail,
          });
        }
      });
      setBookshelfData(nonOverlapping);
    };

    await Promise.all(
      sentencesList.map(async (document) => {
        const data = (await userDataRef.collection('sentences').doc(document).get()).data();
        const sentence = (await userDataRef.collection('sentences').doc(document).get()).id;

        bookInfoMap.set(data.registeredTime, {
          title: data.title,
          authors: data.authors,
          thumbnail: data.thumbnail,
          sentence,
          drawers: data.drawers,
        });
      })
    );
    reprocesser(bookInfoMap);
    setDrawersData(drawersList);
  };

  useEffect(() => {
    getData();
  }, []);

  const paintBookshelf = () => {
    const result = [];
    bookshelfData.forEach((value, key) => {
      result.push(
        <Bookshelf
          id={key}
          title={value.title}
          authors={value.authors}
          thumbnail={value.thumbnail}
        />
      );
    });
    return result;
  };

  const paintDrawers = () => {
    const result = [];
    drawersData.forEach((drawer) => {
      result.push(<Drawers drawer={drawer} />);
    });
    return result;
  };

  const goAddContents = () => {
    navigate('/addContents', {
      state: { settingMode: 'unEntered' },
    });
  };

  const paintNodata = () => (
    <div>
      <img src={logo} alt='로고' />
      <p>등록된 문장이 없어요</p>
      <button type='button' onClick={goAddContents}>
        <PlusIcon />
      </button>
    </div>
  );

  // logout을 home에서 말고 컴포넌트를 따로 만들자.
  const logOut = async () => {
    navigate('/login');
    await authService.signOut();
    await persistor.purge();
  };

  if (bookshelfData.size === 0) {
    return (
      <Note>
        <Header>
          <button type='button' onClick={() => logOut()}>
            <LogoutIcon />
          </button>
        </Header>
        <section>{paintNodata()}</section>
      </Note>
    );
  }
  return (
    <>
      <Header>
        <button type='button' onClick={() => logOut()}>
          <LogoutIcon />
        </button>
        <button type='button' onClick={goAddContents}>
          <PlusIcon />
        </button>
      </Header>
      <Styled.Section>
        <Styled.ModeSelect>
          <Styled.ModeButtonWrapper fill={mode === 'bookshelf' ? '#353535' : ''}>
            <Styled.ModeButton
              onClick={() => setMode('bookshelf')}
              color={mode === 'bookshelf' ? 'white' : 'black'}
            >
              책장
            </Styled.ModeButton>
          </Styled.ModeButtonWrapper>
          <Styled.ModeButtonWrapper fill={mode === 'drawers' ? '#353535' : ''}>
            <Styled.ModeButton
              onClick={() => setMode('drawers')}
              color={mode === 'drawers' ? 'white' : 'black'}
            >
              서랍
            </Styled.ModeButton>
          </Styled.ModeButtonWrapper>
        </Styled.ModeSelect>
        {mode === 'bookshelf' && <Styled.BookList>{paintBookshelf()}</Styled.BookList>}
        {mode === 'drawers' && (
          <Styled.Article>
            <Styled.Drawers>
              <Styled.DrawerWrapper>{paintDrawers()}</Styled.DrawerWrapper>
            </Styled.Drawers>
          </Styled.Article>
        )}
      </Styled.Section>
    </>
  );
};

export default Home;
