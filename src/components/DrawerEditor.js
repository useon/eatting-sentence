import { dbService } from 'myBase';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/userSlice';

const DrawerEditor = ({setAddDrawer}) => {
  const userEmail = useSelector(selectEmail);
  const userDataRef = dbService.collection(userEmail).doc('userData');

  const drawerHandle = async(event) => {
    event.preventDefault();
    const prevDrawers = (
      await userDataRef.collection('content').doc('drawer').get()
      ).data().name;
    setAddDrawer(false);
    const newDrawName = event.target.previousSibling.value;
    addDrawerToDB(prevDrawers,newDrawName);
  }


  const addDrawerToDB = (prevDrawers, newDrawName) => {
    if(prevDrawers === undefined) {
      userDataRef
      .collection('content')
      .doc('drawer')
      .set({
        name: [newDrawName],
      })
    } else {
      if(!prevDrawers.includes(newDrawName)) {
        userDataRef
        .collection('content')
        .doc('drawer')
        .set({
          name: [...prevDrawers, newDrawName],
        });
      }
  }
}

  return (
    <div>
      <input placeholder='서랍 이름을 입력해주세요.'></input>
      <button onClick={(event) => drawerHandle(event)}>확인</button>
    </div>
  )
}

export default DrawerEditor;