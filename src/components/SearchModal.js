const SearchModal = ({title, authors}) => {

  return (
    <button key={title} className='search_book'>
      <p className='search_book title'>{title}</p>
      <p className='search_book authors'>{authors}</p>
    </button>
  )
}

export default SearchModal;