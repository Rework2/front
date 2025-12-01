import styled from "styled-components";

// Common 버튼
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', 'variant', 'gradient', 'borderColor', 'textColor', 'hoverBg'].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => {
    if (props.size === 'lg') return '1rem 1.5rem';
    if (props.size === 'sm') return '0.5rem 0.75rem';
    return '0.625rem 1.25rem';
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fontFamily};
  font-weight: 500;
  transition: ${props => props.theme.transitions.default};
  cursor: pointer;
  border: none;
  
  ${props => {
    if (props.variant === 'outline') {
      return `
        background: transparent;
        border: 1px solid ${props.borderColor || props.theme.colors.primary};
        color: ${props.textColor || props.theme.colors.primary};
        &:hover {
          background: ${props.hoverBg || props.theme.colors.primaryLighter};
        }
      `;
    } else if (props.variant === 'ghost') {
      return `
        background: transparent;
        color: ${props.textColor || props.theme.colors.textLight};
        &:hover {
          background: ${props.hoverBg || props.theme.colors.backgroundLight};
        }
      `;
    } else if (props.variant === 'link') {
      return `
        background: transparent;
        color: ${props.theme.colors.primary};
        padding: 0;
        &:hover {
          text-decoration: underline;
        }
      `;
    } else {
      return `
        background: ${props.gradient ? `linear-gradient(to right, ${props.theme.colors.primary}, ${props.theme.colors.primaryLight})` : props.theme.colors.primary};
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


export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'noBorder', 'padding', 'shadow', 'hover'].includes(prop),
})`
  background: ${props => props.bgColor || props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: ${props => props.noBorder ? 'none' : `1px solid ${props.theme.colors.border}`};
  padding: ${props => props.padding || '1.5rem'};
  box-shadow: ${props => props.shadow || props.theme.shadows.sm};
  transition: ${props => props.theme.transitions.default};
  
  ${props => props.hover && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows.xl};
    }
  `}
`;

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.border};
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

export const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const Badge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'textColor', 'variant', 'borderColor'].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => props.bgColor || props.theme.colors.primaryLighter};
  color: ${props => props.textColor || props.theme.colors.primary};
  border: ${props => props.variant === 'outline' ? `1px solid ${props.borderColor || props.theme.colors.primary}` : 'none'};
`;

// Progress Component
export const ProgressContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['height'].includes(prop),
})`
  width: 100%;
  height: ${props => props.height || '0.5rem'};
  background: ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['value'].includes(prop),
})`
  height: 100%;
  width: ${props => props.value || 0}%;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  transition: width 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.full};
`;

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['maxWidth', 'padding'].includes(prop),
})`
  width: 100%;
  max-width: ${props => {
    if (props.maxWidth === 'sm') return '640px';
    if (props.maxWidth === 'md') return '768px';
    if (props.maxWidth === 'lg') return '1024px';
    if (props.maxWidth === 'xl') return '1280px';
    if (props.maxWidth === '2xl') return '1536px';
    return '1280px'; // default 7xl
  }};
  margin: 0 auto;
  padding: ${props => props.padding || '0 1.5rem'};
`;

export const Section = styled.section.withConfig({
  shouldForwardProp: (prop) => !['padding', 'bgColor'].includes(prop),
})`
  padding: ${props => props.padding || '5rem 1.5rem'};
  background: ${props => props.bgColor || 'transparent'};
`;

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => !['align', 'justify', 'gap', 'direction', 'wrap'].includes(prop),
})`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['cols', 'mdCols', 'lgCols', 'gap'].includes(prop),
})`
  display: grid;
  grid-template-columns: ${props => props.cols || '1fr'};
  gap: ${props => props.gap || '1rem'};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: ${props => props.mdCols || props.cols || '1fr'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: ${props => props.lgCols || props.mdCols || props.cols || '1fr'};
  }
`;

export const Alert = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => {
    if (props.variant === 'error') return 'rgb(254 242 242)';
    if (props.variant === 'success') return 'rgb(240 253 244)';
    if (props.variant === 'warning') return 'rgb(254 252 232)';
    return props.theme.colors.primaryLighter;
  }};
  border: 1px solid ${props => {
    if (props.variant === 'error') return 'rgb(254 226 226)';
    if (props.variant === 'success') return 'rgb(187 247 208)';
    if (props.variant === 'warning') return 'rgb(253 230 138)';
    return props.theme.colors.borderLight;
  }};
  color: ${props => {
    if (props.variant === 'error') return 'rgb(127 29 29)';
    if (props.variant === 'success') return 'rgb(20 83 45)';
    if (props.variant === 'warning') return 'rgb(120 53 15)';
    return props.theme.colors.primary;
  }};
`;

export const AlertDescription = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
`;
