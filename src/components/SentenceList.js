import { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';

const SentenceList = ({type, edit, sentence, page, drawer, registeredTime, title, authors, thumbnail, setDeleteSentence}) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    if(setDeleteSentence !== false) {
      setDeleteSentence(sentence);
    }
  }, [deleteConfirm])

  const goAddContents = () => {
    navigate(`/addContents`, {
      state: { settingTitle: title, settingAuthors: authors, settingThumbnail: thumbnail, mode: 'edit', settingDrawer: drawer, settingSentence: sentence, settingPage: page },
    })
  }

  if(type === 'book') {
    if(edit) {
      return (
        <div className='sentenceList'>
          {modalActive && <ConfirmModal setModalActive={setModalActive} setDeleteConfirm={setDeleteConfirm}/>}
          <div className='senteceList edit_wrapper'>
            <button onClick={() => setModalActive(true)}>삭제</button>
            <button onClick={goAddContents}>수정</button>
          </div>
          <div>
            <p>{page}</p>
            <p>{sentence}</p>
            <p>{drawer}</p>
            <p>{registeredTime}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className='sentenceList'>
          <p>{page}</p>
          <p>{sentence}</p>
          <p>{drawer}</p>
          <p>{registeredTime}</p>
        </div>
      )
    }
  }
  if(type === 'drawer') {
    if(edit) {
      return (
        <div className='sentenceList'>
          {modalActive && <ConfirmModal setModalActive={setModalActive} setDeleteConfirm={setDeleteConfirm}/>}
          <div className='senteceList edit_wrapper'>
            <button onClick={() => setModalActive(true)}>삭제</button>
            <button onClick={goAddContents}>수정</button>
          </div>
          <div>
            <p>{title}</p>
            <p>{authors}</p>
            <p>{page}</p>
            <p>{sentence}</p>
            <p>{registeredTime}</p>
          </div>
      </div>
      )
    } else {
      return (
        <div className='sentenceList'>
          <p>{title}</p>
          <p>{authors}</p>
          <p>{page}</p>
          <p>{sentence}</p>
          <p>{registeredTime}</p>
      </div>
      )
    }
  }
}

export default SentenceList;
