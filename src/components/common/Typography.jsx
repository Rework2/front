import styled from "styled-components";

export const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;
