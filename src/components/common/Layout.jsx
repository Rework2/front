import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: ${props => {
        if (props.$maxWidth === 'sm') return '640px';
        if (props.$maxWidth === 'md') return '768px';
        if (props.$maxWidth === 'lg') return '1024px';
        if (props.$maxWidth === 'xl') return '1280px';
        if (props.$maxWidth === '2xl') return '1536px';
        return '1280px'; // default 7xl
    }};
  margin: 0 auto;
  padding: ${props => props.$padding || '0 1.5rem'};
`;

export const Section = styled.section`
  padding: ${props => props.$padding || '5rem 1.5rem'};
  background: ${props => props.$bgColor || 'transparent'};
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap || '0'};
  flex-direction: ${props => props.$direction || 'row'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$cols || '1fr'};
  gap: ${props => props.$gap || '1rem'};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: ${props => props.$mdCols || props.$cols || '1fr'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: ${props => props.$lgCols || props.$mdCols || props.$cols || '1fr'};
  }
`;
