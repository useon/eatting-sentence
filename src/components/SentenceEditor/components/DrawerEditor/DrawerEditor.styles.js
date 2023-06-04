import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';

export const ModalOutside = styled.div`
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

export const ModalWrapper = styled(WiredCard)`
  width: 10%;
  display: flex;
  position: relative;
  background-color: rgb(252, 252, 252);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 10px;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  font-size: 1rem;
  text-align: center;
  padding: 10%;
`;

export const ButtonWrapper = styled(WiredCard)`
  width: 30%;
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
`;

export const ErrorMessage = styled.span`
  margin-top: 10%;
  font-size: 0.9rem;
  color: red;
`;
