import * as Styled from './Pagenate.styles';

const Pagenate = ({ number, setPage, fontWeight }) => (
  <Styled.Button onClick={() => setPage(number)} fontWeight={fontWeight}>
    {number}
  </Styled.Button>
);
export default Pagenate;
