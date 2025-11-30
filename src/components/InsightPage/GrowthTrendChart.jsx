import styled from "styled-components";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

// 색상 팔레트 (InsightPage와 동일하게 맞춤)
const COLORS = ["#2A5EE4", "#5F8EF8", "#E9F1FF", "#94A3B8", "#22C55E", "#F59E0B", "#8884d8"];

const GrowthTrendChart = ({ data }) => {
  // 데이터가 없을 경우 빈 배열 처리
  const chartData = data || [];

  // 데이터에서 키(카테고리) 추출 (month 제외)
  const dataKeys = chartData.length > 0
    ? Object.keys(chartData[0]).filter(key => key !== 'month')
    : [];

  return (
    <ChartCard>
      <ChartHeader>
        <h3>월별 스킬 성장 추이</h3>
        <p>월별 활동 카테고리 분포</p>
      </ChartHeader>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 12 }}
              label={{ value: '개수', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: 12 } }}
              allowDecimals={false}
              domain={[0, dataMax => dataMax + 1]}
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E9F1FF",
                borderRadius: "8px",
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ fill: COLORS[index % COLORS.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartCard>
  );
};

export default GrowthTrendChart;

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
  height: 300px;
`;