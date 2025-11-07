// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after { box-sizing: border-box; }

    html, body, #root { 
        height: 100%;     
        background: linear-gradient(#F8FBFF, #FFFFFF);
        color: #0F172A;
    }
    body {
        margin: 0;         /* 기본 여백 제거 */
        padding: 0;
    }
`;
export default GlobalStyle;