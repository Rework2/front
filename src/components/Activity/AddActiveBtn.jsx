import styled from "styled-components";
import { useState, useEffect } from "react";


import Dropdown from "./Dropdown";

export const baseCategories = [
  { id: "competition", label: "공모전/대회" },
  { id: "certification", label: "자격증" },
  { id: "project", label: "개인/팀 프로젝트" },
  { id: "extracurricular", label: "대외활동" },
  { id: "internship", label: "인턴십" },
  { id: "study", label: "스터디/동아리" }
];

const ONBOARDING_STORAGE_KEY = "rework_onboarding";

const AddActiveBtn = ({ onAdd }) => {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState(baseCategories);

  const [newActivity, setNewActivity] = useState({
    title: "",
    tag: "",
    date: "",
  });

  // 온보딩에서 선택한 활동도 카테고리에 포함
  useEffect(() => {
    if (!open) return; // 모달이 열릴 때만 실행

    try {
      // 온보딩 데이터에서 선택한 활동 가져오기
      const onboardingData = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (onboardingData) {
        const parsed = JSON.parse(onboardingData);
        const { formData } = parsed;

        if (formData && formData.preferredActivities) {
          // 온보딩에서 선택한 활동을 카테고리에 추가
          const merged = [...baseCategories];

          // 중복 제거 (이미 있는 카테고리는 제외)
          formData.preferredActivities.forEach(activityId => {
            if (!merged.some(c => c.id === activityId)) {
              // 기본 카테고리에 없는 경우에만 추가
              const label = baseCategories.find(c => c.id === activityId)?.label || activityId;
              merged.push({ id: activityId, label });
            }
          });

          setCategories(merged);
        }
      }
    } catch (e) {
      console.error('온보딩 데이터 로드 실패:', e);
    }
  }, [open]);


  // 활동 저장
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
              <div style={{ width: '100%' }}>
                <Dropdown
                  props={categories.map(c => c.label)}
                  value={newActivity.tag || "선택하기"}
                  onChange={(val) =>
                    setNewActivity(prev => ({ ...prev, tag: val }))
                  }
                  width="100%"
                />
              </div>
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

  input {
    padding: 0 12px;
    height: 36px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
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