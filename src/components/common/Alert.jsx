import styled from "styled-components";

export const Alert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => {
        if (props.$variant === 'error') return 'rgb(254 242 242)';
        if (props.$variant === 'success') return 'rgb(240 253 244)';
        if (props.$variant === 'warning') return 'rgb(254 252 232)';
        return props.theme.colors.primaryLighter;
    }};
  border: 1px solid ${props => {
        if (props.$variant === 'error') return 'rgb(254 226 226)';
        if (props.$variant === 'success') return 'rgb(187 247 208)';
        if (props.$variant === 'warning') return 'rgb(253 230 138)';
        return props.theme.colors.borderLight;
    }};
  color: ${props => {
        if (props.$variant === 'error') return 'rgb(127 29 29)';
        if (props.$variant === 'success') return 'rgb(20 83 45)';
        if (props.$variant === 'warning') return 'rgb(120 53 15)';
        return props.theme.colors.primary;
    }};
`;

export const AlertDescription = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
`;
