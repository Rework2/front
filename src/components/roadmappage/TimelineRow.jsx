import { ActivityBar } from "./ActivityBar";

export function TimelineRow({ row, visibleMonths, matchingTagSet }) {
  return (
    <div
      key={row.type.id}
      className="timeline-row"
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      <div className="row-label">{row.type.label}</div>
      {row.activities.length === 0 ? (
        <div className="timeline-row__placeholder">표시할 활동이 없습니다.</div>
      ) : (
        row.activities.map((activity) => {
          const gridStart = activity.startIndex + 2;
          const gridEnd = activity.endIndex + 3;

          return (
            <div
              key={activity.id}
              className="activity-bar-container"
              style={{ gridColumn: `${gridStart} / ${gridEnd}` }}
            >
              <ActivityBar
                activity={activity}
                activityType={row.type}
                matchingTagSet={matchingTagSet}
              />
            </div>
          );
        })
      )}
    </div>
  );
}

