import { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';

const SentenceList = ({type, edit, sentence, page, drawer, registeredTime, title, authors, setDeleteSentence}) => {
  const [modalActive, setModalActive] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if(setDeleteSentence !== false) {
      setDeleteSentence(sentence);
    }
  }, [deleteConfirm])

  if(type === 'book') {
    if(edit) {
      return (
        <div className='sentenceList'>
          {modalActive && <ConfirmModal setModalActive={setModalActive} setDeleteConfirm={setDeleteConfirm}/>}
          <div className='senteceList edit_wrapper'>
            <button onClick={() => setModalActive(true)}>삭제</button>
            <button>수정</button>
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
          <div className='senteceList edit_wrapper'>
            <button onClick={() => setModalActive(true)}>삭제</button>
            <button>수정</button>
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
