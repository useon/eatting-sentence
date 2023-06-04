import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';
import { WiredDivider } from 'wired-elements-react/lib/WiredDivider';
import { WiredInput } from 'wired-elements-react/lib/WiredInput';
import { WiredButton } from 'wired-elements-react/lib/WiredButton';

export const Card = styled(WiredCard)`
  width: 40%;
`;

export const ListWrapper = styled.ul``;

export const List = styled.li``;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled(WiredInput)`
  width: 90%;
`;

export const Divider = styled(WiredDivider)`
  padding-top: 5%;
`;

export const TextAreaWrapper = styled(WiredCard)`
  display: flex;
  justify-content: center;
`;

export const TextArea = styled.textarea`
  width: 30vw;
  background-color: transparent;
`;

// export const TextAreaWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `

// export const TextArea = styled(WiredTextarea)`
//   width: 30vw;
// `

export const DrawerBtnWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 3%;
`;

export const SubmitBtnWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  gap: 1%;
  flex-wrap: wrap;
`;

export const SubmitBtn = styled(WiredButton)`
  margin: 0 auto;
`;

export const ErrorArea = styled.div`
  padding: 2% 0 0 10%;
  color: red;
  font-size: 0.9rem;
`;
