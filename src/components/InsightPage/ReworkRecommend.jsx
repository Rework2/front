import styled from "styled-components";
import { Brain, Server, Database } from "lucide-react";

const ReworkRecommend = () => {
  const recommendations = [
    {
      title: "Cloud Architecture",
      desc: "AWS 자격증 준비를 통해 목표 달성 가능",
      tag: "우선",
      color: "#E9F1FF"
    },
    {
      title: "Backend Framework",
      desc: "진행 중인 프로젝트로 실무 감각 향상",
      tag: "권장",
      color: "#DDE7FF"
    },
    {
      title: "AI/ML Basics",
      desc: "전문 학습과 연계된 트랙 제안",
      tag: "학습",
      color: "#CBD9FF"
    },
  ];

  return (
    <Card>
      <Header>
        <TitleBox>
          <Brain size={20} />
          <span>Re:Work AI 추천</span>
        </TitleBox>
        <SubTitle>다음 성장 방향</SubTitle>
      </Header>

      <List>
        {recommendations.map((item, idx) => (
          <ListItem key={idx}>
            <ItemText>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDesc>{item.desc}</ItemDesc>
            </ItemText>
            <Tag style={{ background: item.color }}>{item.tag}</Tag>
          </ListItem>
        ))}
      </List>

      <Button>AI 리포트 보기</Button>
    </Card>
  );
};

export default ReworkRecommend;

/* ---------------- Styled Components ---------------- */

const Card = styled.div`
  background: linear-gradient(180deg, #2A5EE4 0%, #5F8EF8 100%);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.9;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.div`
  background: rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const ItemDesc = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.85);
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #0F172A;
  border-radius: 8px;
  padding: 4px 8px;
`;

const Button = styled.button`
  background: #FFFFFF;
  color: #2A5EE4;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;
