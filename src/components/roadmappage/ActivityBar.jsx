import { formatPeriod } from "./utils";

/**
 * 활동 바 컴포넌트
 * 타임라인에서 각 활동을 표시하는 바 형태의 컴포넌트
 * @param {Object} activity - 활동 객체
 * @param {Object} activityType - 활동 유형 객체
 * @param {Set} matchingTagSet - 매칭된 태그 Set
 */
export function ActivityBar({ activity, activityType, matchingTagSet }) {
  // 선택된 태그와 일치하는 태그가 있는지 확인
  const hasMatchingTag = activity.tags.some((tag) => matchingTagSet.has(tag));

  return (
    <div
      className={`activity-bar${hasMatchingTag ? " activity-bar--matched" : ""}`}
      style={{ background: activityType.color }}
    >
      {/* 활동 바 내용 */}
      <div className="activity-bar__content">
        {/* 중요 활동인 경우 별 아이콘 표시 */}
        {activity.isImportant && <span className="activity-bar__star">★</span>}
        <span className="activity-bar__title">{activity.title}</span>
      </div>
      {/* 호버 시 표시되는 툴팁 */}
      <div className="tooltip-content">
        <div className="tooltip-title">{activity.title}</div>
        <div className="tooltip-meta">
          {activityType.name} • {formatPeriod(activity.startMonth, activity.endMonth)}
        </div>
        {/* 태그가 있는 경우 태그 목록 표시 */}
        {activity.tags.length > 0 && (
          <div className="tooltip-tags">
            {activity.tags.map((tag) => (
              <span key={tag} className="tooltip-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

