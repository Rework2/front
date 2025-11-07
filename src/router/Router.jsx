import { BrowserRouter, Routes, Route } from "react-router-dom";

// NavigationLayout
import Layout from "../pages/Layout";
import HeaderLayout from "../pages/HeaderLayout";

// Pages
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";



const Router = () =>{
  return (
    <BrowserRouter>
      <Routes>
        {/*왼쪽 네비게이션 바*/}
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} /> {/*테스트용 삭제예정*/}
          {/*대시보드, 인사이트, 활동관리, 로드맵*/}
        </Route>
      
        {/*상단 네비게이션 바 */}
        <Route element={<HeaderLayout />}>
          {/* <Route path="/" element={<Home />} /> */} {/*원래 자리*/}
          <Route path="/login" element={<LoginPage />} />
          {/*온보딩, 회원가입 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;