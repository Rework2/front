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
          // gridColumn은 start는 포함하고 end는 제외
          // 첫 번째 열이 라벨이므로 +2 (라벨 열 다음부터 시작)
          // endIndex를 포함하려면 endIndex + 1이 필요하므로, gridEnd = endIndex + 2 + 1
          const gridStart = activity.startIndex + 2;
          // endIndex를 포함하기 위해 +1 추가 (CSS Grid는 end를 제외하므로)
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

