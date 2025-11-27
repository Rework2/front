import styled from "styled-components";
import { Card, Input, Alert } from "../styles/CommonStyles";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, ${props => props.theme.colors.backgroundLight}, ${props => props.theme.colors.primaryLighter});
  padding: 2rem 1.5rem;
`;

export const SignUpCard = styled(Card)`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows['2xl']};
  border: none;
`;

export const LogoSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const LogoIcon = styled.div`
  margin: 0 auto 1rem;
  display: flex;
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
`;

export const Title = styled.h1`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLightest};
`;

export const StyledInput = styled(Input)`
  padding-left: 2.5rem;
`;

export const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.error};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    height: 1rem;
    width: 1rem;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.colors.borderLight};
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
    }
  }
  
  span {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

export const PasswordStrength = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StrengthItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.met ? props.theme.colors.success : props.theme.colors.textLighter};
`;

export const TextCenter = styled.div`
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.textLight};
  }
`;

export const BackButton = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export const SuccessAlert = styled(Alert)`
  margin-bottom: 1.5rem;
`;
