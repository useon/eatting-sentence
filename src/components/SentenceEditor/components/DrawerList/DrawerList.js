import React from 'react';
import DrawerButton from '../DrawerButton/DrawerButton';

const DrawerList = ({ allDrawers, settingMode, selectedDrawers }) => {
  if (settingMode === 'edit' && selectedDrawers.length > 0) {
    const result = [];
    allDrawers.forEach((drawer, index) => {
      if (selectedDrawers.includes(drawer)) {
        result.push(<DrawerButton key={drawer} settingSelected index={index} value={drawer} />);
      } else {
        result.push(
          <DrawerButton key={drawer} settingSelected={false} index={index} value={drawer} />
        );
      }
    });
    return result;
  }
  if (settingMode !== 'edit' || selectedDrawers.length === 0) {
    const result = [];
    allDrawers.forEach((drawer, index) => {
      result.push(
        <DrawerButton key={drawer} settingSelected={false} index={index} value={drawer} />
      );
    });
    return result;
  }
};

export default DrawerList;
