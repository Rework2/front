import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles/CommonStyles";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  PlayCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Target
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  PageContainer,
  Container,
  Header,
  StatsGrid,
  StatCard,
  StatHeader,
  StatInfo,
  StatIcon,
  ProgressBar,
  ProgressFill,
  ContentGrid,
  MainColumn,
  SidebarColumn,
  Card,
  CardHeader,
  AICard
} from "../styles/DashboardPage.styles";

// 온보딩 데이터 저장 키 (둘 다 시도)
const ONBOARDING_KEYS = ["reworkOnboardingData", "reworkOnboarding"];

function loadOnboardingData() {
  if (typeof window === "undefined") return null;

  for (const key of ONBOARDING_KEYS) {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Failed to parse onboarding data:", e);
      }
    }
  }
  return null;
}

function calculateProgress(data) {
  if (!data) return 0;

  let completed = 0;
  const total = 4; // major, targetJob, preparationPeriod, preferredActivities

  if (data.major) completed++;
  if (data.targetJob) completed++;
  if (data.preparationPeriod) completed++;
  if (Array.isArray(data.preferredActivities) && data.preferredActivities.length > 0) {
    completed++;
  }

  return Math.round((completed / total) * 100);
}

export function DashboardPage() {
  const [onboardingData, setOnboardingData] = useState(null);
  const [progress, setProgress] = useState(0);

  // 라우터 네비게이션 훅
  const navigate = useNavigate();

  // 성장 인사이트 페이지로 이동
  const handleGoGrowthInsights = () => {
    navigate("/growth");
  };

  // 활동 관리 허브 페이지로 이동
  const handleGoActivityHub = () => {
    navigate("/activities");
  };

  // Progress chart data (예시 + 마지막 값은 실제 progress 반영)
  const progressData = [
    { month: "7월", progress: 20 },
    { month: "8월", progress: 35 },
    { month: "9월", progress: 50 },
    { month: "10월", progress: 65 },
    { month: "11월", progress: progress || 75 },
  ];

  useEffect(() => {
    const data = loadOnboardingData();
    if (data) {
      setOnboardingData(data);
      setProgress(calculateProgress(data));
    } else {
      setOnboardingData(null);
      setProgress(0);
    }
  }, []);

  const majorLabel = onboardingData?.major || "전공 미설정";
  const jobLabel = onboardingData?.targetJob || "희망 직무 미설정";

  return (
    <PageContainer>
      <Container>
        <Header>
          <h1>대시보드</h1>
          <p>
            포트폴리오 준비 현황을 한눈에 확인하세요
            {onboardingData && (
              <>
                <br />
                현재 설정: {majorLabel} / {jobLabel}
              </>
            )}
          </p>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatHeader>
              <StatInfo>
                <p>전체 진행률</p>
                <h3>{progress}%</h3>
              </StatInfo>
              <StatIcon bgColor={`linear-gradient(to bottom right, #2A5EE4, #5F8EF8)`}>
                <TrendingUp style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
              </StatIcon>
            </StatHeader>
            <ProgressBar>
              <ProgressFill value={progress} />
            </ProgressBar>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatInfo>
                <p>완료 활동</p>
                <h3>4개</h3>
              </StatInfo>
              <StatIcon bgColor="rgb(220 252 231)">
                <CheckCircle style={{ width: "1.5rem", height: "1.5rem", color: "#10B981" }} />
              </StatIcon>
            </StatHeader>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatInfo>
                <p>진행 중</p>
                <h3>2개</h3>
              </StatInfo>
              <StatIcon bgColor="rgb(219 234 254)">
                <PlayCircle style={{ width: "1.5rem", height: "1.5rem", color: "#3B82F6" }} />
              </StatIcon>
            </StatHeader>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatInfo>
                <p>예정</p>
                <h3>3개</h3>
              </StatInfo>
              <StatIcon bgColor="rgb(254 249 195)">
                <Clock style={{ width: "1.5rem", height: "1.5rem", color: "#EAB308" }} />
              </StatIcon>
            </StatHeader>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <MainColumn>
            <Card>
              <CardHeader>
                <h2>진행 추이</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  textColor="#2A5EE4"
                  hoverBg="#E9F1FF"
                  onClick={handleGoGrowthInsights}
                >
                  성장 인사이트 대시보드
                  <ArrowRight
                    style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                  />
                </Button>
              </CardHeader>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#94A3B8"
                    style={{ fontSize: "0.875rem" }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    style={{ fontSize: "0.875rem" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#2A5EE4"
                    strokeWidth={3}
                    dot={{ fill: "#2A5EE4", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <CardHeader>
                <h2>최근 활동</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  textColor="#2A5EE4"
                  hoverBg="#E9F1FF"
                  onClick={handleGoActivityHub}
                >
                  활동 관리 허브
                  <ArrowRight
                    style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                  />
                </Button>
              </CardHeader>
              <p style={{ color: "#64748B" }}>활동 목록이 여기에 표시됩니다</p>
            </Card>
          </MainColumn>

          <SidebarColumn>
            <AICard>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Sparkles style={{ width: "1.25rem", height: "1.25rem" }} />
                <h3>AI 인사이트</h3>
              </div>
              <p style={{ marginBottom: "1rem" }}>
                {onboardingData ? (
                  <>
                    {majorLabel} 전공, {jobLabel} 목표 기준으로 현재 준비 수준은{" "}
                    {progress}% 입니다. 입력 정보를 바탕으로 로드맵과 활동 구성이
                    최적화됩니다.
                  </>
                ) : (
                  <>
                    아직 온보딩 정보가 부족합니다. 전공, 직무, 준비 기간, 관심
                    활동을 입력하면 맞춤형 로드맵과 인사이트를 제공합니다.
                  </>
                )}
              </p>
              <Button
                style={{ width: "100%", background: "white", color: "#2A5EE4" }}
              >
                로드맵 최적화
                <ArrowRight
                  style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                />
              </Button>
            </AICard>

            <Card>
              <h3 style={{ marginBottom: "1rem", color: "#0F172A" }}>
                다가오는 마감일
              </h3>
              <p style={{ color: "#64748B" }}>
                마감일 목록이 여기에 표시됩니다
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "1rem", color: "#0F172A" }}>
                빠른 작업
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Button
                  variant="outline"
                  borderColor="#2A5EE4"
                  textColor="#2A5EE4"
                  hoverBg="#E9F1FF"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  <FileText
                    style={{
                      marginRight: "0.5rem",
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                  활동 관리 & 증빙 추가
                </Button>
                <Button
                  variant="outline"
                  borderColor="#2A5EE4"
                  textColor="#2A5EE4"
                  hoverBg="#E9F1FF"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  <Target
                    style={{
                      marginRight: "0.5rem",
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                  스킬 & 리포트 보기
                </Button>
              </div>
            </Card>
          </SidebarColumn>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
}
