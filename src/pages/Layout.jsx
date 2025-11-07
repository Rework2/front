import styled from "styled-components";
import Navigation from "../components/Layout/Navigation";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <LayoutMain>
        <Navigation />
            <Content>
                <Outlet /> {/* 여기에 각 페이지가 들어감 */}
            </Content>
      </LayoutMain>
    </>
  );
};

export default Layout;

const LayoutMain = styled.main`
  display: flex;          /* 가로 배치 */
  height: 100vh;          /* 전체 높이 */
`;

const Content = styled.section`
  flex: 1;                /* 남은 공간 모두 차지 */
  overflow-y: auto;       /* 스크롤 필요 시 */
`;