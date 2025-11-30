import styled from "styled-components";

const SelectModal = ({ isOpen, onClose, activities, onSelect }) => {
  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3>어떤 활동에 넣을까요?</h3>

        <SelectList>
          {["planned", "inProgress", "completed"].map((key) => (
            <Group key={key}>
              <GroupTitle>
                {key === "planned" && "예정된 활동"}
                {key === "inProgress" && "진행 중"}
                {key === "completed" && "완료됨"}
              </GroupTitle>

              {/* 각 상태별 활동 목록 렌더링 */}
              {activities[key].map((act) => (
                <ActivityItem key={act.id} onClick={() => onSelect(act)}>
                  {act.title}
                </ActivityItem>
              ))}
            </Group>
          ))}
        </SelectList>
      </Modal>
    </Overlay>
  );
};

export default SelectModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900;
`;

const Modal = styled.div`
  width: 380px;
  background: white;
  padding: 22px;
  border-radius: 14px;
`;

const SelectList = styled.div`
  margin-top: 20px;
`;

const Group = styled.div`
  margin-bottom: 20px;
`;

const GroupTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 15px;
`;

const ActivityItem = styled.div`
  padding: 10px 12px;
  background: #f1f5f9;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    background: #e2e8f0;
  }
`;