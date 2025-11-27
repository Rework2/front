import { getMonthLabel } from "./utils";

export function MonthRangeSlider({ monthRange, onMonthChange, activeSlider, setActiveSlider }) {
  const startPercent = ((monthRange.start - 1) / 11) * 100;
  const endPercent = ((monthRange.end - 1) / 11) * 100;
  const rangeFillStyle = {
    left: `${Math.min(startPercent, endPercent)}%`,
    right: `${100 - Math.max(startPercent, endPercent)}%`,
  };

  return (
    <div className="month-range">
      <div className="month-range__sliders">
        <div className="month-range__track">
          <div className="month-range__track-fill" style={rangeFillStyle} />
        </div>
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
      <div className="month-range__labels">
        <span>{getMonthLabel(monthRange.start)}</span>
        <span>{getMonthLabel(monthRange.end)}</span>
      </div>
    </div>
  );
}

