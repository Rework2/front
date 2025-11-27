import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import HeaderLayout from "../pages/HeaderLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RoadmapPage from "../pages/RoadmapPage";
import OnboardingPage from "../pages/OnboardingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;