import styled from "styled-components";
import { getMonthLabel } from "./utils";

export function MonthRangeSlider({ monthRange, onMonthChange, activeSlider, setActiveSlider }) {
  const startPercent = ((monthRange.start - 1) / 11) * 100;
  const endPercent = ((monthRange.end - 1) / 11) * 100;
  const rangeFillStyle = {
    left: `${Math.min(startPercent, endPercent)}%`,
    right: `${100 - Math.max(startPercent, endPercent)}%`,
  };

  return (
    <MonthRangeContainer>
      <MonthRangeSliders>
        <MonthRangeTrack>
          <MonthRangeTrackFill style={rangeFillStyle} />
        </MonthRangeTrack>
        <MonthSlider
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
        <MonthSlider
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
      </MonthRangeSliders>
      <MonthRangeLabels>
        <span>{getMonthLabel(monthRange.start)}</span>
        <span>{getMonthLabel(monthRange.end)}</span>
      </MonthRangeLabels>
    </MonthRangeContainer>
  );
}

const MonthRangeContainer = styled.div`
  padding: 0 0.5rem;
`;

const MonthRangeSliders = styled.div`
  position: relative;
  height: 1.5rem;
  margin-bottom: 0.5rem;
`;

const MonthRangeTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #e2e8f0;
  transform: translateY(-50%);
  border-radius: 2px;
`;

const MonthRangeTrackFill = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: #3b82f6;
  border-radius: 2px;
`;

const MonthSlider = styled.input`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  -webkit-appearance: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: white;
    border: 2px solid #3b82f6;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const MonthRangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
`;

