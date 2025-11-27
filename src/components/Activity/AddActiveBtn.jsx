import { useState } from "react";
import styled from "styled-components";

const categories = [
  { id: "competition", label: "공모전/대회" },
  { id: "certification", label: "자격증" },
  { id: "project", label: "개인/팀 프로젝트" },
  { id: "extracurricular", label: "대외활동" },
  { id: "internship", label: "인턴십" },
  { id: "study", label: "스터디/동아리" }
];

const AddActiveBtn = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    tag: "",
    date: "",
  });

  const handleSave = () => {
    if (!newActivity.title.trim()) return alert("활동명을 입력하세요.");
    if (!newActivity.tag) return alert("카테고리를 선택하세요.");
    if (!newActivity.date) return alert("시작 날짜를 선택하세요.");

    onAdd(newActivity);
    setNewActivity({ title: "", tag: "", date: "" });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ 새 활동 추가</Button>

      {open && (
        <Overlay onClick={() => setOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h3>새 활동 추가</h3>

            <InputGroup>
              <label>활동명</label>
              <input
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity(prev => ({ ...prev, title: e.target.value }))
                }
              />
            </InputGroup>

            <InputGroup>
              <label>카테고리</label>
              <select
                value={newActivity.tag}
                onChange={(e) =>
                  setNewActivity(prev => ({ ...prev, tag: e.target.value }))
                }
              >
                <option value="">선택하기</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.label}>{c.label}</option>
                ))}
              </select>
            </InputGroup>

            <InputGroup>
              <label>시작 날짜</label>
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) =>
                  setNewActivity(prev => ({ ...prev, date: e.target.value }))
                }
              />
            </InputGroup>

            <SaveBtn onClick={handleSave}>추가하기</SaveBtn>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default AddActiveBtn;

const Button = styled.button`
  padding: 10px 16px;
  background: #2A5EE4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

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
  background: white;
  padding: 22px;
  border-radius: 14px;
`;

const InputGroup = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  input,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

const SaveBtn = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
`;