import styled from "styled-components";
import { Card, Input } from "../styles/CommonStyles";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, ${props => props.theme.colors.backgroundLight}, ${props => props.theme.colors.white});
  padding: 3rem 1.5rem;
`;

export const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primaryLighter};
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

export const Description = styled.p`
  color: ${props => props.theme.colors.textLight};
`;

export const ProgressSection = styled.div`
  margin-bottom: 2rem;
`;

export const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  span {
    color: ${props => props.theme.colors.textLight};
  }
  
  .percentage {
    color: ${props => props.theme.colors.primary};
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.value}%;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  transition: width 0.3s ease;
`;

export const StepIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const StepCircle = styled.div.withConfig({
    shouldForwardProp: (prop) => !['active', 'completed'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.active
        ? `linear-gradient(to bottom right, ${props.theme.colors.primary}, ${props.theme.colors.primaryLight})`
        : props.completed
            ? props.theme.colors.primaryLighter
            : '#E5E7EB'
    };
  color: ${props => props.active || props.completed ? props.theme.colors.primary : props.theme.colors.textLighter};
  transition: ${props => props.theme.transitions.default};
`;

export const StepLabel = styled.span.withConfig({
    shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  font-size: 0.75rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLighter};
`;

export const FormCard = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
  border: none;
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fontFamily};
  font-size: 1rem;
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLighter};
  }
`;

export const CheckboxGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.checked ? props.theme.colors.primaryLighter : props.theme.colors.white};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  input {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }
  
  span {
    color: ${props => props.checked ? props.theme.colors.primary : props.theme.colors.text};
    font-weight: ${props => props.checked ? '500' : '400'};
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const NavigationRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
