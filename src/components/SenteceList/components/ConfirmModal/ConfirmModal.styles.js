import styled from '@emotion/styled';
import { WiredButton } from 'wired-elements-react/lib/WiredButton';
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
  width: 55%;
  display: flex;
  position: relative;
  background-color: rgb(252, 252, 252);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  @media all and (min-width: 481px) and (max-width: 1024px) {
    width: 30%;
  }

  @media all and (min-width: 1025px) {
    width: 20%;
  }
`;

export const ButtonArea = styled.div`
  padding-top: 10%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const CancelBtn = styled(WiredButton)``;

export const DeleteBtn = styled(WiredButton)`
  color: red;
`;
