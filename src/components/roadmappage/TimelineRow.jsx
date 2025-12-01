import styled from "styled-components";
import { ActivityBar } from "./ActivityBar";
import * as S from "../../styles/RoadmapPage.styles";

export function TimelineRow({ row, visibleMonths, matchingTagSet }) {
  return (
    <S.TimelineRowContainer
      key={row.type.id}
      style={{ gridTemplateColumns: `140px repeat(${visibleMonths.length}, 1fr)` }}
    >
      <S.RowLabel>{row.type.label}</S.RowLabel>
      {row.activities.length === 0 ? (
        <S.TimelineRowPlaceholder>표시할 활동이 없습니다.</S.TimelineRowPlaceholder>
      ) : (
        row.activities.map((activity) => {
          const gridStart = activity.startIndex + 2;
          const gridEnd = activity.endIndex + 2 + 1;

          return (
            <S.ActivityBarContainer
              key={activity.id}
              style={{ gridColumn: `${gridStart} / ${gridEnd}` }}
            >
              <ActivityBar
                activity={activity}
                activityType={row.type}
                matchingTagSet={matchingTagSet}
              />
            </S.ActivityBarContainer>
          );
        })
      )}
    </S.TimelineRowContainer>
  );
}

