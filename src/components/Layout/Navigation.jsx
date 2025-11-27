import styled from "styled-components";
import { Button } from "./StyledComponents";
import { SettingsDrawer } from "../../pages/SettingsDrawer";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const NavContent = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  /* 로고는 이제 네비게이션 안 하므로 커서/호버는 선택 사항 */
  cursor: default;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    opacity: 1;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.xl};
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  box-shadow: ${props => props.theme.shadows.md};
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoTitle = styled.span`
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
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

const NavItems = styled.div`
  display: none;
  align-items: center;
  gap: 0.25rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavItem = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 0.5rem 0.75rem;
  background: ${props => (props.active ? props.theme.colors.primaryLighter : 'transparent')};
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textLight)};
  border: none;
  cursor: default;
  transition: ${props => props.theme.transitions.default};
  font-family: ${props => props.theme.fontFamily};
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    color: ${props => props.theme.colors.primary};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export function Navigation({ currentPage }) {
  const navigate = useNavigate();
  const navItems = [
    // 현재는 비워둔 상태 (상단 메뉴 네비게이션 없음)
  ];

  return (
    <Nav>
      <NavContainer>
        <NavContent>
          <LeftSection>
            {/* 로고 클릭해도 이제 다른 페이지로 안 넘어감 */}
            <LogoButton onClick={() => navigate('/')}>
              <LogoIcon>
                <Brain style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
              </LogoIcon>
              <LogoText>
                <LogoTitle>Re:Work</LogoTitle>
                <LogoSubtitle>AI Portfolio Planner</LogoSubtitle>
              </LogoText>
            </LogoButton>

            <NavItems>
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  active={currentPage === item.id}
                // onClick 제거: 상단 메뉴는 라우팅 없음
                >
                  {item.label}
                </NavItem>
              ))}
            </NavItems>
          </LeftSection>

          <RightSection>
            <SettingsDrawer />
            <Button
              variant="ghost"
              textColor="#0F172A99"
              onClick={() => navigate('/login')}
            >
              로그인
            </Button>
            <Button
              gradient
              onClick={() => navigate('/signup')}
            >
              무료 시작하기
            </Button>
          </RightSection>
        </NavContent>
      </NavContainer>
    </Nav>
  );
}
