import styled from "styled-components";
import { MONTH_LABELS } from "./constants";
import * as S from "../../styles/RoadmapPage.styles";

// AddActivityCardSelect를 S에서 가져오기 위해 별도로 정의
const AddActivityCardSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

export function AddActivityForm({
  activityTypes,
  newActivity,
  onNewActivityChange,
  onSubmit,
  onCancel,
  XIcon,
}) {
  return (
    <S.AddActivityCard>
      <S.AddActivityCardHeader>
        <h4>새 활동 추가</h4>
        <S.IconButton type="button" onClick={onCancel}>
          {XIcon && <XIcon />}
        </S.IconButton>
      </S.AddActivityCardHeader>
      <S.AddActivityCardForm onSubmit={onSubmit}>
        <S.AddActivityCardField>
          <S.AddActivityCardLabel>Activity Type</S.AddActivityCardLabel>
          <AddActivityCardSelect
            value={newActivity.typeId}
            onChange={(event) =>
              onNewActivityChange({ ...newActivity, typeId: event.target.value })
            }
          >
            {activityTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </AddActivityCardSelect>
        </S.AddActivityCardField>

        <S.AddActivityCardField>
          <S.AddActivityCardLabel>Title</S.AddActivityCardLabel>
          <S.AddActivityCardInput
            placeholder="활동명을 입력하세요"
            value={newActivity.title}
            onChange={(event) =>
              onNewActivityChange({ ...newActivity, title: event.target.value })
            }
          />
        </S.AddActivityCardField>

        <S.AddActivityCardField>
          <S.AddActivityCardLabel>Tags</S.AddActivityCardLabel>
          <S.AddActivityCardInput
            placeholder="태그를 콤마(,)로 구분하여 입력"
            value={newActivity.tags}
            onChange={(event) =>
              onNewActivityChange({ ...newActivity, tags: event.target.value })
            }
          />
        </S.AddActivityCardField>

        <S.AddActivityCardField>
          <S.AddActivityCardLabel>Important</S.AddActivityCardLabel>
          <S.ImportantCheckbox>
            <input
              type="checkbox"
              checked={newActivity.isImportant}
              onChange={(event) =>
                onNewActivityChange({
                  ...newActivity,
                  isImportant: event.target.checked,
                })
              }
            />
            <span>중요도가 높은 활동</span>
          </S.ImportantCheckbox>
        </S.AddActivityCardField>

        <AddActivityCardFieldSplit>
          <div>
            <S.AddActivityCardLabel>Start Year</S.AddActivityCardLabel>
            <S.AddActivityCardInput
              type="number"
              value={newActivity.startYear}
              onChange={(event) =>
                onNewActivityChange({
                  ...newActivity,
                  startYear: Number(event.target.value),
                })
              }
              min="2000"
              max="2100"
            />
          </div>
          <div>
            <S.AddActivityCardLabel>End Year</S.AddActivityCardLabel>
            <S.AddActivityCardInput
              type="number"
              value={newActivity.endYear}
              onChange={(event) =>
                onNewActivityChange({
                  ...newActivity,
                  endYear: Number(event.target.value),
                })
              }
              min="2000"
              max="2100"
            />
          </div>
        </AddActivityCardFieldSplit>

        <AddActivityCardFieldSplit>
          <div>
            <S.AddActivityCardLabel>Start Month</S.AddActivityCardLabel>
            <AddActivityCardSelect
              value={newActivity.startMonth}
              onChange={(event) =>
                onNewActivityChange({
                  ...newActivity,
                  startMonth: Number(event.target.value),
                })
              }
            >
              {MONTH_LABELS.map((label, index) => (
                <option key={label} value={index + 1}>
                  {label}
                </option>
              ))}
            </AddActivityCardSelect>
          </div>
          <div>
            <S.AddActivityCardLabel>End Month</S.AddActivityCardLabel>
            <AddActivityCardSelect
              value={newActivity.endMonth}
              onChange={(event) =>
                onNewActivityChange({
                  ...newActivity,
                  endMonth: Number(event.target.value),
                })
              }
            >
              {MONTH_LABELS.map((label, index) => (
                <option key={label} value={index + 1}>
                  {label}
                </option>
              ))}
            </AddActivityCardSelect>
          </div>
        </AddActivityCardFieldSplit>

        <S.AddActivityCardActions>
          <S.PrimaryButton type="submit">저장</S.PrimaryButton>
          <S.SecondaryButton type="button" onClick={onCancel}>
            취소
          </S.SecondaryButton>
        </S.AddActivityCardActions>
      </S.AddActivityCardForm>
    </S.AddActivityCard>
  );
}

const AddActivityCardFieldSplit = styled(S.AddActivityCardField)`
  flex-direction: row;
  gap: 0.5rem;

  > div {
    flex: 1;
  }
`;

