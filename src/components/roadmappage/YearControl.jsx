/**
 * 연도 컨트롤 컴포넌트
 * 연도를 표시하고 이전/다음 연도로 이동할 수 있는 컨트롤
 * @param {number} year - 현재 연도
 * @param {Function} onIncrement - 연도 증가 핸들러
 * @param {Function} onDecrement - 연도 감소 핸들러
 * @param {Object} icons - 아이콘 컴포넌트 객체 { Calendar, ChevronLeft, ChevronRight }
 */
export function YearControl({ year, onIncrement, onDecrement, icons }) {
  const { Calendar, ChevronLeft, ChevronRight } = icons || {};
  
  return (
    <div className="year-control">
      {/* 캘린더 아이콘 */}
      {Calendar && <Calendar className="year-control__icon" />}
      {/* 이전 연도 버튼 */}
      <button
        type="button"
        className="year-control__button"
        onClick={onDecrement}
        aria-label="Previous year"
      >
        {ChevronLeft && <ChevronLeft />}
      </button>
      {/* 현재 연도 표시 */}
      <span className="year-control__value">{year}</span>
      {/* 다음 연도 버튼 */}
      <button
        type="button"
        className="year-control__button"
        onClick={onIncrement}
        aria-label="Next year"
      >
        {ChevronRight && <ChevronRight />}
      </button>
    </div>
  );
}

