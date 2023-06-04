import styled from '@emotion/styled';

export const BookWrapper = styled.li`
  border-bottom: 0.2rem solid #ebebeb;
  padding: 10%;
`;

export const Thumbnail = styled.img`
  cursor: pointer;
`;

export const ContentInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding-top: 1rem;
`;

export const Title = styled.span`
  height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Authors = styled.span`
  height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9rem;
`;
