import { MONTH_LABELS } from "./constants";

export function AddActivityForm({
  activityTypes,
  newActivity,
  onNewActivityChange,
  onSubmit,
  onCancel,
  XIcon,
}) {
  return (
    <div className="add-activity-card">
      <div className="add-activity-card__header">
        <h4>새 활동 추가</h4>
        <button className="icon-button" type="button" onClick={onCancel}>
          {XIcon && <XIcon />}
        </button>
      </div>
      <form onSubmit={onSubmit} className="add-activity-card__form">
        <div className="add-activity-card__field">
          <label className="add-activity-card__label">Activity Type</label>
          <select
            className="add-activity-card__input"
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
          </select>
        </div>

        <div className="add-activity-card__field">
          <label className="add-activity-card__label">Title</label>
          <input
            className="add-activity-card__input"
            placeholder="활동명을 입력하세요"
            value={newActivity.title}
            onChange={(event) =>
              onNewActivityChange({ ...newActivity, title: event.target.value })
            }
          />
        </div>

        <div className="add-activity-card__field">
          <label className="add-activity-card__label">Tags</label>
          <input
            className="add-activity-card__input"
            placeholder="태그를 콤마(,)로 구분하여 입력"
            value={newActivity.tags}
            onChange={(event) =>
              onNewActivityChange({ ...newActivity, tags: event.target.value })
            }
          />
        </div>

        <div className="add-activity-card__field">
          <label className="add-activity-card__label">Important</label>
          <label className="important-checkbox">
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
          </label>
        </div>

        <div className="add-activity-card__field add-activity-card__field--split">
          <div>
            <label className="add-activity-card__label">Start Year</label>
            <input
              type="number"
              className="add-activity-card__input"
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
            <label className="add-activity-card__label">End Year</label>
            <input
              type="number"
              className="add-activity-card__input"
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
        </div>

        <div className="add-activity-card__field add-activity-card__field--split">
          <div>
            <label className="add-activity-card__label">Start Month</label>
            <select
              className="add-activity-card__input"
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
            </select>
          </div>
          <div>
            <label className="add-activity-card__label">End Month</label>
            <select
              className="add-activity-card__input"
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
            </select>
          </div>
        </div>

        <div className="add-activity-card__actions">
          <button className="primary-button" type="submit">
            저장
          </button>
          <button className="secondary-button" type="button" onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

