import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';
import { WiredDivider } from 'wired-elements-react/lib/WiredDivider';

export const SearchOutside = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0px;
  z-index: 100000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SaerchWrapper = styled(WiredCard)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 252, 252);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;
  overflow: hidden;
`;

export const Modal = styled.div`
  width: 70vw;
  height: 70vh;
  overflow: auto;

  @media all and (min-width: 481px) and (max-width: 1024px) {
    width: 60vw;
    height: 60vh;
  }

  @media all and (min-width: 1025px) {
    width: 30vw;
    height: 80vh;
  }
`;

export const SearchClose = styled.div`
  width: 100%;
  height: 5%;
  text-align: end;
`;

export const SearchForm = styled.form`
  width: 80%;
  border-bottom: 1px solid black;
  margin: 0 auto;
`;

export const SearchBar = styled.div`
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  padding: 2%;
  font-size: 1rem;
`;

export const Divider = styled(WiredDivider)``;

export const SearchBox = styled.div`
  width: 100%;
  height: 5%;
  text-align: center;
`;

export const ResultUl = styled.ul`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
