// src/components/Insight/AIReportSummary.jsx
import styled from "styled-components";
import { Award, BookOpen, LineChart, Target } from "lucide-react";

const reportData = [
  { icon: <Award color="#22C55E" />, title: "완료 활동 수", value: "32개" },
  { icon: <BookOpen color="#2563EB" />, title: "총 증빙 파일", value: "48개" },
  { icon: <LineChart color="#A855F7" />, title: "최근 성장률", value: "+24%" },
  { icon: <Target color="#F59E0B" />, title: "평균 스킬 레벨", value: "52점" },
];

const AIReportSummary = () => {
  return (
    <ReportCard>
      <Title>AI 리포트 요약</Title>
      <ReportList>
        {reportData.map((item, index) => (
          <ReportItem key={index}>
            <IconBox>{item.icon}</IconBox>
            <TextBox>
              <Label>{item.title}</Label>
              <Value>{item.value}</Value>
            </TextBox>
          </ReportItem>
        ))}
      </ReportList>
    </ReportCard>
  );
};

export default AIReportSummary;

/* ---------------- styled-components ---------------- */

const ReportCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
`;

const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReportItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f9fafb;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%
//   flex-direction: column;
`;

const Label = styled.p`
  font-size: 14px;
  color: #475569;
  margin: 0;
`;

const Value = styled.span`
  font-weight: 600;
  color: #0f172a;
  font-size: 15px;
`;