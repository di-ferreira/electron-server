import { createGlobalStyle } from 'styled-components';
import { Dark, Light } from './colors';
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,body{height: 100%;}
  html{font-size: 62.5%;}
  ul,
  ol,
  li {
    list-style: none;
  }

  select,
  select:focus,
  input,
  input:focus,
  button,
  button:focus {
    outline: 0;
  }
  select::-ms-expand {
    display: none;
  }
  select {
    appearance: none;
    background-color: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }

  image {
    max-width: 100%;
  }

  body #root{
    width: 100vw;
    height: 100vh;
  }

  body {
    font-family: "Poppins",Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased !important;
    font-size: 1.6rem;
    overflow: hidden;
    color:${Light.main};
    background-color: ${Dark.main};
  }
`;

export default GlobalStyle;
