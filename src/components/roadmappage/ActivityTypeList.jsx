import { InlineAddForm } from "./InlineAddForm";

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
      <div className="activity-type-list">
        {activityTypes.map((type) => (
          <label key={type.id} className="activity-type-option">
            <input
              type="checkbox"
              value={type.id}
              checked={selectedTypeSet.has(type.id)}
              onChange={() => onToggleType(type.id)}
            />
            <span
              className="activity-type-option__indicator"
              style={{ background: type.color }}
            />
            <span className="activity-type-option__label">{type.label}</span>
          </label>
        ))}
      </div>
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

