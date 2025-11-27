import styled from "styled-components";

const EditModal = ({ isOpen, onClose, editItem, setEditItem, onSave }) => {
  if (!isOpen || !editItem) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3>활동 정보 수정</h3>

        <InputGroup>
          <label>활동명</label>
          <input
            value={editItem.title}
            onChange={(e) =>
              setEditItem({ ...editItem, title: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup>
          <label>카테고리</label>
          <input
            value={editItem.tag}
            onChange={(e) =>
              setEditItem({ ...editItem, tag: e.target.value })
            }
          />
        </InputGroup>

        <InputGroup>
          <label>시작 날짜</label>
          <input
            type="date"
            value={editItem.date}
            onChange={(e) =>
              setEditItem({ ...editItem, date: e.target.value })
            }
          />
        </InputGroup>

        <SaveButton onClick={onSave}>수정하기</SaveButton>
      </Modal>
    </Overlay>
  );
};

export default EditModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const Modal = styled.div`
  width: 420px;
  background: #fff;
  padding: 22px;
  border-radius: 14px;
`;

const InputGroup = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  background: #2563eb;
  color: white;
`;