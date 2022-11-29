import React from 'react';

const BookCase = ({ title, thumbnail }) => {
  return (
    <div className="compartment bookwrapper">
      <img src={thumbnail} alt="책표지" className="bookwrapper thumbnail" />
      <div className="bookwrapper title">{title}</div>
    </div>
  );
};

export default BookCase;
