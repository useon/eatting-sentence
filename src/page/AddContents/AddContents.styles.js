import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LeftPage = styled(WiredCard)`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 1024px) {
    display: none;
  }
`;
