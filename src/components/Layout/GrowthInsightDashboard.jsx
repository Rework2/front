import styled from "styled-components";
import { Button, Card as BaseCard, Badge, Flex, Grid } from "../Layout/StyledComponents";
import { Target, Award, BookOpen, Lightbulb, FileText, Calendar, Download } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Cell } from "recharts";

export function GrowthInsightDashboard() {
  return (
    <PageContainer>
      <Container>
        {/* 페이지 헤더 */}
        <Header>
          <h1>성장 인사이트 대시보드</h1>
          <p>스킬 매트릭스와 성장 리포트를 확인하세요</p>
        </Header>

        {/* 주요 지표 (Metrics) 섹션 */}
        <Grid cols="1fr" mdCols="repeat(2, 1fr)" lgCols="repeat(4, 1fr)" gap="1.5rem" style={{ marginBottom: '48px' }}>
          <MetricCard>
            <MetricHeader>
              <div>
                <MetricValue>12</MetricValue>
                <MetricLabel>완료 활동</MetricLabel>
              </div>
              <IconWrapper>
                <Target size={24} />
              </IconWrapper>
            </MetricHeader>
            <Badge bgColor="#E8F5E9" textColor="#2E7D32">+3 이번 주</Badge>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <div>
                <MetricValue>85%</MetricValue>
                <MetricLabel>목표 달성률</MetricLabel>
              </div>
              <IconWrapper bgColor="#FFF3E0" color="#F57C00">
                <Award size={24} />
              </IconWrapper>
            </MetricHeader>
            <Badge bgColor="#FFF3E0" textColor="#F57C00">+12% 증가</Badge>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <div>
                <MetricValue>42h</MetricValue>
                <MetricLabel>이번 주 학습</MetricLabel>
              </div>
              <IconWrapper bgColor="#F3E5F5" color="#7B1FA2">
                <BookOpen size={24} />
              </IconWrapper>
            </MetricHeader>
            <Badge bgColor="#F3E5F5" textColor="#7B1FA2">목표: 50h</Badge>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <div>
                <MetricValue>8</MetricValue>
                <MetricLabel>신규 스킬</MetricLabel>
              </div>
              <IconWrapper bgColor="#E1F5FE" color="#0277BD">
                <Lightbulb size={24} />
              </IconWrapper>
            </MetricHeader>
            <Badge bgColor="#E1F5FE" textColor="#0277BD">이번 달</Badge>
          </MetricCard>
        </Grid>

        <SectionWrapper>
          <div>
            {/* 스킬 매트릭스 & 성장 리포트 헤더 */}
            <SectionHeader>
              <h2>
                <Target size={24} />
                스킬 매트릭스 & 성장 리포트
              </h2>
              <Button variant="outline" size="sm">
                <Download size={16} style={{ marginRight: '8px' }} />
                리포트 다운로드
              </Button>
            </SectionHeader>

            <TwoColumnLayout>
              <MainChartArea>
                {/* 레이더 차트: 현재 vs 목표 스킬 */}
                <ChartCard>
                  <ChartHeader>
                    <h3>현재 vs 목표 스킬</h3>
                    <p>6개 주요 역량 비교</p>
                  </ChartHeader>
                  <ChartWrapper aspectRatio="16 / 10" minHeight="350px">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={skillMatrixData}>
                        <PolarGrid stroke="#E9F1FF" />
                        <PolarAngleAxis
                          dataKey="skill"
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <Radar
                          name="현재 스킬"
                          dataKey="current"
                          stroke="#5F8EF8"
                          fill="#5F8EF8"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="목표 스킬"
                          dataKey="target"
                          stroke="#2A5EE4"
                          fill="#2A5EE4"
                          fillOpacity={0.1}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#FFFFFF',
                            border: '1px solid #E9F1FF',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </ChartCard>

                {/* 라인 차트: 월별 성장 추이 */}
                <ChartCard>
                  <ChartHeader>
                    <h3>월별 성장 추이</h3>
                    <p>스킬, 활동, 학습시간</p>
                  </ChartHeader>
                  <ChartWrapper aspectRatio="16 / 9" minHeight="320px">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <YAxis
                          tick={{ fill: '#64748B', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#FFFFFF',
                            border: '1px solid #E9F1FF',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="skills"
                          stroke="#2A5EE4"
                          strokeWidth={2}
                          name="스킬 개수"
                          dot={{ fill: '#2A5EE4', r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="activities"
                          stroke="#5F8EF8"
                          strokeWidth={2}
                          name="활동 개수"
                          dot={{ fill: '#5F8EF8', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </ChartCard>
              </MainChartArea>

              <SidebarArea>
                {/* 바 차트: 활동 유형별 분포 */}
                <ChartCard>
                  <ChartHeader>
                    <h3>활동 유형별 분포</h3>
                    <p>총 40개 활동</p>
                  </ChartHeader>
                  <ChartWrapper aspectRatio="4 / 5" minHeight="280px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: '#64748B', fontSize: 11 }}
                        />
                        <YAxis
                          tick={{ fill: '#64748B', fontSize: 11 }}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#FFFFFF',
                            border: '1px solid #E9F1FF',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {activityBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </ChartCard>

                {/* 바 차트: 주간 학습 시간 */}
                <ChartCard>
                  <ChartHeader>
                    <h3>주간 학습 시간</h3>
                    <p>이번 주 총 42시간</p>
                  </ChartHeader>
                  <ChartWrapper aspectRatio="4 / 5" minHeight="280px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: '#64748B', fontSize: 11 }}
                        />
                        <YAxis
                          tick={{ fill: '#64748B', fontSize: 11 }}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#FFFFFF',
                            border: '1px solid #E9F1FF',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar
                          dataKey="hours"
                          fill="#2A5EE4"
                          radius={[8, 8, 0, 0]}
                          name="학습 시간"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </ChartCard>
              </SidebarArea>
            </TwoColumnLayout>
          </div>

          {/* 최근 완료 활동 섹션 */}
          <div>
            <SectionHeader>
              <h2>
                <FileText size={24} />
                최근 완료 활동
              </h2>
              <Button variant="link" size="sm">
                전체 보기 →
              </Button>
            </SectionHeader>

            <Grid cols="1fr" mdCols="repeat(3, 1fr)" gap="1rem">
              {[
                { title: 'React 프로젝트 완성', date: '2024.11.01', category: '프로젝트', color: '#2A5EE4' },
                { title: 'AWS 자격증 취득', date: '2024.10.28', category: '자격증', color: '#5F8EF8' },
                { title: 'UI/UX 스터디 완료', date: '2024.10.25', category: '스터디', color: '#E9F1FF' },
              ].map((activity, index) => (
                <MetricCard key={index} style={{ minHeight: '140px' }}>
                  <Flex direction="column" align="flex-start" gap="0.75rem" style={{ height: '100%' }}>
                    <Badge bgColor={activity.color} textColor="#FFFFFF">
                      {activity.category}
                    </Badge>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: '0.5rem', color: '#0F172A' }}>{activity.title}</h4>
                    </div>
                    <Flex align="center" gap="0.5rem" style={{ color: '#64748B', fontSize: '0.875rem' }}>
                      <Calendar size={14} />
                      {activity.date}
                    </Flex>
                  </Flex>
                </MetricCard>
              ))}
            </Grid>
          </div>
        </SectionWrapper>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundLight};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  
  h1 {
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  h2 {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }
`;

const ChartCard = styled(BaseCard).withConfig({
  shouldForwardProp: (prop) => !['minHeight', 'height'].includes(prop),
})`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

const ChartHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  h3 {
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.875rem;
  }
`;

const ChartWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['aspectRatio', 'minHeight'].includes(prop),
})`
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: ${props => props.aspectRatio || '16 / 9'};
  min-height: ${props => props.minHeight || '300px'};
  flex: 1;
  
  @media (max-width: 1024px) {
    aspect-ratio: 4 / 3;
    min-height: 280px;
  }
`;

const MetricCard = styled(BaseCard)`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 8px 16px rgba(16, 24, 40, 0.06);
  transition: ${props => props.theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primaryLighter};
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(16, 24, 40, 0.1);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
`;

const IconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bgColor', 'color'].includes(prop),
})`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || props.theme.colors.primaryLighter};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.color || props.theme.colors.primary};
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
  width: 100%;
  
  @media (min-width: 1024px) {
    grid-template-columns: calc(66% - 12px) calc(34% - 12px);
    gap: 24px;
  }
  
  @media (min-width: 1440px) {
    grid-template-columns: calc(66% - 16px) calc(34% - 16px);
    gap: 32px;
  }
`;

const MainChartArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  width: 100%;
`;

const SidebarArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  width: 100%;
`;

// 스킬 매트릭스 데이터
const skillMatrixData = [
  { skill: '프론트엔드', current: 65, target: 85 },
  { skill: 'UI/UX', current: 70, target: 90 },
  { skill: '백엔드', current: 45, target: 70 },
  { skill: 'DB설계', current: 50, target: 75 },
  { skill: '협업도구', current: 80, target: 90 },
  { skill: '문서화', current: 60, target: 80 },
];

// 월별 성장 추이 데이터
const growthData = [
  { month: '1월', skills: 3, activities: 5, hours: 40 },
  { month: '2월', skills: 5, activities: 8, hours: 60 },
  { month: '3월', skills: 7, activities: 12, hours: 80 },
  { month: '4월', skills: 10, activities: 15, hours: 95 },
];

// 활동 유형별 분포 데이터
const activityBreakdown = [
  { name: '프로젝트', value: 35, color: '#2A5EE4' },
  { name: '스터디', value: 25, color: '#5F8EF8' },
  { name: '자격증', value: 20, color: '#E9F1FF' },
  { name: '기타', value: 20, color: '#94A3B8' },
];

// 주간 학습 시간 데이터
const weeklyProgress = [
  { day: '월', hours: 6 },
  { day: '화', hours: 8 },
  { day: '수', hours: 5 },
  { day: '목', hours: 9 },
  { day: '금', hours: 7 },
  { day: '토', hours: 4 },
  { day: '일', hours: 3 },
];

