const SentenceList = ({type, sentence, page, drawer, registeredTime}) => {
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
}

export default SentenceList;
