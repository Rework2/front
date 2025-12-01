import styled from "styled-components";

// 인라인 추가 폼 컴포넌트
// 인라인으로 항목을 추가할 수 있는 간단한 폼 컴포넌트
export function InlineAddForm({
  value,
  placeholder,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "추가",
  cancelLabel = "취소",
  PlusIcon,
}) {
  return (
    <InlineAddFormContainer>
      <InlineAddFormInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InlineAddFormActions>
        <InlineAddFormButton type="button" onClick={onSubmit}>
          {submitLabel}
        </InlineAddFormButton>
        <InlineAddFormButtonGhost type="button" onClick={onCancel}>
          {cancelLabel}
        </InlineAddFormButtonGhost>
      </InlineAddFormActions>
    </InlineAddFormContainer>
  );
}

const InlineAddFormContainer = styled.div`
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

const InlineAddFormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const InlineAddFormActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const InlineAddFormButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: #3b82f6;
  color: white;
`;

const InlineAddFormButtonGhost = styled(InlineAddFormButton)`
  background: transparent;
  color: #64748b;

  &:hover {
    background: #e2e8f0;
    color: #334155;
  }
`;

