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
`;

export const ModeButtonWrapper = styled(WiredCard)`
  width: 50%;
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const Article = styled.article`
  display: flex;
  justify-content: center;
`;

export const Drawers = styled(WiredCard)`
  width: 50%;
`;

export const DrawerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
