import { useLocation, useNavigate } from 'react-router-dom';
import SentenceEditor from 'components/SentenceEditor/SentenceEditor';
import { Header, Note } from 'styles/Shared/shared';
import { ReactComponent as BackIcon } from 'assets/icons/Back.svg';
import { css } from '@emotion/react';
import * as Styled from './AddContents.styles';

const style = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const AddContents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let settingTitle;
  let settingAuthors;
  let settingThumbnail;
  let settingDrawer;
  let settingSentence;
  let settingPage;
  const mode = location.state.settingMode;

  if (mode !== 'unEntered') {
    settingTitle = location.state.settingTitle;
    settingAuthors = location.state.settingAuthors;
    settingThumbnail = location.state.settingThumbnail;
    if (mode === 'edit') {
      settingSentence = location.state.settingSentence;
      settingPage = location.state.settingPage;
      settingDrawer = location.state.settingDrawer;
    }
  }

  return (
    <Note css={style}>
      <Header>
        <button type='button' onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      </Header>
      <Styled.Section>
        {mode === 'unEntered' && <SentenceEditor settingMode={mode} settingInfo={{}} />}
        {mode === 'bookEntered' && (
          <SentenceEditor
            settingMode={mode}
            settingInfo={{
              settingTitle,
              settingAuthors,
              settingThumbnail,
            }}
          />
        )}
        {mode === 'edit' && (
          <SentenceEditor
            settingMode={mode}
            settingInfo={{
              settingTitle,
              settingAuthors,
              settingThumbnail,
              settingSentence,
              settingPage,
              settingDrawer,
            }}
          />
        )}
      </Styled.Section>
    </Note>
  );
};

export default AddContents;
