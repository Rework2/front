import { Upload } from "lucide-react";
import styled from "styled-components";
import { useRef } from "react";

const FileUpload = ({ onFileSelected }) => {
  const inputRef = useRef(null);

  return (
    <>
      <HiddenInput
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />

      <UploadArea onClick={() => inputRef.current.click()}>
        <Upload size={32} />
        <p>파일을 업로드하세요</p>
      </UploadArea>
    </>
  );
};

export default FileUpload;

const HiddenInput = styled.input`
  display: none;
`;

const UploadArea = styled.div`
  text-align: center;
  padding: 24px;
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
`;