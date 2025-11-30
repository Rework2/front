import styled from "styled-components";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const SkillMatrix = ({ data }) => {
  return (
    <RadarWrap>
      <Card>
        <Header>
          <Title>스킬 비교 분석</Title>
          <Sub>현재 수준과 목표를 시각적으로 비교합니다</Sub>
        </Header>

        <ChartArea>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#E9F1FF" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 'auto']}
                tick={{ fill: "#64748B", fontSize: 12 }}
                allowDecimals={false}
              />
              <RadarDesWrap>
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
              </RadarDesWrap>
              <Tooltip
                contentStyle={{
                  background: "#FFFFFF",
                  border: "1px solid #E9F1FF",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartArea>
      </Card>
    </RadarWrap>
  );
};

export default SkillMatrix;

const RadarWrap = styled.div`
  width: 100%;
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #64748b;
`;

const ChartArea = styled.div`
  width: 100%;
  height: 350px;
`;

const RadarDesWrap = styled.div`
  display: flex;
  gap : 8px;
  margin-top: 10px;
`