import styled from '@emotion/styled';
import { WiredItem } from 'wired-elements-react/lib/WiredItem';
import { WiredCombo } from 'wired-elements-react/lib/WiredCombo';

export const Select = styled(WiredCombo)`
  /* --wired-combo-popup-bg: 
  --wired-item-selected-bg:  */
`;

export const Item = styled(WiredItem)``;

export const NotePad = styled.div``;

export const Section = styled.section`
  width: 100%;
  min-height: 90vh;
  max-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #f6f6f6 95%, #cccccc 5%);
  background-size: 100% 2rem;
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  column-gap: 1%;
  line-height: 2rem;
`;

export const Title = styled.span`
  font-size: 1.4rem;
`;

export const Authors = styled.span`
  font-size: 1.1rem;
`;

export const SentencesWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media all and (min-width: 1025px) {
    width: 60%;
  }
`;
