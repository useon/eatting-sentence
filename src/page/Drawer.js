import React from 'react';

const Drawer = ({ title, thumbnail }) => {
  return (
    <div>
      <div>{thumbnail}</div>
      <div>{title}</div>
    </div>
  );
};
export default Drawer;
