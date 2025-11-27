import styled, { ThemeProvider } from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { theme } from "./styles/theme.js";
import { GlobalStyles } from "./styles/Globalstyles.js";
import { Navigation } from "./components/Layout/Navigation.jsx";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.white};
`;

export default function App() {
  const location = useLocation();
  const isDashboard = ['/dashboard', '/roadmap', '/activities', '/growth'].includes(location.pathname);
  const isPublicPage = ['/', '/login', '/signup', '/onboarding'].includes(location.pathname);

 

  const showNavigation = !isDashboard;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        {showNavigation && <Navigation />}
        <Outlet />
      </AppContainer>
    </ThemeProvider>
  );
}
