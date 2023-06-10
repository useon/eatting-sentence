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
  width: 100%;
  display: grid;
  grid-template-rows: 2rem minmax(2rem, auto) 2rem;
  align-items: end;
  margin-top: 2rem;
  margin-bottom: 2rem;
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

export const Sentence = styled.span`
  font-size: 1.2rem;
`;

export const BoxArticle = styled.article`
  line-height: 2rem;
`;

export const BoxFooter = styled.footer``;
