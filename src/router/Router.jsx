import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { OnboardingPage } from "../pages/OnboardingPage";
import { DashboardPage } from "../pages/DashboardPage";
import { RoadmapPage } from "../pages/RoadmapPage";
// import { ActivityManagementHub } from "../components/Activity/ActivityManagementHub";
import { GrowthInsightDashboard } from "../components/Layout/GrowthInsightDashboard";
import { DashboardLayout } from "../components/Layout/DashboardLayout";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignUpPage />,
            },
            {
                path: "/onboarding",
                element: <OnboardingPage />,
            },
            {
                path: "/dashboard",
                element: <DashboardLayout currentPage="dashboard"><DashboardPage /></DashboardLayout>,
            },
            {
                path: "/roadmap",
                element: <DashboardLayout currentPage="roadmap"><RoadmapPage /></DashboardLayout>,
            },
            // {
            //     path: "/activities",
            //     element: <DashboardLayout currentPage="activities"><ActivityManagementHub /></DashboardLayout>,
            // },
            {
                path: "/growth",
                element: <DashboardLayout currentPage="growth"><GrowthInsightDashboard /></DashboardLayout>,
            },
        ],
    },
]);
