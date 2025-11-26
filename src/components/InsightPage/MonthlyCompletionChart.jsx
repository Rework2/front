import styled from "styled-components";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const data = [
  { month: "11월", completed: 2, total: 5 },
  { month: "12월", completed: 4, total: 7 },
  { month: "1월", completed: 5, total: 8 },
  { month: "2월", completed: 6, total: 9 },
  { month: "3월", completed: 5, total: 9 },
  { month: "4월", completed: 7, total: 11 },
];

const MonthlyCompletionChart = () => {
  return (
    <ChartCard>
      <ChartHeader>
        <div>
          <h3>월별 활동 완료 현황</h3>
          <p>진행 대비 완료율을 분석합니다</p>
        </div>
        <ReportLink>상세 리포트 보기 →</ReportLink>
      </ChartHeader>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E9F1FF",
                borderRadius: "8px",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "8px",
              }}
            />
            <Bar
              dataKey="completed"
              name="완료"
              fill="#2A5EE4"
              radius={[8, 8, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="total"
              name="전체"
              fill="#E9F1FF"
              radius={[8, 8, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartCard>
  );
};

export default MonthlyCompletionChart;

// 🎨 styled-components
const ChartCard = styled.div`
  background: #ffffff;
  border: 1px solid #e9f1ff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: #64748b;
  }
`;

const ReportLink = styled.div`
  color: #2a5ee4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;