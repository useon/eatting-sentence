import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from 'assets/icons/Delete.svg';
import { ReactComponent as EditIcon } from 'assets/icons/Edit.svg';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import * as Styled from './SentenceList.styles';

const SentenceList = ({
  type,
  edit,
  sentence,
  page,
  drawer,
  registeredTime,
  title,
  authors,
  thumbnail,
  setDeleteSentence,
}) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const timeArr = registeredTime.toString().split('').splice(0, 10);
  const timeObj = {
    year: timeArr.splice(0, 2).join(''),
    month: timeArr.splice(0, 2).join(''),
    day: timeArr.splice(0, 2).join(''),
    hour: timeArr.splice(0, 2).join(''),
    minute: timeArr.splice(0, 2).join(''),
  };
  const time = `${timeObj.year}.${timeObj.month}.${timeObj.day} ${timeObj.hour}:${timeObj.minute}`;

  useEffect(() => {
    if (deleteConfirm) {
      setDeleteSentence(sentence);
    }
  }, [deleteConfirm]);

  const goAddContents = () => {
    navigate('/addContents', {
      state: {
        settingTitle: title,
        settingAuthors: authors,
        settingThumbnail: thumbnail,
        settingMode: 'edit',
        settingDrawer: drawer,
        settingSentence: sentence,
        settingPage: page,
      },
    });
  };

  if (type === 'book') {
    let drawerName = drawer;
    if (drawer.length > 0) {
      drawerName = drawer.join(', ');
    }
    if (edit) {
      return (
        <Styled.ContentsArea>
          <Styled.EditBox>
            <button onClick={() => setModalActive(true)} type='button' title='문장삭제'>
              <DeleteIcon />
            </button>
            <button onClick={goAddContents} type='button' title='문장수정'>
              <EditIcon />
            </button>
          </Styled.EditBox>
          {modalActive && (
            <ConfirmModal setModalActive={setModalActive} setDeleteConfirm={setDeleteConfirm} />
          )}
          <Styled.SentenceBox>
            <Styled.Header>
              <Styled.SentenceInfoText>{time}</Styled.SentenceInfoText>
            </Styled.Header>
            <Styled.BoxArticle>
              {page !== 0 && (
                <Styled.SentenceInfoText>p.&nbsp;{page}&nbsp;</Styled.SentenceInfoText>
              )}
              <Styled.Sentence>{sentence}</Styled.Sentence>
            </Styled.BoxArticle>
            <Styled.BoxFooter>
              <Styled.SentenceInfoText>{drawerName}</Styled.SentenceInfoText>
            </Styled.BoxFooter>
          </Styled.SentenceBox>
        </Styled.ContentsArea>
      );
    }
    return (
      <Styled.ContentsArea>
        <Styled.SentenceBox>
          <Styled.Header>
            <Styled.SentenceInfoText>{time}</Styled.SentenceInfoText>
          </Styled.Header>
          <Styled.BoxArticle>
            {page !== 0 && <Styled.SentenceInfoText>p.&nbsp;{page}&nbsp;</Styled.SentenceInfoText>}
            <Styled.Sentence>{sentence}</Styled.Sentence>
          </Styled.BoxArticle>
          <Styled.BoxFooter>
            <Styled.SentenceInfoText>{drawerName}</Styled.SentenceInfoText>
          </Styled.BoxFooter>
        </Styled.SentenceBox>
      </Styled.ContentsArea>
    );
  }
  if (type === 'drawer') {
    if (edit) {
      return (
        <Styled.ContentsArea>
          <Styled.EditBox>
            <button onClick={() => setModalActive(true)} type='button' title='문장삭제'>
              <DeleteIcon />
            </button>
            <button onClick={goAddContents} type='button' title='문장수정'>
              <EditIcon />
            </button>
          </Styled.EditBox>
          {modalActive && (
            <ConfirmModal setModalActive={setModalActive} setDeleteConfirm={setDeleteConfirm} />
          )}
          <Styled.SentenceBox>
            <Styled.Header>
              <Styled.SentenceInfoText>{time}</Styled.SentenceInfoText>
            </Styled.Header>
            <Styled.BoxArticle>
              <Styled.Sentence>{sentence}</Styled.Sentence>
            </Styled.BoxArticle>
            <Styled.BoxFooter>
              {authors.length > 1 ? `${authors.join(', ')}` : `${authors}`}
              {authors.length > 0 ? ` - ${title}` : title}
              {page !== 0 && (
                <Styled.SentenceInfoText>&nbsp;p.&nbsp;{page}</Styled.SentenceInfoText>
              )}
            </Styled.BoxFooter>
          </Styled.SentenceBox>
        </Styled.ContentsArea>
      );
    }
    return (
      <Styled.ContentsArea>
        <Styled.SentenceBox>
          <Styled.Header>
            <Styled.SentenceInfoText>{time}</Styled.SentenceInfoText>
          </Styled.Header>
          <Styled.BoxArticle>
            <Styled.Sentence>{sentence}</Styled.Sentence>
          </Styled.BoxArticle>
          <Styled.BoxFooter>
            {authors.length > 1 ? `${authors.join(', ')}` : `${authors}`}
            {authors.length > 0 ? ` - ${title}` : title}
            {page !== 0 && (
              <Styled.SentenceInfoText>&nbsp;&nbsp;p.&nbsp;{page}</Styled.SentenceInfoText>
            )}
          </Styled.BoxFooter>
        </Styled.SentenceBox>
      </Styled.ContentsArea>
    );
  }
};

export default SentenceList;
