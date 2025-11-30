import styled from "styled-components";

const DetailModal = ({
  isOpen,
  onClose,
  fileDetailName,
  setFileDetailName,
  fileDetailTag,
  setFileDetailTag,
  fileDescription,
  setFileDescription,
  onSave
}) => {
  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3>파일 상세 정보</h3>

        <InputGroup>
          <label>파일 이름</label>
          <input
            value={fileDetailName}
            onChange={(e) => setFileDetailName(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>태그</label>
          <input
            value={fileDetailTag}
            onChange={(e) => setFileDetailTag(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>설명</label>
          <textarea
            rows={4}
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
          />
        </InputGroup>

        <SaveButton onClick={onSave}>저장하기</SaveButton>
      </Modal>
    </Overlay>
  );
};

export default DetailModal;

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
  width: 420px;
  background: white;
  padding: 22px;
  border-radius: 14px;
`;

const InputGroup = styled.div`
  margin-top: 12px;

  label {
    margin-bottom: 6px;
    font-size: 14px;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: #2563eb;
  border-radius: 8px;
  color: white;
`;