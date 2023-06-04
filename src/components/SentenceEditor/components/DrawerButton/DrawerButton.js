import { useState } from 'react';
import * as Styled from './DrawerButton.styles';

const DrawerButton = ({ index, value, settingSelected }) => {
  const [selected, setSelected] = useState(settingSelected);
  const handlerSelected = () => {
    if (selected) {
      setSelected(!selected);
    } else {
      setSelected(!selected);
    }
  };

  return (
    <Styled.Button
      id={index}
      onClick={handlerSelected}
      type='button'
      data-selected={selected}
      backgroundColor={selected ? 'black' : 'transprarent'}
      color={selected ? 'white' : 'black'}
      value={value}
    >
      {value}
    </Styled.Button>
  );
};

export default DrawerButton;
