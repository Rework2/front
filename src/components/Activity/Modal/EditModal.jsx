import { useState, useEffect } from "react";
import styled from "styled-components";

import Dropdown from "../Dropdown";
import { baseCategories } from "../AddActiveBtn";

const getCurrentUserId = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id;
    }
  } catch (e) {
    console.error("Failed to get user ID:", e);
  }
  return null;
};

const EditModal = ({ isOpen, onClose, editItem, setEditItem, onSave, onDelete, status }) => {
  const [categories, setCategories] = useState(baseCategories.map(c => c.label));

  // 커스텀 카테고리 로드
  useEffect(() => {
    const loadCustomCategories = () => {
      try {
        const userId = getCurrentUserId();
        const key = userId ? `custom_activity_types_${userId}` : "custom_activity_types";
        const savedTypes = localStorage.getItem(key);
        if (savedTypes) {
          const parsed = JSON.parse(savedTypes);
          const customLabels = parsed.map(t => t.label);
          setCategories([...baseCategories.map(c => c.label), ...customLabels]);
        }
      } catch (e) {
        console.error("Failed to load custom categories:", e);
      }
    };

    if (isOpen) {
      loadCustomCategories();
    }
  }, [isOpen]);

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
          <div style={{ width: '100%' }}>
            <Dropdown
              props={categories}
              value={editItem.tag}
              onChange={(val) =>
                setEditItem({ ...editItem, tag: val })
              }
              width="100%"
            />
          </div>
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

        {status === 'completed' && (
          <InputGroup>
            <label>완료 날짜</label>
            <input
              type="date"
              value={editItem.endDate || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, endDate: e.target.value })
              }
            />
          </InputGroup>
        )}

        <ButtonContainer>
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
          <SaveButton onClick={onSave}>수정하기</SaveButton>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #1d4ed8;
  }
`;

const DeleteButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #FECACA;
  }
`;