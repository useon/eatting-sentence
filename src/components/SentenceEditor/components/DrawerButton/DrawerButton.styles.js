import styled from '@emotion/styled';

export const Button = styled.button`
  line-height: 2rem;
  border-radius: 1px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;
