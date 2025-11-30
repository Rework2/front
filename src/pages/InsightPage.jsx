import styled from "styled-components";
import { useState, useEffect } from "react";
import Progress from "../components/InsightPage/Progress";
import SkillMatrix from "../components/InsightPage/SkillMatrix";
import GrowthTrendChart from "../components/InsightPage/GrowthTrendChart";
import MonthlyCompletionChart from "../components/InsightPage/MonthlyCompletionChart";
import AIReportSummary from "../components/InsightPage/AIReportSummary";
import ActivityChart from "../components/InsightPage/ActivityChart";
import ReworkRecommend from "../components/InsightPage/ReworkRecommend";
import { baseCategories } from "../components/Activity/AddActiveBtn";
import ReportModal from "../components/InsightPage/ReportModal";



const InsightPage = () => {
    // 1. 사용자 ID 가져오기 (localStorage에서 'user' 키 확인)
    const [userId, setUserId] = useState(() => {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr).id : null;
        } catch (e) {
            return null;
        }
    });

    // 2. 활동 데이터 및 파일 데이터 상태 관리
    const [activities, setActivities] = useState({ planned: [], inProgress: [], completed: [] });

    // 3. 데이터 로드 및 가공
    useEffect(() => {
        const loadData = () => {
            try {
                // 사용자별 키 생성 (예: activities_user123)
                const activityKey = userId ? `activities_${userId}` : 'activities';

                // localStorage에서 데이터 읽기
                const savedActivities = localStorage.getItem(activityKey);

                if (savedActivities) {
                    setActivities(JSON.parse(savedActivities));
                }
            } catch (e) {
                console.error("데이터 로드 실패:", e);
            }
        };

        loadData();

        // 데이터 변경 감지를 위한 이벤트 리스너 (선택 사항)
        window.addEventListener('storage', loadData);
        return () => window.removeEventListener('storage', loadData);
    }, [userId]);

    // 4. 차트 및 요약용 데이터 계산

    // (1) AI 리포트 요약 데이터
    // 완료된 활동 수
    const completedCount = activities.completed.length;

    // 총 증빙 파일 개수 (모든 상태의 활동에서 files 속성 합산)
    const totalFileCount = [
        ...activities.planned,
        ...activities.inProgress,
        ...activities.completed
    ].reduce((sum, activity) => sum + (activity.files || 0), 0);

    const total =
        activities.planned.length +
        activities.inProgress.length +
        activities.completed.length;

    const completedRate = Math.round(
        (activities.completed.length / (total || 1)) * 100
    );

    const summaryData = {
        completedCount,
        fileCount: totalFileCount,
        completedRate
    };

    const allActivities = [
        ...activities.planned,
        ...activities.inProgress,
        ...activities.completed
    ];

    // (2) 월별 활동 완료 현황 (MonthlyCompletionChart)
    const completionMap = {};

    // 헬퍼 함수: 날짜에서 월 추출 (1~12)
    const getMonthFromActivity = (activity) => {
        if (activity.endMonth) return parseInt(activity.endMonth);
        if (activity.date) {
            const dateObj = new Date(activity.date);
            return dateObj.getMonth() + 1;
        }
        return null;
    };

    // 전체 활동을 순회하며 Total과 Completed 집계
    allActivities.forEach(activity => {
        const month = getMonthFromActivity(activity);

        if (month) {
            const key = `${month}월`;
            if (!completionMap[key]) {
                completionMap[key] = { month: key, completed: 0, total: 0 };
            }

            // 전체 카운트 증가
            completionMap[key].total += 1;

            // 완료된 활동인지 확인하여 완료 카운트 증가
            const isCompleted = activities.completed.some(a => a.id === activity.id);
            if (isCompleted) {
                completionMap[key].completed += 1;
            }
        }
    });

    const monthlyCompletionData = Object.values(completionMap).sort((a, b) => {
        return parseInt(a.month) - parseInt(b.month);
    });

    // (3) 월별 카테고리 성장 추이 (GrowthTrendChart)
    // 월별로 각 카테고리의 활동 개수를 집계
    const categoryGrowthMap = {};

    allActivities.forEach(activity => {
        const month = getMonthFromActivity(activity);
        if (month) {
            const key = `${month}월`;
            if (!categoryGrowthMap[key]) {
                categoryGrowthMap[key] = { month: key };
                // 모든 기본 카테고리 0으로 초기화
                baseCategories.forEach(cat => {
                    categoryGrowthMap[key][cat.label] = 0;
                });
                // 기타 카테고리도 추가 가능
                categoryGrowthMap[key]["기타"] = 0;
            }

            const tag = activity.tag || "기타";
            // baseCategories에 있는 태그인지 확인, 없으면 기타
            const isBaseCategory = baseCategories.some(c => c.label === tag);
            const targetTag = isBaseCategory ? tag : "기타";

            if (categoryGrowthMap[key][targetTag] !== undefined) {
                categoryGrowthMap[key][targetTag] += 1;
            }
        }
    });

    const growthTrendData = Object.values(categoryGrowthMap).sort((a, b) => {
        return parseInt(a.month) - parseInt(b.month);
    });
    // 데이터가 너무 적으면 기본 데이터라도 보여주기 위해 (선택 사항)
    // if (growthTrendData.length === 0) ... 

    // (3) 활동 유형별 분포 (ActivityChart)
    const categoryMap = {};
    allActivities.forEach(activity => {
        const tag = activity.tag || "기타";
        if (!categoryMap[tag]) {
            categoryMap[tag] = 0;
        }
        categoryMap[tag] += 1;
    });

    // 차트 색상 매핑
    const COLORS = ["#2A5EE4", "#5F8EF8", "#E9F1FF", "#94A3B8", "#22C55E", "#F59E0B"];

    const categoryData = Object.keys(categoryMap).map((key, index) => ({
        name: key,
        value: categoryMap[key],
        color: COLORS[index % COLORS.length]
    }));





    // (5) 스킬 매트릭스 데이터 (SkillMatrix)
    // 기본 카테고리로 초기화
    const skillMatrixMap = {};
    baseCategories.forEach(cat => {
        skillMatrixMap[cat.label] = { skill: cat.label, current: 0, target: 0 };
    });

    // 모든 활동을 태그(카테고리)별로 집계
    allActivities.forEach(activity => {
        const tag = activity.tag;

        // 기본 카테고리에 있는 경우에만 집계
        if (skillMatrixMap[tag]) {
            // 목표(target)는 전체 활동 수
            skillMatrixMap[tag].target += 1;

            // 현재(current)는 완료된 활동 수
            const isCompleted = activities.completed.some(a => a.id === activity.id);
            if (isCompleted) {
                skillMatrixMap[tag].current += 1;
            }
        }
    });

    const skillMatrixData = Object.values(skillMatrixMap);

    // (6) 상세 리포트 모달 상태
    const [isReportOpen, setIsReportOpen] = useState(false);

    // (7) 내보내기 기능
    const handleJsonExport = () => {
        const exportData = {
            activities,
            summaryData,
            monthlyCompletionData,
            growthTrendData,
            categoryData,
            skillMatrixData
        };

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(exportData, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `insight_data_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
    };

    const handlePdfExport = () => {
        window.print();
    };

    return (
        <InsightWrap>
            <Container>
                {/* 헤더 영역 */}
                <Header>
                    <HeaderText>
                        <HeaderTitle>나의 성장 인사이트 대시보드</HeaderTitle>
                        <Headersub>AI 분석을 통해 나의 스킬 향상과 포트폴리오 성과를 시각화합니다.</Headersub>
                    </HeaderText>

                    {/* 버튼 영역 */}
                    <ButtonGroup>
                        <Button1 onClick={handleJsonExport}>Json Export</Button1>
                        <Button2 onClick={handlePdfExport}>PDF로 내보내기</Button2>
                    </ButtonGroup>
                </Header>

                <ProgressCard>
                    <ProgressHeader>
                        <ProgressTitle>전체 진행률</ProgressTitle>
                        {/* <Percentage>{completed}%</Percentage> */}
                        {/* 컴포넌트 삽입 */}
                        <Progress completed={completedRate} />
                    </ProgressHeader>


                    <ProgressDesc>
                        목표 대비 우수한 진행 상황입니다. 이대로 진행하면 3개월 내 목표 달성 가능합니다.
                    </ProgressDesc>
                </ProgressCard>

                <ContentLayout>
                    <LeftSection>
                        <SkillMatrix data={skillMatrixData} />
                        {/* 데이터 전달 */}
                        <GrowthTrendChart data={growthTrendData} />
                        <MonthlyCompletionChart
                            data={monthlyCompletionData}
                            onOpenReport={() => setIsReportOpen(true)}
                        />
                    </LeftSection>
                    <RightSection>
                        {/* 데이터 전달 */}
                        <AIReportSummary summaryData={summaryData} />
                        <ActivityChart data={categoryData} />
                        <ReworkRecommend />
                    </RightSection>
                </ContentLayout>

                <ReportModal
                    isOpen={isReportOpen}
                    onClose={() => setIsReportOpen(false)}
                    activities={activities}
                />
            </Container>
        </InsightWrap>
    )
}

export default InsightPage;

const InsightWrap = styled.div`
    min-height: 100vh;
    padding: 2rem;
    background: #F8FBFF;

    @media print {
        padding: 0;
        width: 100%;
        background: white;
        -webkit-print-color-adjust: exact;
        
        /* Remove landscape forcing to allow natural vertical flow */
        @page {
            size: auto; 
            margin: 10mm;
        }
    }
`;

const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;

    @media print {
        max-width: 100%;
        padding: 0;
        display: block; /* Ensure block display for vertical stacking */
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px; /* Add some spacing below header */
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px; /* Increased gap slightly */
`;

const HeaderTitle = styled.div`
    color: #0F172A;
    font-size: 32px; /* Updated to 32px */
    font-weight: 600; /* Updated to 600 */
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

    @media print {
        display: none;
    }
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
    
    @media print {
        break-inside: avoid;
        margin-bottom: 24px;
    }
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

    @media print {
        flex-direction: column;
        display: block;
    }
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;

  @media print {
      width: 100%;
      height: auto;
      display: block;
      
      & > * {
          margin-bottom: 24px;
          break-inside: avoid;
          width: 100%; /* Ensure full width */
      }
  }
`;



const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;

  @media print {
      width: 100%;
      height: auto;
      display: block;

      & > * {
          margin-bottom: 24px;
          break-inside: avoid;
          width: 100%; /* Ensure full width */
      }
  }
`;

