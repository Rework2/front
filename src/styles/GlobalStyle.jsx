// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import PretendardRegular from "../assets/fonts/Pretendard-Regular.woff";
import PretendardMedium from "../assets/fonts/Pretendard-Medium.woff";
import PretendardBold from "../assets/fonts/Pretendard-Bold.woff";


const GlobalStyle = createGlobalStyle`
    *, *::before, *::after { box-sizing: border-box; }

    @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardRegular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardMedium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardBold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

    html, body, #root { 
        height: 100%;     
        background: #F8FBFF;
        color: #0F172A;
    }
    body {
        margin: 0;         /* 기본 여백 제거 */
        padding: 0;
    }
`;
export default GlobalStyle;