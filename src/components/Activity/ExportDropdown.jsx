import styled from "styled-components";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ExportDropdown = ({ files }) => {

  const getCurrentUserId = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.id;
      }
    } catch (e) {
      console.error("Failed to get user ID:", e);
    }
    return null;
  };

  // 사용자별 스토리지 키 생성
  const getStorageKey = (baseKey) => {
    const userId = getCurrentUserId();
    return userId ? `${baseKey}_${userId}` : baseKey;
  };

  // 활동 데이터 가져오기
  const getActivityData = () => {
    try {
      const storageKey = getStorageKey("activities");
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : { planned: [], inProgress: [], completed: [] };
    } catch (e) {
      console.error("Failed to load activity data", e);
      return { planned: [], inProgress: [], completed: [] };
    }
  };

  // JSON 내보내기
  const handleDownloadJSON = () => {
    const activities = getActivityData();
    const allActivities = [
      ...activities.planned,
      ...activities.inProgress,
      ...activities.completed
    ];

    if (allActivities.length === 0) {
      alert("내보낼 데이터가 없습니다.");
      return;
    }
    const blob = new Blob([JSON.stringify(activities, null, 2)], { type: "application/json" });
    saveAs(blob, "activities.json");
  };

  // ZIP 내보내기
  const handleDownloadZIP = async () => {
    try {
      // files prop이 없거나 비어있으면 경고
      if (!files || files.length === 0) {
        alert("다운로드할 파일이 없습니다.");
        return;
      }

      const zip = new JSZip();
      let count = 0;

      for (const file of files) {
        let fileData = file.url || file.data;

        // 데이터가 없으면 개별 스토리지에서 확인
        if (!fileData && file.dataKey) {
          fileData = localStorage.getItem(`file_data_${file.dataKey}`);
        }

        if (fileData) {
          // Base64 데이터에서 실제 데이터 부분만 추출 (data:image/png;base64,...)
          const base64Data = fileData.split(',')[1];
          if (base64Data) {
            zip.file(file.name, base64Data, { base64: true });
            count++;
          }
        }
      }

      if (count === 0) {
        alert("저장된 파일 데이터가 없습니다.");
        return;
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `evidence_files_${new Date().toISOString().slice(0, 10)}.zip`);

    } catch (e) {
      console.error("ZIP 생성 실패:", e);
      alert("ZIP 파일 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Menu>
      <MenuItem onClick={handleDownloadJSON}>JSON</MenuItem>
      <MenuItem onClick={handleDownloadZIP}>FILES.ZIP</MenuItem>
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