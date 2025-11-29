import { formatPeriod } from "./utils";

export function ActivityBar({ activity, activityType, matchingTagSet }) {
  const hasMatchingTag = activity.tags.some((tag) => matchingTagSet.has(tag));

  return (
    <div
      className={`activity-bar${hasMatchingTag ? " activity-bar--matched" : ""}`}
      style={{ background: activityType.color }}
    >
      <div className="activity-bar__content">
        {activity.isImportant && <span className="activity-bar__star">★</span>}
        <span className="activity-bar__title">{activity.title}</span>
      </div>
      <div className="tooltip-content">
        <div className="tooltip-title">{activity.title}</div>
        <div className="tooltip-meta">
          {activityType.label} • {formatPeriod(activity.startYear, activity.startMonth, activity.endYear, activity.endMonth)}
        </div>
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

