const SearchResult = ({ id, thumbnail, title, authors, isCheck, checkHandler }) => {

  return (
    <li className={isCheck ? 'itemCheck_true' : 'itemCheck_false'} id={id} onClick={() => checkHandler(id)}>
      <img className='bookItem_img' src={thumbnail} id={id} alt={`책 제목 ${title}의 표지`} />
      <div className='resultBook_info' id={id}>
        <span className='resultBook_title' id={id}>{title}</span>
        <span className='resultBook_author' id={id}>{authors}</span>
      </div>
    </li>
  )
}

export default SearchResult;