import styled from "styled-components";
import { formatPeriod } from "./utils";
import * as S from "../../styles/RoadmapPage.styles";

// 타임라인에 표시되는 활동 바 컴포넌트
export function ActivityBar({ activity, activityType, matchingTagSet }) {
  console.log("📊 ActivityBar received:", activity);
  const hasMatchingTag = activity.tags.some((tag) => matchingTagSet.has(tag));

  return (
    <ActivityBarStyled
      $matched={hasMatchingTag}
      style={{ background: activityType.color }}
    >
      <S.ActivityBarContent>
        {activity.isImportant && <S.ActivityBarStar>★</S.ActivityBarStar>}
        <S.ActivityBarTitle>{activity.title}</S.ActivityBarTitle>
      </S.ActivityBarContent>
      <TooltipContentStyled>
        <S.TooltipTitle>{activity.title}</S.TooltipTitle>
        <S.TooltipMeta>
          {activityType.label} • {formatPeriod(activity.startYear, activity.startMonth, activity.endYear, activity.endMonth)}
        </S.TooltipMeta>
        {activity.tags.length > 0 && (
          <S.TooltipTags>
            {activity.tags.map((tag) => (
              <S.TooltipTag key={tag}>
                #{tag}
              </S.TooltipTag>
            ))}
          </S.TooltipTags>
        )}
      </TooltipContentStyled>
    </ActivityBarStyled>
  );
}

const TooltipContentStyled = styled(S.TooltipContent)`
  /* 스타일은 부모에서 상속 */
`;

const ActivityBarStyled = styled(S.ActivityBar)`
  ${props => props.$matched && `
    border: 2px solid #3b82f6;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  `}

  &:hover ${TooltipContentStyled} {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }
`;

