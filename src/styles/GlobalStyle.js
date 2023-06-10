import { Global, css } from '@emotion/react';

const style = css`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  #root {
    width: 90vw;

    @media all and (min-width: 481px) and (max-width: 1024px) {
      width: 70vw;
    }

    @media all and (min-width: 1025px) {
      width: 60vw;
    }
  }
  html {
    font-family: 'NanumSquareNeo-Variable';
    font-weight: normal;
    font-size: 16px;
  }
  html,
  span,
  a {
    font-family: 'NanumSquareNeo-Variable';
  }
  a {
    text-decoration: none;
    color: black;
  }
  input {
    border: none;
    outline: none;
    font-family: 'NanumSquareNeo-Variable';
  }
  textarea {
    border: none;
    resize: none;
    outline: none;
    font-family: 'NanumSquareNeo-Variable';
    line-height: 20px;
  }
  button {
    font-family: 'NanumSquareNeo-Variable';
    border: none;
    cursor: pointer;
    background: none;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  fieldset {
    border: none;
  }
  body {
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    margin: 0px;
  }
`;

const GlobalStyle = () => <Global styles={style} />;

export default GlobalStyle;
