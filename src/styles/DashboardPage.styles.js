import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundLight};
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

export const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  h1 {
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const StatInfo = styled.div`
  p {
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.textLight};
    font-size: 0.875rem;
  }
  
  h3 {
    color: ${props => props.theme.colors.text};
  }
`;

export const StatIcon = styled.div.withConfig({
    shouldForwardProp: (prop) => !['bgColor'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.bgColor || props.theme.colors.primaryLighter};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.md};
`;

export const ProgressFill = styled.div.withConfig({
    shouldForwardProp: (prop) => !['value'].includes(prop),
})`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  transition: width 0.3s ease;
`;

export const ContentGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing['2xl']};
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing['2xl']};
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing['2xl']};
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  h2 {
    color: ${props => props.theme.colors.text};
  }
`;

export const AICard = styled(Card)`
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  
  h3, p {
    color: ${props => props.theme.colors.white};
  }
  
  p {
    opacity: 0.9;
  }
`;
