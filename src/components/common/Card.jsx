import styled, { css } from "styled-components";

export const Card = styled.div`
  background: ${props => props.$bgColor || props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: ${props => props.$noBorder ? 'none' : `1px solid ${props.theme.colors.border}`};
  padding: ${props => props.$padding || '1.5rem'};
  box-shadow: ${props => props.$shadow || props.theme.shadows.sm};
  transition: ${props => props.theme.transitions.default};
  
  ${props => props.$hover && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.xl};
    }
  `}
`;
