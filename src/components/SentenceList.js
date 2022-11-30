import { dbService } from 'myBase';
import { useEffect, useState } from 'react';

const SentenceList = ({ title }) => {
  const [sentencesData, setSentenceData] = useState({});
  const getSentences = async () => {
    const sentencesObj = (
      await dbService.collection('Books').doc(title).get()
    ).data().sentences;
    setSentenceData(sentencesObj);
  };

  useEffect(() => {
    getSentences();
  }, []);

  const sentencesArr = Object.entries(sentencesData);

  return sentencesArr.map((sentence) => (
    <div className="sentenceList" id={sentence[0]}>
      {sentence[1]}
    </div>
  ));
};

export default SentenceList;
