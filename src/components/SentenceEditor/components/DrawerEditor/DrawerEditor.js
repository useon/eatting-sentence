import { useRef, useState } from 'react';
import { dbService } from 'myBase';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import nowTime from 'utils/nowTime';
import { ReactComponent as CancelIcon } from 'assets/icons/Cancel.svg';
import * as Styled from './DrawerEditor.styles';

const DrawerEditor = ({ setAddDrawerActive }) => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');
  const inputRef = useRef(null);
  const [addDrawerError, setAddDrawerError] = useState(false);

  const addDrawerToDB = (newDrawer) => {
    setAddDrawerActive(false);
    userDataRef.collection('drawers').doc(newDrawer).set({
      registeredTime: nowTime(),
    });
  };

  const drawerHandle = async (event) => {
    event.preventDefault();
    const drawerList = [];
    const queryDocumentSnapshot = (await userDataRef.collection('drawers').get()).docs;
    const newDrawer = inputRef.current.value;
    queryDocumentSnapshot.map((query) => drawerList.push(query.id));

    if (drawerList.includes(newDrawer)) {
      setAddDrawerError(true);
    } else {
      addDrawerToDB(newDrawer);
    }
  };

  const errorPaint = () => <Styled.ErrorMessage>이미 존재하는 서랍입니다.</Styled.ErrorMessage>;

  return (
    <Styled.ModalOutside>
      <Styled.ModalWrapper>
        <Styled.Header>
          <button type='button' onClick={() => setAddDrawerActive(false)}>
            <CancelIcon />
          </button>
        </Styled.Header>
        <Styled.Contents>
          <Styled.Input ref={inputRef} placeholder='새 서랍의 이름을 입력해주세요.' />
          <Styled.ButtonWrapper>
            <Styled.Button onClick={(event) => drawerHandle(event)}>확인</Styled.Button>
          </Styled.ButtonWrapper>
          {addDrawerError ? errorPaint() : ''}
        </Styled.Contents>
      </Styled.ModalWrapper>
    </Styled.ModalOutside>
  );
};

export default DrawerEditor;
