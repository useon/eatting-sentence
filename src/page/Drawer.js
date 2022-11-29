import React from 'react';

const Drawer = ({ title, thumbnail }) => {
  return (
    <div>
      <img src={thumbnail} alt="책표지" />
      <div>{title}</div>
    </div>
  );
};
export default Drawer;
