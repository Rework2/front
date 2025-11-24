/**
 * 인라인 추가 폼 컴포넌트
 * 인라인으로 항목을 추가할 수 있는 간단한 폼 컴포넌트
 * @param {string} value - 입력값
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {Function} onChange - 입력값 변경 핸들러
 * @param {Function} onSubmit - 제출 핸들러
 * @param {Function} onCancel - 취소 핸들러
 * @param {string} submitLabel - 제출 버튼 레이블 (기본값: "추가")
 * @param {string} cancelLabel - 취소 버튼 레이블 (기본값: "취소")
 * @param {Component} PlusIcon - 플러스 아이콘 컴포넌트
 */
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
    <div className="inline-add-form">
      {/* 입력 필드 */}
      <input
        className="inline-add-form__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {/* 액션 버튼들 */}
      <div className="inline-add-form__actions">
        <button className="inline-add-form__button" type="button" onClick={onSubmit}>
          {submitLabel}
        </button>
        <button
          className="inline-add-form__button inline-add-form__button--ghost"
          type="button"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}

