import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';
import { WiredButton } from 'wired-elements-react/lib/WiredButton';

export const RightPage = styled(WiredCard)`
  background: linear-gradient(to bottom, #f6f6f6 95%, #cccccc 5%);
  background-size: 100% 2rem;
  @media all and (min-width: 1025px) {
    width: 50%;
  }
`;

export const ListWrapper = styled.ul`
  margin-top: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow: auto;
  @media all and (min-width: 1025px) {
    margin-top: 5.3rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

export const List = styled.li`
  display: grid;
  padding-bottom: 2rem;
`;

export const Item = styled.div`
  &.titleLine,
  &.pageLine {
    display: grid;
    grid-template-columns: 20% 80%;
    justify-items: center;
    height: 2rem;
    align-items: center;
  }

  &.sentenceLine {
    display: grid;
    grid-template-columns: 20% 80%;
    justify-items: center;
    height: 6rem;
    align-items: baseline;
    @media all and (min-width: 1025px) {
      height: 8rem;
    }
  }

  &.drawerBtnLine {
    display: flex;
    justify-content: center;
    align-items: baseline;
    height: 6rem;
    @media all and (min-width: 1025px) {
      height: 8rem;
    }
  }
`;

export const Input = styled.input`
  width: 80%;
  background-color: transparent;
`;

export const TextArea = styled.textarea`
  width: 80%;
  line-height: 2rem;
  background-color: transparent;
`;

export const DrawerBtnWrapper = styled.div`
  width: 70%;
  display: flex;
  height: 6rem;
  flex-wrap: wrap;
  column-gap: 3%;
  row-gap: 5%;
  overflow: auto;
`;

export const AddDrawerBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  height: 2rem;
  align-items: center;
  span {
    display: flex;
    justify-content: center;
  }
  button {
    display: flex;
    justify-content: end;
  }
`;

export const SubmitBtnWrapper = styled.li`
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
  padding-left: 2%;
  color: red;
  font-size: 0.9rem;
  height: 2rem;
  line-height: 2rem;
`;
