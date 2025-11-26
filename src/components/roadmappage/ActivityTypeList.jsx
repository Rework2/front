import { InlineAddForm } from "./InlineAddForm";

/**
 * 활동 유형 리스트 컴포넌트
 * 활동 유형 목록을 체크박스로 표시하고, 새로운 유형을 추가할 수 있는 컴포넌트
 * @param {Array} activityTypes - 활동 유형 목록
 * @param {Set} selectedTypeSet - 선택된 활동 유형 ID Set
 * @param {Function} onToggleType - 활동 유형 선택 토글 핸들러
 * @param {boolean} isAddingType - 유형 추가 중인지 여부
 * @param {string} newTypeName - 새 유형 이름
 * @param {Function} onNewTypeNameChange - 새 유형 이름 변경 핸들러
 * @param {Function} onAddType - 유형 추가 핸들러
 * @param {Function} onStartAddType - 유형 추가 시작 핸들러
 * @param {Function} onCancelAddType - 유형 추가 취소 핸들러
 * @param {Component} PlusIcon - 플러스 아이콘 컴포넌트
 */
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
    <div className="filter-section">
      <label className="filter-label">Activity Type</label>
      {/* 활동 유형 목록 */}
      <div className="activity-type-list">
        {activityTypes.map((type) => (
          <label key={type.id} className="activity-type-option">
            <input
              type="checkbox"
              value={type.id}
              checked={selectedTypeSet.has(type.id)}
              onChange={() => onToggleType(type.id)}
            />
            {/* 색상 인디케이터 */}
            <span
              className="activity-type-option__indicator"
              style={{ background: type.color }}
            />
            <span className="activity-type-option__label">{type.label}</span>
          </label>
        ))}
      </div>
      {/* 유형 추가 폼 또는 추가 버튼 */}
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
        <button
          className="add-button add-button--inline"
          type="button"
          onClick={onStartAddType}
        >
          {PlusIcon && <PlusIcon />}
          유형 추가
        </button>
      )}
    </div>
  );
}

