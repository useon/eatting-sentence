import styled from '@emotion/styled';

export const ContentsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10%;
`;

export const EditBox = styled.div`
  display: flex;
  column-gap: 10%;
`;

export const SentenceBox = styled.div`
  width: 80%;
  display: grid;
  grid-template-rows: 2rem minmax(2rem, auto) 2rem;
  align-items: end;
  margin-top: 4rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
`;

export const SentenceInfoText = styled.span``;

export const BoxArticle = styled.article`
  width: 90%;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 2rem;
`;

export const BoxFooter = styled.footer`
  display: flex;
  justify-content: end;
`;
