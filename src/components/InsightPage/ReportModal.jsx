import styled from "styled-components";
import { X } from "lucide-react";

const ReportModal = ({ isOpen, onClose, activities }) => {
    if (!isOpen) return null;

    // 모든 활동을 합치고 날짜순 정렬
    const allActivities = [
        ...activities.planned.map(a => ({ ...a, status: '예정' })),
        ...activities.inProgress.map(a => ({ ...a, status: '진행중' })),
        ...activities.completed.map(a => ({ ...a, status: '완료' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <Header>
                    <Title>상세 활동 리포트</Title>
                    <CloseButton onClick={onClose}>
                        <X size={24} />
                    </CloseButton>
                </Header>

                <Content>
                    <Table>
                        <thead>
                            <tr>
                                <Th>활동명</Th>
                                <Th>카테고리</Th>
                                <Th>날짜</Th>
                                <Th>상태</Th>
                                <Th>파일</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {allActivities.map((activity, index) => (
                                <tr key={`${activity.id}-${index}`}>
                                    <Td>{activity.title}</Td>
                                    <Td><Badge>{activity.tag}</Badge></Td>
                                    <Td>{activity.date}</Td>
                                    <Td>
                                        <StatusBadge $status={activity.status}>
                                            {activity.status}
                                        </StatusBadge>
                                    </Td>
                                    <Td>{activity.files || 0}개</Td>
                                </tr>
                            ))}
                            {allActivities.length === 0 && (
                                <tr>
                                    <Td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                                        등록된 활동이 없습니다.
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Content>
            </ModalContainer>
        </Overlay>
    );
};

export default ReportModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 800px;
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 16px;
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 14px;
`;

const Badge = styled.span`
  background-color: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  ${({ $status }) => {
        switch ($status) {
            case '완료':
                return `
          background-color: #dcfce7;
          color: #166534;
        `;
            case '진행중':
                return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
            default:
                return `
          background-color: #fef9c3;
          color: #854d0e;
        `;
        }
    }}
`;
