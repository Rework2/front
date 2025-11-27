import styled from "styled-components";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { activities, evidenceFiles } from "../../moidata/Activity/Activity";

const ExportDropdown = () => {

  const handleDownloadCSV = () => {
    const header = "id,title,date,status,files\n";
    const rows = [
      ...activities.planned.map(a => `${a.id},${a.title},${a.date},planned,${a.files}`),
      ...activities.inProgress.map(a => `${a.id},${a.title},${a.date},inProgress,${a.files}`),
      ...activities.completed.map(a => `${a.id},${a.title},${a.date},completed,${a.submissions}`)
    ];
    const csvContent = header + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "activities.csv");
  };

  const handleDownloadZIP = async () => {
    const zip = new JSZip();
    for (const file of evidenceFiles) {
      const content = file.content || "파일 내용 없음";
      zip.file(file.name, content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "evidence.zip");
  };

  return (
    <Menu>
      <MenuItem onClick={handleDownloadCSV}>CSV 다운로드</MenuItem>
      <MenuItem onClick={handleDownloadZIP}>ZIP 다운로드</MenuItem>
    </Menu>
  );
};

export default ExportDropdown;

const Menu = styled.div`
  position: absolute;
  top: 100%;      /* 버튼 바로 아래 */
  right: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

  width: 160px;
  padding: 8px 0;
  border-radius: 8px;

  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 4px rgba(0,0,0,0.12);
  z-index: 99;
`;

const MenuItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;