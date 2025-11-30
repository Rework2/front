import { useState, useImperativeHandle, useMemo, forwardRef } from "react";
import { useFile } from "../../hooks/useFile";
import { useActivity } from "../../hooks/useActivity";
import styled from "styled-components";

import KanbanColumn from "./KanbanColumn";

import EditModal from "./Modal/EditModal";
import ViewerModal from "./Modal/ViewerModal";
import ActivityStats from "./ActivityStats";
import FileSidebar from "./FileSidebar";

import activeYet from "../../assets/activeYet.svg";
import activeIng from "../../assets/activeIng.svg";
import activeDone from "../../assets/activeDone.svg";

const Activity = forwardRef(({ selectedActivityType = "모든 활동", selectedPeriod = "전체 기간" }, ref) => {
  // 수정 모달 상태 관리
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // 활동 관리 훅 사용
  const {
    activities,
    setActivities,
    addActivity,
    handleDeleteActivity,
    handleChangeProgress,
    updateFileCount
  } = useActivity();

  // 활동 ID로 활동 객체를 빠르게 찾기 위한 맵 생성
  const activityMap = useMemo(() => [
    ...activities.planned,
    ...activities.inProgress,
    ...activities.completed,
  ].reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {}), [activities]);

  // 파일 관리 훅 사용
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
  } = useFile({ activityMap, onFileCountChange: updateFileCount });


  // 선택된 필터(활동 유형, 기간)에 따라 활동 목록 필터링
  const getFilteredActivities = (activityList) => {
    return activityList.filter(activity => {
      if (selectedActivityType !== "모든 활동" && activity.tag !== selectedActivityType) {
        return false;
      }

      if (selectedPeriod !== "전체 기간") {
        const year = parseInt(selectedPeriod.replace("년", ""));
        const activityStartYear = activity.startYear || parseInt(activity.date?.split('-')[0]);
        const activityEndYear = activity.endYear || activityStartYear;

        if (year < activityStartYear || year > activityEndYear) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredActivities = useMemo(() => ({
    planned: getFilteredActivities(activities.planned),
    inProgress: getFilteredActivities(activities.inProgress),
    completed: getFilteredActivities(activities.completed)
  }), [activities, selectedActivityType, selectedPeriod]);

  // 활동 수정 모달 열기
  const openEditModal = (item) => {
    setEditItem({ ...item });
    setIsEditOpen(true);
  };

  // 활동 수정 저장
  const saveEdit = () => {
    if (!editItem) return;

    setActivities((prev) => {
      const update = (list) =>
        list.map((a) => (a.id === editItem.id ? editItem : a));

      return {
        planned: update(prev.planned),
        inProgress: update(prev.inProgress),
        completed: update(prev.completed),
      };
    });

    setIsEditOpen(false);
  };

  // 활동 삭제
  const onDeleteActivity = () => {
    handleDeleteActivity(editItem, setIsEditOpen);
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
                items={filteredActivities.planned}
                type="planned"
                onEdit={openEditModal}
                onChangeProgress={handleChangeProgress}
              />
              <KanbanColumn
                title="진행 중"
                icon={activeIng}
                items={filteredActivities.inProgress}
                type="progress"
                onEdit={openEditModal}
                onChangeProgress={handleChangeProgress}
              />
              <KanbanColumn
                title="완료"
                icon={activeDone}
                items={filteredActivities.completed}
                type="completed"
                onEdit={openEditModal}
                onChangeProgress={handleChangeProgress}
              />
            </BoardContainer>

            <ActivityStats
              filteredActivities={filteredActivities}
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
            activities={activities}
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
            onDelete={onDeleteActivity}
          />
        </MainLayout>
      </Container>
    </PageContainer>
  );
});

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