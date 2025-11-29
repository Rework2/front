import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fontFamily};
  font-size: 1rem;
  background: ${props => props.theme.colors.white};
  transition: ${props => props.theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLighter};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLighter};
  }
`;
