import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';
import { WiredIconButton } from 'wired-elements-react/lib/WiredIconButton';
import { WiredLink } from 'wired-elements-react/lib/WiredLink';

export const Drawer = styled(WiredCard)`
  width: 100%;
  padding: 10%;

  @media all and (min-width: 1025px) {
    width: 42%;
    padding: 4%;
    display: flex;
    flex-direction: column;
  }
`;

export const NameTag = styled(WiredLink)`
  width: 100%;
  cursor: pointer;
  --wired-link-decoration-color: black;
`;

export const Handle = styled(WiredIconButton)`
  display: flex;
  justify-content: center;
  --wired-icon-size: 50px;
`;
