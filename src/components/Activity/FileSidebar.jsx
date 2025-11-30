import styled from "styled-components";
import { Search } from "lucide-react";
import Toggle from "./Toggle";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

const FileSidebar = ({
  activeTabIndex,
  setActiveTabIndex,
  filteredFiles,
  filesByTag,
  onFileClick,
  onFileDelete,
  activities,
  onUploadComplete,
  searchQuery,
  setSearchQuery,
  files
}) => {
  // 전체 파일 용량 계산
  const totalSize = files?.reduce((acc, file) => {
    const sizeStr = file.size || "0 MB";
    const size = parseFloat(sizeStr.split(" ")[0]);
    return acc + (isNaN(size) ? 0 : size);
  }, 0).toFixed(2);

  const MAX_SIZE = 100; // 100MB

  return (
    <RightSidebar>
      <SidebarHeader>
        <HeaderTop>
          <h3>증빙 자료</h3>
          <StorageInfo>{totalSize} MB / {MAX_SIZE} MB</StorageInfo>
        </HeaderTop>
        <Toggle
          value={activeTabIndex}
          onChange={setActiveTabIndex}
          options={["전체", "활동별", "최근"]}
        />
        {/* 파일 검색 바 */}
        <SearchBar>
          <Search />
          <input
            type="text"
            placeholder="파일 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
      </SidebarHeader>

      {/* 파일 목록 표시 */}
      <FileList
        mode={activeTabIndex}
        filteredFiles={filteredFiles}
        filesByTag={filesByTag}
        onClickFile={onFileClick}
        onDeleteFile={onFileDelete}
      />

      {/* 파일 업로드 컴포넌트 */}
      <FileUpload
        activities={activities}
        onUploadComplete={onUploadComplete}
      />
    </RightSidebar>
  );
};

export default FileSidebar;

const RightSidebar = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  height: fit-content;
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
`;

const SidebarHeader = styled.div`
  margin-bottom: 32px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const StorageInfo = styled.span`
  font-size: 15px;
  color: #64748b;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;

  input {
    flex: 1;
    border: none;
    outline: none;
  }
`;
