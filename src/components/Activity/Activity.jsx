import { useState, useMemo } from "react";
// import { useFile } from "../../hooks/useFile"; // ActivePage로 이동됨
import styled from "styled-components";

import KanbanColumn from "./KanbanColumn";

import EditModal from "./Modal/EditModal";
import ViewerModal from "./Modal/ViewerModal";
import ActivityStats from "./ActivityStats";
import FileSidebar from "./FileSidebar";

import activeYet from "../../assets/activeYet.svg";
import activeIng from "../../assets/activeIng.svg";
import activeDone from "../../assets/activeDone.svg";

const Activity = ({
  activities, // 필터링된 활동 목록
  allActivities, // 전체 활동 목록 (파일 매핑용)
  onDeleteActivity,
  onChangeProgress,
  onUpdateFileCount,
  onUpdateActivity,
  fileProps // ActivePage에서 전달받은 파일 관리 props
}) => {
  // 수정 모달 상태 관리
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // 파일 관리 훅 사용 (props로 전달받음)
  const {
    files,
    activeTabIndex,
    setActiveTabIndex,
    filteredFiles,
    filesByTag,
    addFile,
    deleteFile,
    openViewer,
    closeViewer,
    selectedFile,
    isViewerOpen,
    searchQuery,
    setSearchQuery
  } = fileProps;

  // 활동 수정 모달 열기
  const openEditModal = (item, status) => {
    setEditItem({ ...item, status }); // status를 item에 포함시키거나 별도 state로 관리
    setIsEditOpen(true);
  };

  // 활동 수정 저장
  const saveEdit = () => {
    if (!editItem) return;
    onUpdateActivity(editItem);
    setIsEditOpen(false);
  };

  // 활동 삭제
  const onDelete = () => {
    onDeleteActivity(editItem, setIsEditOpen);
  };

  return (
    <PageContainer>
      <Container>
        <MainLayout>
          <LeftSection>
            <BoardContainer>
              <KanbanColumn
                title="예정"
                icon={activeYet}
                items={activities.planned}
                type="planned"
                onEdit={openEditModal}
                onChangeProgress={onChangeProgress}
              />
              <KanbanColumn
                title="진행 중"
                icon={activeIng}
                items={activities.inProgress}
                type="progress"
                onEdit={openEditModal}
                onChangeProgress={onChangeProgress}
              />
              <KanbanColumn
                title="완료"
                icon={activeDone}
                items={activities.completed}
                type="completed"
                onEdit={openEditModal}
                onChangeProgress={onChangeProgress}
              />
            </BoardContainer>

            <ActivityStats
              filteredActivities={activities}
              filesCount={files.length}
            />
          </LeftSection>

          <FileSidebar
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            filteredFiles={filteredFiles}
            filesByTag={filesByTag}
            onFileClick={openViewer}
            onFileDelete={deleteFile}
            activities={allActivities} // 사이드바에는 전체 활동 목록 전달
            onUploadComplete={addFile}
            files={files}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <ViewerModal
            isOpen={isViewerOpen}
            onClose={closeViewer}
            selectedFile={selectedFile}
          />

          <EditModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            editItem={editItem}
            setEditItem={setEditItem}
            onSave={saveEdit}
            onDelete={onDelete}
            status={editItem?.status} // 상태 전달
          />
        </MainLayout>
      </Container>
    </PageContainer>
  );
};

export default Activity;

const PageContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Container = styled.div``;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;