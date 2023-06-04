import * as Styled from './SearchResult.styles';

const SearchResult = ({ id, thumbnail, title, authors, isCheck, checkHandler }) => (
  <Styled.List
    className={isCheck ? 'itemCheck_true' : 'itemCheck_false'}
    id={id}
    onClick={() => checkHandler({ id, thumbnail, title, authors })}
  >
    <Styled.LeftChild>
      <img className='bookItem_img' src={thumbnail} id={id} alt={`${title}의 표지`} />
    </Styled.LeftChild>
    <Styled.RightChild id={id}>
      <strong className='resultBook_title' id={id}>
        {title}
      </strong>
      <span className='resultBook_author' id={id}>
        {authors}
      </span>
    </Styled.RightChild>
  </Styled.List>
);

export default SearchResult;
