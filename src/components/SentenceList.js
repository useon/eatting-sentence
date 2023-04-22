const SentenceList = ({type, sentence, page, drawer, registeredTime, title, authors}) => {
  if(type === 'book') {
    return (
      <div className='sentenceList'>
        <p>{page}</p>
        <p>{sentence}</p>
        <p>{drawer}</p>
        <p>{registeredTime}</p>
      </div>
    )
  }
  if(type === 'drawer') {
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

export default SentenceList;
