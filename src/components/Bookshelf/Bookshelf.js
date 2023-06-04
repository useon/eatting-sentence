import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './Bookshelf.styles';

const Bookshelf = ({ title, thumbnail, authors, id }) => {
  const navigate = useNavigate();

  const goBookpage = () => {
    navigate(`/book/${title}`, {
      state: { settingTitle: title, settingAuthors: authors, settingThumbnail: thumbnail },
    });
  };

  return (
    <Styled.BookWrapper id={id}>
      <Styled.Thumbnail src={thumbnail} alt='책표지' onClick={goBookpage} />
      <Styled.ContentInfoArea>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Authors>{authors.length > 1 ? authors.join(', ') : authors}</Styled.Authors>
      </Styled.ContentInfoArea>
    </Styled.BookWrapper>
  );
};

export default Bookshelf;
