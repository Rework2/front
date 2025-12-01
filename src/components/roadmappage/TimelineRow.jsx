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
          // gridColumn은 start는 포함하고 end는 제외
          // 첫 번째 열이 라벨이므로 +2 (라벨 열 다음부터 시작)
          // endIndex를 포함하려면 endIndex + 1이 필요하므로, gridEnd = endIndex + 2 + 1
          const gridStart = activity.startIndex + 2;
          // endIndex를 포함하기 위해 +1 추가 (CSS Grid는 end를 제외하므로)
          const gridEnd = activity.endIndex + 2 + 1;

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

