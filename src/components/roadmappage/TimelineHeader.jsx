import styled from "styled-components";
import { getMonthLabel } from "./utils";
import * as S from "../../styles/RoadmapPage.styles";

export function TimelineHeader({ visibleMonths }) {
  return (
    <S.TimelineHeaderContainer
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      <div />
      {visibleMonths.map((monthNumber) => (
        <S.MonthColumn key={monthNumber}>
          {getMonthLabel(monthNumber)}
        </S.MonthColumn>
      ))}
    </S.TimelineHeaderContainer>
  );
}

