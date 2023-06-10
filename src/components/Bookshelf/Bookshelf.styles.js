import styled from '@emotion/styled';

export const BookWrapper = styled.li`
  width: 29%;
  border-bottom: none;
  padding: 0;
  border-bottom: 0.2rem solid #ebebeb;

  img {
    width: 100%;
  }

  @media all and (min-width: 481px) and (max-width: 1024px) {
    width: 16%;
  }

  @media all and (min-width: 1025px) {
    width: 13%;
  }
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
