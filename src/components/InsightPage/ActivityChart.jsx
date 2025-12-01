import styled from "styled-components";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

// 활동 유형별 분포 차트 컴포넌트
const ActivityChart = ({ data }) => {

  // 차트 데이터가 없으면 빈 배열로 설정
  const chartData = data || [];


  // 전체 활동 개수 합산
  const totalActivities = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <ChartCard>
      <ChartHeader>
        <h3>활동 유형별 분포</h3>
        <p>총 {totalActivities}개 활동</p>
      </ChartHeader>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E9F1FF",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartCard>
  );
};

export default ActivityChart;

const ChartCard = styled.div`
  background: #ffffff;
  border: 1px solid #e9f1ff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(16, 24, 40, 0.06);
  
`;

const ChartHeader = styled.div`
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

const ChartWrapper = styled.div`
  width: 100%;
  height: 440px;
`;