import { useNavigate } from 'react-router-dom';

const SearchModal = ({title, authors}) => {
  const navigate = useNavigate();
  const goBookPage = () => {
    navigate(`/drawer/${title}`, {
      state: { title: title, authors: authors},
    });  
  }
  
  return (
    <button key={title} className='search_book' onClick={goBookPage}>
      <p className='search_book title'>{title}</p>
      <p className='search_book authors'>{authors}</p>
    </button>
  )
}


export default SearchModal;