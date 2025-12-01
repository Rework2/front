import { Settings } from "lucide-react";
import styled from "styled-components";

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.textLight};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export function SettingsDrawer() {
  return (
    <SettingsButton>
      <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
    </SettingsButton>
  );
}
