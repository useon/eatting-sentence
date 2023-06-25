import styled from '@emotion/styled';
import { WiredCard } from 'wired-elements-react/lib/WiredCard';
import { WiredInput } from 'wired-elements-react/lib/WiredInput';

export const Logo = styled.img``;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const Input = styled(WiredInput)`
  width: 100%;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media all and (min-width: 1025px) {
    width: 20vw;
  }
`;

export const WelcomeText = styled.span`
  padding: 2%;
  font-size: 1.2rem;
  font-weight: bolder;
  letter-spacing: 0.2rem;
`;

export const BtnWrapper = styled(WiredCard)``;

export const SubmitBtn = styled.button`
  width: 100%;
  color: ${(props) => props.color};
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 0.9rem;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const AnotherPageBtn = styled.button`
  padding-top: 1rem;
`;
