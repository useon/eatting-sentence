import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';

export const LogoutIcon = styled.svg`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
  transform-origin: 50% 50%;
`;

export const ModeSelect = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2%;
  width: 100%;
  @media all and (min-width: 1025px) {
    padding: 0.8rem;
    margin-bottom: 1.5rem;
  }
`;

export const ModeButtonWrapper = styled(WiredCard)`
  width: 50%;
  @media all and (min-width: 1025px) {
    padding: 0.8rem;
  }
`;

export const ModeButton = styled.button`
  width: 100%;
  margin: 0 auto;
  color: ${(props) => props.color};
  font-size: 1.2rem;
`;

export const Section = styled.section`
  position: relative;
  width: 100%;
`;

export const BookList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
  row-gap: 1rem;
  padding-left: 3%;
`;

export const Article = styled.article`
  display: flex;
  justify-content: center;
`;

export const Drawers = styled(WiredCard)`
  width: 70%;
`;

export const DrawerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
