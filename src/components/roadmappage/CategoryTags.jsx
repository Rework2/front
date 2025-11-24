/**
 * 카테고리 태그 컴포넌트
 * 선택된 태그들을 칩 형태로 표시하고 제거할 수 있는 컴포넌트
 * @param {Array} tags - 태그 목록
 * @param {Function} onRemoveTag - 태그 제거 핸들러
 * @param {Component} XIcon - 닫기 아이콘 컴포넌트
 */
export function CategoryTags({ tags, onRemoveTag, XIcon }) {
  return (
    <div className="roadmap-page__category-tags">
      {tags.map((tag) => (
        <div key={tag} className="tag-chip" onClick={() => onRemoveTag(tag)}>
          {tag}
          {XIcon && <XIcon />}
        </div>
      ))}
    </div>
  );
}

