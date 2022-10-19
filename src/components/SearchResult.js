const SearchResult = ({ key, thumbnail, title, authors }) => {

  return (
    <li className='bookItem' id={key}>
      <img className='bookItem_img' src={thumbnail} id={key} />
      <div className='resultBook_info' id={key}>
        <span className='resultBook_title' id={key}>{title}</span>
        <span className='resultBook_author' id={key}>{authors}</span>
      </div>
    </li>
  )
}

export default SearchResult;