import { Upload } from "lucide-react";
import styled from "styled-components";
import { useRef, useState } from "react";
import SelectModal from "./Modal/SelectModal";
import DetailModal from "./Modal/DetailModal";

const FileUpload = ({ activities, onUploadComplete }) => {
  const inputRef = useRef(null);

  const [pendingUploadFile, setPendingUploadFile] = useState(null);
  const [pendingUploadActivity, setPendingUploadActivity] = useState(null);
  const [isSelectActivityOpen, setIsSelectActivityOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [fileDetailName, setFileDetailName] = useState("");
  const [fileDetailTag, setFileDetailTag] = useState("");
  const [fileDescription, setFileDescription] = useState("");

  // 파일 선택 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        data: event.target.result,
      };

      setPendingUploadFile(fileData);
      setIsSelectActivityOpen(true);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 활동 선택 핸들러
  const handleActivitySelect = (activity) => {
    setPendingUploadActivity(activity);
    setIsSelectActivityOpen(false);
    setFileDetailName(pendingUploadFile.name);
    setFileDetailTag(activity.tag ?? "");
    setFileDescription("");
    setIsDetailModalOpen(true);
  };

  // 업로드된 파일 저장
  const saveUploadedFile = () => {
    if (!pendingUploadFile || !pendingUploadActivity) return;

    const file = pendingUploadFile;
    const newFileObj = {
      id: `new-${Date.now()}`,
      name: fileDetailName,
      description: fileDescription,
      fileType: (() => {
        if (file.type.includes("image")) return "image";
        if (file.type.includes("pdf")) return "pdf";
        if (file.name.match(/\.(docx?|doc)$/i)) return "word";
        if (file.name.match(/\.(xlsx?|xls|csv)$/i)) return "excel";
        if (file.name.match(/\.(pptx?|ppt)$/i)) return "powerpoint";
        if (file.type.includes("text") || file.name.match(/\.(txt|md|json|log)$/i)) return "text";
        return "document";
      })(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().slice(0, 10),
      relatedActivity: pendingUploadActivity.id,
      tag: fileDetailTag,
      url: file.data,
    };

    onUploadComplete(newFileObj, pendingUploadActivity.id);

    setIsDetailModalOpen(false);
    setPendingUploadFile(null);
    setPendingUploadActivity(null);
  };

  return (
    <>
      <HiddenInput
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
      />

      <UploadArea onClick={() => inputRef.current.click()}>
        <Upload size={32} />
        <p>파일을 업로드하세요</p>
        <small style={{ color: "#64748B", marginTop: "8px", display: "block" }}>
          (이미지, PDF, 문서 지원 - 최대 5MB)
        </small>
      </UploadArea>

      <SelectModal
        isOpen={isSelectActivityOpen}
        onClose={() => setIsSelectActivityOpen(false)}
        activities={activities}
        onSelect={handleActivitySelect}
      />

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        fileDetailName={fileDetailName}
        setFileDetailName={setFileDetailName}
        fileDetailTag={fileDetailTag}
        setFileDetailTag={setFileDetailTag}
        fileDescription={fileDescription}
        setFileDescription={setFileDescription}
        onSave={saveUploadedFile}
      />
    </>
  );
};

export default FileUpload;

const HiddenInput = styled.input`
  display: none;
`;

const UploadArea = styled.div`
  text-align: center;
  padding: 48px 24px;
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
    background: #F0F9FF;
  }

  p {
    margin-top: 12px;
    font-weight: 500;
    color: #1F2937;
  }
`;