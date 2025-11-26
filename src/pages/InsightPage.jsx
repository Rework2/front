import styled from "styled-components";
import { useState } from "react";
import Progress from "../components/InsightPage/Progress";
import SkillMatrix from "../components/InsightPage/SkillMatrix";
import GrowthTrendChart from "../components/InsightPage/GrowthTrendChart";
import MonthlyCompletionChart from "../components/InsightPage/MonthlyCompletionChart";
import AIReportSummary from "../components/InsightPage/AIReportSummary";
import ActivityChart from "../components/InsightPage/ActivityChart";
import ReworkRecommend from "../components/InsightPage/ReworkRecommend";


const InsightPage = () => {
    return (
        <InsightWrap>
            {/* 헤더 영역 */}
            <Header>
                <HeaderText>
                    <HeaderTitle>나의 성장 인사이트 대시보드</HeaderTitle>
                    <Headersub>AI 분석을 통해 나의 스킬 향상과 포트폴리오 성과를 시각화합니다.</Headersub>
                </HeaderText>

            {/* 버튼 영역 */}
            <ButtonGroup>
                <Button1>Json Export</Button1>
                <Button2>PDF로 내보내기</Button2>
            </ButtonGroup>
            </Header>

            <ProgressCard>
                <ProgressHeader>
                    <ProgressTitle>전체 진행률</ProgressTitle>
                    {/* <Percentage>{completed}%</Percentage> */}
                    {/* 컴포넌트 삽입 */}
                <Progress completed={70} />
                </ProgressHeader>
        

                <ProgressDesc>
                    목표 대비 우수한 진행 상황입니다. 이대로 진행하면 3개월 내 목표 달성 가능합니다.
                </ProgressDesc>
            </ProgressCard>

            <ContentLayout>
                <LeftSection>
                    <SkillMatrix/>
                    <GrowthTrendChart/>
                    <MonthlyCompletionChart/>
                </LeftSection>
                <RightSection>
                    <AIReportSummary/>
                    <ActivityChart/>
                    <ReworkRecommend/>
                </RightSection>
            </ContentLayout>
        </InsightWrap>
    )
}

export default InsightPage;

const InsightWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const HeaderTitle = styled.div`
    color: #0F172A;
    font-size: 16px;
    font-weight: 700;
`;

const Headersub = styled.div`
    color: rgba(15, 23, 42, 0.70);
    font-size: 16px;
    font-weight: 400;
`;


// 여기까지함  H1, p 간격이랑 버튼 위치해야함
const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`
const Button1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    padding: 8px 13px;
    background-color: #FFFFFF;
    border: 1px solid #2A5EE4;
    border-radius: 8px;

    font-size: 14px;
    font-weight: 500;
    color: #2A5EE4;

    cursor: pointer;
`;
const Button2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    padding: 8px 13px;
    background: linear-gradient(90deg, #3a6eff, #588eff);
    border: none;
    border-radius: 8px;

    font-size: 14px;
    font-weight: 500;
    color: #ffffff;

    cursor: pointer;
`;

const ProgressCard = styled.div`
    display: flex;
    padding: 24px;
    flex-direction: column;
    justify-content: center;

    border-radius: 14px;
    background: linear-gradient(180deg, #2A5EE4 0%, #5F8EF8 100%);
    
`;

const ProgressHeader = styled.div`
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    // margin-bottom: 16px;

    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

`;

const ProgressTitle = styled.div`
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    display: flex;
`;

const Percentage = styled.span`
    font-size: 24px;
    font-weight: 400;
    display: flex;
`;

const ProgressDesc = styled.p`  
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: #e0e6fa;
    line-height: 20px;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;
  margin-top: 24px;
  width: 100%;
   & > *:first-child {
        flex: 2;
    }
    & > *:last-child {
        flex: 1;
    }
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;



const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

