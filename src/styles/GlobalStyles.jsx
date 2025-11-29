import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    background: linear-gradient(#F8FBFF, #FFFFFF);
    color: #0F172A;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  label {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
  }

  button {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
  }

  input, textarea, select {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
