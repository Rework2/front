import styled from "styled-components";

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => props.$bgColor || props.theme.colors.primaryLighter};
  color: ${props => props.$textColor || props.theme.colors.primary};
  border: ${props => props.$variant === 'outline' ? `1px solid ${props.$borderColor || props.theme.colors.primary}` : 'none'};
`;
