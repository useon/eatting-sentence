import { dbService } from 'myBase';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';
import nowTime from 'utils/nowTime';

const DrawerEditor = ({setAddDrawerActive}) => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');

  const drawerHandle = async(event) => {
    event.preventDefault();
    const prevData = await userDataRef.collection('drawers').get();
    const newDrawName = event.target.previousSibling.value;
    
    addDrawerToDB(prevData, newDrawName);
    setAddDrawerActive(false);
  }

  const addDrawerToDB = (prevData, newDrawName) => {
    userDataRef
    .collection('drawers')
    .doc(newDrawName)
    .set({
      registeredTime: nowTime(),
    });
}

  return (
    <div>
      <input placeholder='서랍 이름을 입력해주세요.'></input>
      <button onClick={(event) => drawerHandle(event)}>확인</button>
    </div>
  )
}

export default DrawerEditor;