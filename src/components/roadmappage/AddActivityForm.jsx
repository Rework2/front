import { MONTH_LABELS } from "./constants";

/**
 * 활동 추가 폼 컴포넌트
 * 새로운 활동을 추가하기 위한 폼 컴포넌트
 * @param {Array} activityTypes - 활동 유형 목록
 * @param {Object} newActivity - 새 활동 데이터
 * @param {Function} onNewActivityChange - 새 활동 데이터 변경 핸들러
 * @param {Function} onSubmit - 폼 제출 핸들러
 * @param {Function} onCancel - 취소 핸들러
 * @param {Component} XIcon - 닫기 아이콘 컴포넌트
 */
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
      {/* 헤더 */}
      <div className="add-activity-card__header">
        <h4>새 활동 추가</h4>
        <button className="icon-button" type="button" onClick={onCancel}>
          {XIcon && <XIcon />}
        </button>
      </div>
      {/* 폼 */}
      <form onSubmit={onSubmit} className="add-activity-card__form">
        {/* 활동 유형 선택 */}
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
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* 활동 제목 입력 */}
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

        {/* 태그 입력 */}
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

        {/* 중요도 체크박스 */}
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

        {/* 시작월/종료월 선택 */}
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

        {/* 액션 버튼 */}
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

