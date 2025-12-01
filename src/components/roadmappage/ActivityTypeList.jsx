import styled from "styled-components";
import { InlineAddForm } from "./InlineAddForm";
import * as S from "../../styles/RoadmapPage.styles";

export function ActivityTypeList({
  activityTypes,
  selectedTypeSet,
  onToggleType,
  isAddingType,
  newTypeName,
  onNewTypeNameChange,
  onAddType,
  onStartAddType,
  onCancelAddType,
  PlusIcon,
}) {
  return (
    <S.FilterSection>
      <S.FilterLabel>Activity Type</S.FilterLabel>
      <ActivityTypeListContainer>
        {activityTypes.map((type) => (
          <ActivityTypeOption key={type.id}>
            <input
              type="checkbox"
              value={type.id}
              checked={selectedTypeSet.has(type.id)}
              onChange={() => onToggleType(type.id)}
            />
            <ActivityTypeIndicator style={{ background: type.color }} />
            <ActivityTypeLabel>{type.label}</ActivityTypeLabel>
          </ActivityTypeOption>
        ))}
      </ActivityTypeListContainer>
      {isAddingType ? (
        <InlineAddForm
          value={newTypeName}
          placeholder="새 활동 유형"
          onChange={(event) => onNewTypeNameChange(event.target.value)}
          onSubmit={onAddType}
          onCancel={() => {
            onCancelAddType();
            onNewTypeNameChange("");
          }}
        />
      ) : (
        <S.AddButton as="button" type="button" onClick={onStartAddType}>
          {PlusIcon && <PlusIcon />}
          유형 추가
        </S.AddButton>
      )}
    </S.FilterSection>
  );
}

const ActivityTypeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ActivityTypeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0;

  input {
    cursor: pointer;
  }
`;

const ActivityTypeIndicator = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.25rem;
`;

const ActivityTypeLabel = styled.span`
  font-size: 0.875rem;
  color: #334155;
`;

