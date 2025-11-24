import { ActivityBar } from "./ActivityBar";

/**
 * 타임라인 행 컴포넌트
 * 특정 활동 유형에 대한 타임라인 행을 표시하는 컴포넌트
 * @param {Object} row - 행 데이터 객체 { type, activities }
 * @param {Array} visibleMonths - 표시할 월 번호 배열
 * @param {Set} matchingTagSet - 매칭된 태그 Set
 */
export function TimelineRow({ row, visibleMonths, matchingTagSet }) {
  return (
    <div
      key={row.type.id}
      className="timeline-row"
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      {/* 활동 유형 레이블 */}
      <div className="row-label">{row.type.name}</div>
      {/* 활동이 없는 경우 플레이스홀더 표시 */}
      {row.activities.length === 0 ? (
        <div className="timeline-row__placeholder">표시할 활동이 없습니다.</div>
      ) : (
        // 활동 바들을 그리드에 배치
        row.activities.map((activity) => {
          // 그리드 시작/종료 위치 계산 (첫 번째 컬럼이 레이블이므로 +2, +3)
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

