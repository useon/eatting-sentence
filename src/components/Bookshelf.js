import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bookshelf = ({ title, thumbnail, authors, sentence }) => {
  const navigate = useNavigate();

  const goBookpage = () => {
    navigate(`/book/${title}`, {
      state: { title: title, authors: authors },
    });
  };

  return (
    <div className="compartment bookwrapper">
      <img
        src={thumbnail}
        alt="책표지"
        className="bookwrapper thumbnail"
        onClick={goBookpage}
      />
      <div className="bookwrapper title">{title}</div>
      <div className="bookwrapper authors">{authors}</div>
    </div>                      
  );
};

export default Bookshelf;
