import { useMemo } from "react";
import styled from "styled-components";
import { FileText, Download } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const ActivityStats = ({ filteredActivities, filesCount }) => {
  // CSV 다운로드 함수
  const handleExportCSV = () => {
    const allActivities = [
      ...filteredActivities.planned.map(a => ({ ...a, status: '예정' })),
      ...filteredActivities.inProgress.map(a => ({ ...a, status: '진행 중' })),
      ...filteredActivities.completed.map(a => ({ ...a, status: '완료' }))
    ];

    // CSV 헤더
    const headers = ['제목', '카테고리', '상태', '시작일', '파일 수'];

    // CSV 데이터 생성
    const csvData = allActivities.map(activity => [
      activity.title || '',
      activity.tag || '',
      activity.status || '',
      activity.date || '',
      activity.files || 0
    ]);

    // CSV 문자열 생성
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `활동_데이터_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF 다운로드 함수 (간단한 텍스트 기반)
  const handleExportPDF = () => {
    const allActivities = [
      ...filteredActivities.planned.map(a => ({ ...a, status: '예정' })),
      ...filteredActivities.inProgress.map(a => ({ ...a, status: '진행 중' })),
      ...filteredActivities.completed.map(a => ({ ...a, status: '완료' }))
    ];

    // HTML을 이용한 간단한 PDF 생성 (인쇄 기능 활용)
    const printWindow = window.open('', '', 'width=800,height=600');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>활동 데이터</title>
        <style>
          body { font-family: 'Malgun Gothic', sans-serif; padding: 40px; }
          h1 { color: #1f2937; margin-bottom: 30px; }
          .stats { display: flex; gap: 40px; margin-bottom: 40px; }
          .stat-item { text-align: center; }
          .stat-label { color: #64748b; font-size: 14px; margin-bottom: 8px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          th { background: #f8fafc; font-weight: 600; color: #1f2937; }
          .status-planned { color: #d97706; }
          .status-progress { color: #2563eb; }
          .status-completed { color: #059669; }
        </style>
      </head>
      <body>
        <h1>활동 관리 리포트</h1>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-label">전체 활동</div>
            <div class="stat-value">${filteredActivities.planned.length + filteredActivities.inProgress.length + filteredActivities.completed.length}개</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">완료율</div>
            <div class="stat-value">${Math.round((filteredActivities.completed.length / (filteredActivities.planned.length + filteredActivities.inProgress.length + filteredActivities.completed.length || 1)) * 100)}%</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">증빙 파일</div>
            <div class="stat-value">${filesCount}개</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>카테고리</th>
              <th>상태</th>
              <th>시작일</th>
              <th>파일 수</th>
            </tr>
          </thead>
          <tbody>
            ${allActivities.map(activity => `
              <tr>
                <td>${activity.title || ''}</td>
                <td>${activity.tag || ''}</td>
                <td class="status-${activity.status === '예정' ? 'planned' : activity.status === '진행 중' ? 'progress' : 'completed'}">${activity.status}</td>
                <td>${activity.date || ''}</td>
                <td>${activity.files || 0}개</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 100);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // 차트 데이터 생성
  const chartData = useMemo(() => [
    { name: "완료", value: filteredActivities.completed.length },
    { name: "진행 중", value: filteredActivities.inProgress.length },
    { name: "예정", value: filteredActivities.planned.length },
  ], [filteredActivities]);

  return (
    <StatsSection>
      <StatsHeader>
        <StatsRow>
          <StatItem>
            <StatLabel>전체 활동</StatLabel>
            <StatNumber>
              {filteredActivities.planned.length +
                filteredActivities.inProgress.length +
                filteredActivities.completed.length}개
            </StatNumber>
          </StatItem>
          <StatItem>
            <StatLabel>완료율</StatLabel>
            <StatNumber style={{ color: "#3B82F6" }}>
              {Math.round(
                (filteredActivities.completed.length /
                  (filteredActivities.planned.length +
                    filteredActivities.inProgress.length +
                    filteredActivities.completed.length || 1)) * 100
              )}%
            </StatNumber>
          </StatItem>
          <StatItem>
            <StatLabel>증빙 파일</StatLabel>
            <StatNumber>{filesCount}개</StatNumber>
          </StatItem>
        </StatsRow>

        <ExportButtons>
          <ExportBtn onClick={handleExportCSV}>
            <Download size={16} /> CSV
          </ExportBtn>
          <ExportBtn onClick={handleExportPDF}>
            <FileText size={16} /> PDF
          </ExportBtn>
        </ExportButtons>
      </StatsHeader>

      <ChartSection>
        <ChartTitle>활동 분포</ChartTitle>
        <ChartContainer>
          <div style={{ width: "160px", height: "160px" }}>
            <PieChart width={160} height={160}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-in-out"
              >
                <Cell key="completed" fill="#2563eb" />
                <Cell key="inProgress" fill="#60a5fa" />
                <Cell key="planned" fill="#e2e8f0" />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <LegendContainer>
            <LegendItem>
              <LegendColor color="#2563eb" />
              <LegendLabel>완료</LegendLabel>
              <LegendCount>{filteredActivities.completed.length}개</LegendCount>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#60a5fa" />
              <LegendLabel>진행 중</LegendLabel>
              <LegendCount>{filteredActivities.inProgress.length}개</LegendCount>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#e2e8f0" />
              <LegendLabel>예정</LegendLabel>
              <LegendCount>{filteredActivities.planned.length}개</LegendCount>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>
      </ChartSection>
    </StatsSection>
  );
};

export default ActivityStats;

const StatsSection = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 48px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
`;

const StatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #eff6ff;
  }
`;

const ChartSection = styled.div``;

const ChartTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
  margin-right: 12px;
`;

const LegendLabel = styled.div`
  color: #64748b;
  flex: 1;
`;

const LegendCount = styled.div`
  font-weight: 500;
  color: #0f172a;
`;
