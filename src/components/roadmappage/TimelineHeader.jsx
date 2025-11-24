import { getMonthLabel } from "./utils";

/**
 * 타임라인 헤더 컴포넌트
 * 타임라인의 상단 헤더로 표시할 월들을 표시하는 컴포넌트
 * @param {Array} visibleMonths - 표시할 월 번호 배열
 */
export function TimelineHeader({ visibleMonths }) {
  return (
    <div
      className="timeline-header"
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      {/* 빈 셀 (활동 유형 레이블 공간) */}
      <div />
      {/* 월 컬럼들 */}
      {visibleMonths.map((monthNumber) => (
        <div key={monthNumber} className="month-column">
          {getMonthLabel(monthNumber)}
        </div>
      ))}
    </div>
  );
}

