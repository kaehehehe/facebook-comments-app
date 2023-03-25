import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }
  
  html {
    font-size: 62.5%;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input {
    outline: none;
    border: none;
  }

  button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;
