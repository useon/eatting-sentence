const SentenceList = ({sentence, page, drawer, registeredTime}) => {

  return (
    <div className='sentenceList'>
      <p>{page}</p>
      <p>{sentence}</p>
      <p>{drawer}</p>
      <p>{registeredTime}</p>
    </div>
  )
}

export default SentenceList;
