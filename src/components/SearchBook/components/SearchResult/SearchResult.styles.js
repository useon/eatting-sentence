import styled from '@emotion/styled';

export const List = styled.li`
  width: 100%;
  height: 20%;
  display: flex;
  padding-top: 4%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const LeftChild = styled.div`
  width: 20%;
  margin: 0 0 0 10%;
  img {
    width: 50%;
  }
`;

export const RightChild = styled.div`
  width: 80%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
`;
