import { File, FileText, FileSpreadsheet, MonitorPlay } from "lucide-react";
import { useState, useEffect } from "react";

const FilePreview = ({ file }) => {
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    if (file) {
      setCurrentFile(file);
    }
  }, [file]);

  if (!currentFile) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
        <File size={48} color="#D1D5DB" />
        <p style={{ marginTop: "12px" }}>파일을 선택해주세요</p>
      </div>
    );
  }

  const { fileType, url, data } = currentFile;
  const fileSource = url || data;

  // 이미지 파일 미리보기
  if (fileType === "image") {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src={fileSource}
          alt="preview"
          style={{
            maxWidth: "100%",
            maxHeight: "500px",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        />
      </div>
    );
  }

  // PDF & TXT 파일 미리보기
  if (fileType === "pdf" || fileType === "text") {
    return (
      <div style={{ width: "100%", height: "600px" }}>
        <iframe
          src={fileSource}
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "8px", background: "#fff" }}
          title="File Preview"
        />
      </div>
    );
  }

  // 그 외 파일 (Word, Excel, PPT 등)
  let Icon = File;
  let iconColor = "#6B7280";
  let typeLabel = "파일";

  if (fileType === "word") {
    Icon = FileText;
    iconColor = "#2563EB";
    typeLabel = "Word 문서";
  } else if (fileType === "excel") {
    Icon = FileSpreadsheet;
    iconColor = "#16A34A";
    typeLabel = "Excel 시트";
  } else if (fileType === "powerpoint") {
    Icon = MonitorPlay;
    iconColor = "#EA580C";
    typeLabel = "PowerPoint 프레젠테이션";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "60px 40px",
          background: "#F9FAFB",
          borderRadius: "8px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}
      >
        <Icon size={64} color={iconColor} />
        <div>
          <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#1F2937", marginBottom: "4px" }}>
            {typeLabel}
          </h4>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            해당 파일은 미리보기가 불가한 파일입니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;