import styled from "styled-components";

export function CategoryTags({ tags, onRemoveTag, XIcon }) {
  return (
    <CategoryTagsContainer>
      {tags.map((tag) => (
        <TagChip key={tag} onClick={() => onRemoveTag(tag)}>
          {tag}
          {XIcon && <XIcon />}
        </TagChip>
      ))}
    </CategoryTagsContainer>
  );
}

const CategoryTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

