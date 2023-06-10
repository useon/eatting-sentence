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
`;

export const Input = styled(WiredInput)`
  width: 100%;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const WelcomeText = styled.span`
  padding: 2%;
  font-size: 1.2rem;
  font-weight: bolder;
  letter-spacing: 0.2rem;
`;

export const BtnWrapper = styled(WiredCard)`
  margin-bottom: 1.2rem;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  color: ${(props) => props.color};
`;
