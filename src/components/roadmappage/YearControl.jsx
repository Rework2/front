import styled from "styled-components";

// 연도 컨트롤 컴포넌트
// 연도를 표시하고 이전/다음 연도로 이동할 수 있는 컨트롤
export function YearControl({ year, onIncrement, onDecrement, icons }) {
  const { Calendar, ChevronLeft, ChevronRight } = icons || {};
  
  return (
    <YearControlContainer>
      {Calendar && <Calendar />}
      <YearControlButton type="button" onClick={onDecrement} aria-label="Previous year">
        {ChevronLeft && <ChevronLeft />}
      </YearControlButton>
      <YearControlValue>{year}</YearControlValue>
      <YearControlButton type="button" onClick={onIncrement} aria-label="Next year">
        {ChevronRight && <ChevronRight />}
      </YearControlButton>
    </YearControlContainer>
  );
}

const YearControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const YearControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

const YearControlValue = styled.span`
  font-weight: 600;
  color: #0f172a;
  min-width: 3rem;
  text-align: center;
`;

