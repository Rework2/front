import styled from "styled-components";

export const ProgressContainer = styled.div`
  width: 100%;
  height: ${props => props.$height || '0.5rem'};
  background: ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.$value || 0}%;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight});
  transition: width 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.full};
`;
