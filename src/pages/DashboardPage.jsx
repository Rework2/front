import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common";
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
import * as S from "../styles/DashboardPage.styles";
import { getDashboardData } from "../utils/dashboardData";

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 로드맵 페이지로 이동
  const handleGoRoadmap = () => {
    navigate("/roadmap");
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        // 비동기 API 호출 흉내 (필요시 제거 가능)
        setTimeout(() => {
          const data = getDashboardData();
          if (data) {
            setDashboardData(data);
          } else {
            setError("데이터를 불러오는데 실패했습니다.");
          }
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();

    // 데이터 변경 감지 (localStorage 변경 시 업데이트)
    const handleStorageChange = () => {
      fetchData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <S.PageContainer>
        <S.Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>데이터를 불러오는 중입니다...</p>
        </S.Container>
      </S.PageContainer>
    );
  }

  if (error) {
    return (
      <S.PageContainer>
        <S.Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>{error}</p>
        </S.Container>
      </S.PageContainer>
    );
  }

  const { progress, stats, chartData, user, aiInsight, recentActivities } = dashboardData;
  const majorLabel = user?.major || "전공 미설정";
  const jobLabel = user?.targetJob || "희망 직무 미설정";

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <h1>대시보드</h1>
          <p>
            포트폴리오 준비 현황을 한눈에 확인하세요
            <br />
            현재 설정: {majorLabel} / {jobLabel}
          </p>
        </S.Header>

        <S.StatsGrid>
          <S.StatCard>
            <S.StatHeader>
              <S.StatInfo>
                <p>전체 진행률</p>
                <h3>{progress}%</h3>
              </S.StatInfo>
              <S.StatIcon $bgColor={`linear-gradient(to bottom right, #2A5EE4, #5F8EF8)`}>
                <TrendingUp style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
              </S.StatIcon>
            </S.StatHeader>
            <S.ProgressBar>
              <S.ProgressFill $value={progress} />
            </S.ProgressBar>
          </S.StatCard>

          <S.StatCard>
            <S.StatHeader>
              <S.StatInfo>
                <p>완료 활동</p>
                <h3>{stats.completed}개</h3>
              </S.StatInfo>
              <S.StatIcon $bgColor="rgb(220 252 231)">
                <CheckCircle style={{ width: "1.5rem", height: "1.5rem", color: "#10B981" }} />
              </S.StatIcon>
            </S.StatHeader>
          </S.StatCard>

          <S.StatCard>
            <S.StatHeader>
              <S.StatInfo>
                <p>진행 중</p>
                <h3>{stats.inProgress}개</h3>
              </S.StatInfo>
              <S.StatIcon $bgColor="rgb(219 234 254)">
                <PlayCircle style={{ width: "1.5rem", height: "1.5rem", color: "#3B82F6" }} />
              </S.StatIcon>
            </S.StatHeader>
          </S.StatCard>

          <S.StatCard>
            <S.StatHeader>
              <S.StatInfo>
                <p>예정</p>
                <h3>{stats.upcoming}개</h3>
              </S.StatInfo>
              <S.StatIcon $bgColor="rgb(254 249 195)">
                <Clock style={{ width: "1.5rem", height: "1.5rem", color: "#EAB308" }} />
              </S.StatIcon>
            </S.StatHeader>
          </S.StatCard>
        </S.StatsGrid>

        <S.ContentGrid>
          <S.MainColumn>
            <S.Card>
              <S.CardHeader>
                <h2>진행 추이</h2>
                <Button
                  $variant="ghost"
                  $size="sm"
                  $textColor="#2A5EE4"
                  $hoverBg="#E9F1FF"
                  onClick={handleGoGrowthInsights}
                >
                  성장 인사이트 대시보드
                  <ArrowRight
                    style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                  />
                </Button>
              </S.CardHeader>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
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
            </S.Card>

            <S.Card>
              <S.CardHeader>
                <h2>최근 활동</h2>
                <Button
                  $variant="ghost"
                  $size="sm"
                  $textColor="#2A5EE4"
                  $hoverBg="#E9F1FF"
                  onClick={handleGoActivityHub}
                >
                  활동 관리 허브
                  <ArrowRight
                    style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                  />
                </Button>
              </S.CardHeader>

              {recentActivities && recentActivities.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id || index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontWeight: 500, color: '#0F172A' }}>{activity.title}</span>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>{activity.date} | {activity.tag}</span>
                      </div>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '999px',
                        backgroundColor: activity.status === 'completed' ? '#DCFCE7' : activity.status === 'inProgress' ? '#DBEAFE' : '#FEF9C3',
                        color: activity.status === 'completed' ? '#166534' : activity.status === 'inProgress' ? '#1E40AF' : '#854D0E'
                      }}>
                        {activity.statusLabel}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#64748B", textAlign: 'center', padding: '20px 0' }}>등록된 활동이 없습니다.</p>
              )}
            </S.Card>
          </S.MainColumn>

          <S.SidebarColumn>
            <S.AICard>
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
                {aiInsight}
              </p>
              <Button
                style={{ width: "100%", background: "white", color: "#2A5EE4" }}
                onClick={handleGoRoadmap}
              >
                로드맵 최적화
                <ArrowRight
                  style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                />
              </Button>
            </S.AICard>

            <S.Card>
              <h3 style={{ marginBottom: "1rem", color: "#0F172A" }}>
                다가오는 마감일
              </h3>
              <p style={{ color: "#64748B" }}>
                마감일 목록이 여기에 표시됩니다
              </p>
            </S.Card>

            <S.Card>
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
                  $variant="outline"
                  $borderColor="#2A5EE4"
                  $textColor="#2A5EE4"
                  $hoverBg="#E9F1FF"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                  onClick={handleGoActivityHub}
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
                  $variant="outline"
                  $borderColor="#2A5EE4"
                  $textColor="#2A5EE4"
                  $hoverBg="#E9F1FF"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                  onClick={handleGoGrowthInsights}
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
            </S.Card>
          </S.SidebarColumn>
        </S.ContentGrid>
      </S.Container>
    </S.PageContainer>
  );
}
