import styled from "styled-components";
import { FileText, Image as ImageIcon, File } from "lucide-react";

const FileList = ({ mode, filteredFiles, filesByTag, onClickFile }) => {

  const renderFile = (file) => {
    const Icon =
      file.fileType === "pdf"
        ? FileText
        : file.fileType === "image"
        ? ImageIcon
        : File;

    return (
      <FileItem key={file.id} onClick={() => onClickFile(file)}>
        <Icon />
        <div>
          <FileName>{file.name}</FileName>
          <Meta>
            {file.uploadDate} · {file.size}
          </Meta>
        </div>
      </FileItem>
    );
  };

  return (
    <ListContainer>

      {mode === 0 && filteredFiles.map(renderFile)}

      {mode === 1 &&
        Object.entries(filesByTag).map(([tag, list]) => (
          <div key={tag}>
            <TagTitle>{tag}</TagTitle>
            {list.map(renderFile)}
          </div>
        ))}

      {mode === 2 && filteredFiles.map(renderFile)}

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
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #EFF4FF;
  }
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #666;
`;

const TagTitle = styled.h4`
  margin-top: 12px;
  margin-bottom: 6px;
`;