import styled from "styled-components";
import { FileText, Image as ImageIcon, File, Trash2, FileSpreadsheet, MonitorPlay, FileJson } from "lucide-react";

const FileList = ({ mode, filteredFiles, filesByTag, onClickFile, onDeleteFile }) => {

  // 파일 타입별 아이콘 및 스타일 반환
  const getFileStyles = (type) => {
    switch (type) {
      case "pdf": return { icon: FileText, color: "#ef4444", bg: "#fee2e2" };
      case "image": return { icon: ImageIcon, color: "#22c55e", bg: "#dcfce7" };
      case "word": return { icon: FileText, color: "#3b82f6", bg: "#dbeafe" };
      case "excel": return { icon: FileSpreadsheet, color: "#10b981", bg: "#d1fae5" };
      case "powerpoint": return { icon: MonitorPlay, color: "#f97316", bg: "#ffedd5" };
      case "text": return { icon: FileText, color: "#64748b", bg: "#f1f5f9" };
      default: return { icon: File, color: "#64748b", bg: "#f1f5f9" };
    }
  };

  // 개별 파일 렌더링
  const renderFile = (file) => {
    const styles = getFileStyles(file.fileType);
    const Icon = styles.icon;

    return (
      <FileItem key={file.id}>
        <LeftArea onClick={() => onClickFile(file)}>
          <IconWrapper $bg={styles.bg} $color={styles.color}>
            <Icon size={20} />
          </IconWrapper>
          <div>
            <FileName>{file.name}</FileName>
            <Meta>
              {file.uploadDate} · {file.size}
            </Meta>
          </div>
        </LeftArea>

        <DeleteBtn onClick={() => onDeleteFile(file.id)}>
          <Trash2 size={18} />
        </DeleteBtn>
      </FileItem>
    );
  };

  // 최근 파일 정렬
  const sortedRecentFiles =
    mode === 2
      ? [...filteredFiles].sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      )
      : filteredFiles;

  return (
    <ListContainer>
      {mode === 0 && filteredFiles.map(renderFile)}

      {/* 활동별 보기 */}
      {mode === 1 &&
        Object.entries(filesByTag).map(([tag, list]) => (
          <div key={tag}>
            <TagTitle>{tag}</TagTitle>
            {list.map(renderFile)}
          </div>
        ))}

      {/* 최근순 */}
      {mode === 2 && sortedRecentFiles.map(renderFile)}
    </ListContainer>
  );
};

export default FileList;


const ListContainer = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #eff4ff;
  }
`;

const LeftArea = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #666;
`;

const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #d11a2a;

  &:hover {
    opacity: 0.7;
  }
`;

const TagTitle = styled.h4`
  margin-top: 12px;
  margin-bottom: 6px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;