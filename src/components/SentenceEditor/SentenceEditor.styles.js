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
`;

export const List = styled.li`
  display: grid;
  padding-bottom: 2rem;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  justify-items: center;

  &.titleLine,
  &.pageLine {
    height: 2rem;
    align-items: center;
  }

  &.sentenceLine {
    height: 6rem;
    align-items: baseline;
    @media all and (min-width: 1025px) {
      height: 8rem;
    }
  }

  &.drawerBtnLine {
    height: 6rem;
    align-items: baseline;
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
  width: 80%;
  height: 6rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 3%;
  overflow: auto;
`;

export const AddDrawerBtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  height: 2rem;
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
