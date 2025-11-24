import { getMonthLabel } from "./utils";

/**
 * 월 범위 슬라이더 컴포넌트
 * 시작월과 종료월을 선택할 수 있는 범위 슬라이더
 * @param {Object} monthRange - 월 범위 객체 { start, end }
 * @param {Function} onMonthChange - 월 변경 핸들러
 * @param {string|null} activeSlider - 현재 활성화된 슬라이더 ('start' 또는 'end')
 * @param {Function} setActiveSlider - 활성 슬라이더 설정 핸들러
 */
export function MonthRangeSlider({ monthRange, onMonthChange, activeSlider, setActiveSlider }) {
  // 시작월과 종료월의 퍼센트 위치 계산 (1월=0%, 12월=100%)
  const startPercent = ((monthRange.start - 1) / 11) * 100;
  const endPercent = ((monthRange.end - 1) / 11) * 100;
  // 범위 채우기 스타일 계산
  const rangeFillStyle = {
    left: `${Math.min(startPercent, endPercent)}%`,
    right: `${100 - Math.max(startPercent, endPercent)}%`,
  };

  return (
    <div className="month-range">
      {/* 슬라이더 컨테이너 */}
      <div className="month-range__sliders">
        {/* 트랙 배경 */}
        <div className="month-range__track">
          {/* 선택된 범위를 표시하는 채우기 */}
          <div className="month-range__track-fill" style={rangeFillStyle} />
        </div>
        {/* 시작월 슬라이더 */}
        <input
          className="month-slider"
          type="range"
          min="1"
          max="12"
          value={monthRange.start}
          onChange={(event) => onMonthChange("start", event.target.value)}
          onMouseDown={() => setActiveSlider("start")}
          onTouchStart={() => setActiveSlider("start")}
          onMouseUp={() => setActiveSlider(null)}
          onTouchEnd={() => setActiveSlider(null)}
          style={{ zIndex: activeSlider === "start" ? 4 : 3 }}
        />
        {/* 종료월 슬라이더 */}
        <input
          className="month-slider"
          type="range"
          min="1"
          max="12"
          value={monthRange.end}
          onChange={(event) => onMonthChange("end", event.target.value)}
          onMouseDown={() => setActiveSlider("end")}
          onTouchStart={() => setActiveSlider("end")}
          onMouseUp={() => setActiveSlider(null)}
          onTouchEnd={() => setActiveSlider(null)}
          style={{ zIndex: activeSlider === "end" ? 4 : 3 }}
        />
      </div>
      {/* 월 레이블 표시 */}
      <div className="month-range__labels">
        <span>{getMonthLabel(monthRange.start)}</span>
        <span>{getMonthLabel(monthRange.end)}</span>
      </div>
    </div>
  );
}

