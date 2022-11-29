import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCase = ({ title, thumbnail }) => {
  const navigate = useNavigate();
  const goDrawer = () => {
    navigate(`/drawer/${title}`, {
      state: { title: title, thumbnail: thumbnail },
    });
  };
  return (
    <div className="compartment bookwrapper">
      <img
        src={thumbnail}
        alt="책표지"
        className="bookwrapper thumbnail"
        onClick={goDrawer}
      />
      <div className="bookwrapper title">{title}</div>
    </div>
  );
};

export default BookCase;
