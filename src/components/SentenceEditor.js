const SentenceEditor = ({ addSentenceToState,  sentenceContent}) => {
  if(sentenceContent===undefined) {
    return (
      <div>
        <sapn>간직하고 싶은 문장을 입력해주세요.</sapn>
        <textarea onChange={(e) => addSentenceToState(e.target.value)}></textarea>
      </div>
    );
  } else {
    return (
      <div>
        <sapn>수정하고 싶은 문장을 입력해주세요.</sapn>
        <textarea onChange={(e) => addSentenceToState(e.target.value)}>{sentenceContent}</textarea>
      </div>
    );
  }
};

export default SentenceEditor;
