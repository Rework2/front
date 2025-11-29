import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => {
        if (props.$size === 'lg') return '1rem 1.5rem';
        if (props.$size === 'sm') return '0.5rem 0.75rem';
        return '0.625rem 1.25rem';
    }};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fontFamily};
  font-weight: 500;
  transition: ${props => props.theme.transitions.default};
  cursor: pointer;
  border: none;
  
  ${props => {
        if (props.$variant === 'outline') {
            return css`
        background: transparent;
        border: 1px solid ${props.$borderColor || props.theme.colors.primary};
        color: ${props.$textColor || props.theme.colors.primary};
        &:hover {
          background: ${props.$hoverBg || props.theme.colors.primaryLighter};
        }
      `;
        } else if (props.$variant === 'ghost') {
            return css`
        background: transparent;
        color: ${props.$textColor || props.theme.colors.textLight};
        &:hover {
          background: ${props.$hoverBg || props.theme.colors.backgroundLight};
        }
      `;
        } else if (props.$variant === 'link') {
            return css`
        background: transparent;
        color: ${props.theme.colors.primary};
        padding: 0;
        &:hover {
          text-decoration: underline;
        }
      `;
        } else {
            return css`
        background: ${props.$gradient ? `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.primaryLight})` : props.theme.colors.primary};
        color: ${props.theme.colors.white};
        &:hover {
          opacity: 0.9;
        }
      `;
        }
    }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
