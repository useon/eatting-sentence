const SentenceEditor = ({ addSentenceToState }) => {
  return (
    <div>
      <sapn>간직하고 싶은 문장을 입력해주세요.</sapn>
      <textarea onChange={(e) => addSentenceToState(e.target.value)} />
    </div>
  );
};

export default SentenceEditor;
