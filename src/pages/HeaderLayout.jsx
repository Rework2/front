import styled from "styled-components";
import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";


const HeaderLayout = () => {
  return (
    <>
      <Header />
      <HeaderMain>
        <Outlet /> {/* 여기에 각 페이지가 들어감 */}
      </HeaderMain>
    </>
  );
};

export default HeaderLayout;

const HeaderMain = styled.main`
    flex: 1;                /* 남은 공간 모두 차지 */
    overflow-y: auto;       /* 스크롤 필요 시 */
`;
