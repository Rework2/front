import { getMonthLabel } from "./utils";

export function TimelineHeader({ visibleMonths }) {
  return (
    <div
      className="timeline-header"
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      <div />
      {visibleMonths.map((monthNumber) => (
        <div key={monthNumber} className="month-column">
          {getMonthLabel(monthNumber)}
        </div>
      ))}
    </div>
  );
}

