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

const data = [
  { month: "1월", skills: 3, activities: 5, hours: 40 },
  { month: "2월", skills: 5, activities: 8, hours: 60 },
  { month: "3월", skills: 7, activities: 12, hours: 80 },
  { month: "4월", skills: 10, activities: 15, hours: 95 },
];

const GrowthTrendChart = () => {
  return (
    <ChartCard>
      <ChartHeader>
        <h3>월별 성장 추이</h3>
        <p>스킬, 활동, 학습시간</p>
      </ChartHeader>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9F1FF" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E9F1FF",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="skills"
              stroke="#2A5EE4"
              strokeWidth={2}
              name="스킬 개수"
              dot={{ fill: "#2A5EE4", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="activities"
              stroke="#5F8EF8"
              strokeWidth={2}
              name="활동 개수"
              dot={{ fill: "#5F8EF8", r: 4 }}
            />
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