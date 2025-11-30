import styled from "styled-components";
import { SettingsDrawer } from "../../pages/SettingsDrawer";
import {
  LayoutDashboard,
  MapPin,
  Kanban,
  TrendingUp,
  Brain
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, ${props => props.theme.colors.backgroundLight}, ${props => props.theme.colors.white});
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 256px;
  flex-shrink: 0;
  border-right: 1px solid #E5E7EB;
  background: ${props => props.theme.colors.white};

  @media print {
    display: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LogoSection = styled.div`
  border-bottom: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const LogoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    opacity: 0.8;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.xl};
  background: linear-gradient(to bottom right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  box-shadow: ${props => props.theme.shadows.md};
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoTitle = styled.span`
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.25;
  font-weight: 600;
`;

const LogoSubtitle = styled.span`
  color: ${props => props.theme.colors.textLightest};
  line-height: 1.25;
  font-size: 0.625rem;
`;

const NavSection = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 0.75rem 1rem;
  background: ${props => props.active
    ? `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.primaryLight})`
    : 'transparent'
  };
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.textLight};
  border: none;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  font-family: ${props => props.theme.fontFamily};
  font-size: 1rem;
  box-shadow: ${props => props.active ? props.theme.shadows.md : 'none'};
  
  &:hover {
    background: ${props => props.active
    ? `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.primaryLight})`
    : props.theme.colors.primaryLighter
  };
    color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  }
`;

const SettingsSection = styled.div`
  border-top: 1px solid #E5E7EB;
  padding: 1rem;
`;

const SettingsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 0.75rem 1rem;
`;

const SettingsText = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-family: ${props => props.theme.fontFamily};
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;

  @media print {
    width: 100%;
    margin: 0;
    overflow: visible;
  }
`;

export function DashboardLayout({ children, currentPage }) {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'roadmap', label: 'AI 로드맵', icon: MapPin },
    { id: 'activities', label: '활동 관리 허브', icon: Kanban },
    { id: 'growth', label: '성장 인사이트', icon: TrendingUp },
  ];

  return (
    <LayoutContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarContent>
          {/* Logo */}
          <LogoSection>
            <LogoButton onClick={() => navigate('/')}>
              <LogoIcon>
                <Brain style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
              </LogoIcon>
              <LogoText>
                <LogoTitle>Re:Work</LogoTitle>
                <LogoSubtitle>AI Portfolio Planner</LogoSubtitle>
              </LogoText>
            </LogoButton>
          </LogoSection>

          {/* Navigation Menu */}
          <NavSection>
            <NavList>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <NavItem
                    key={item.id}
                    active={isActive}
                    onClick={() => navigate('/' + item.id)}
                  >
                    <Icon style={{ height: '1.25rem', width: '1.25rem' }} />
                    <span>{item.label}</span>
                  </NavItem>
                );
              })}
            </NavList>
          </NavSection>

          {/* Settings */}
          <SettingsSection>
            <SettingsContainer>
              <SettingsDrawer />
              <SettingsText>Settings</SettingsText>
            </SettingsContainer>
          </SettingsSection>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}
