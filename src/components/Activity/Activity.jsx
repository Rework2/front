import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { Search } from "lucide-react";

import KanbanColumn from "./KanbanColumn";
import Toggle from "./Toggle";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

import SelectModal from "./Modal/SelectModal";
import DetailModal from "./Modal/DetailModal";
import EditModal from "./Modal/EditModal";
import ViewerModal from "./Modal/ViewerModal";

import activeYet from "../../assets/activeYet.svg";
import activeIng from "../../assets/activeIng.svg";
import activeDone from "../../assets/activeDone.svg";

import {
  activities as mockActivities,
  evidenceFiles as mockFiles,
  activityStats as mockStats,
} from "../../moidata/Activity/Activity.js";

const Activity = forwardRef((props, ref) => {
  //상태 관리

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [activities, setActivities] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("activities"));
    if (
      saved &&
      typeof saved === "object" &&
      saved.planned &&
      saved.inProgress &&
      saved.completed &&
      saved.planned.length + saved.inProgress.length + saved.completed.length > 0
    ) {
      return saved;
    }
  } catch (e) {}

  return mockActivities;
});

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem("files");
    return saved ? JSON.parse(saved) : mockFiles;
  });

  // 모달 상태
  const [pendingUploadFile, setPendingUploadFile] = useState(null);
  const [pendingUploadActivity, setPendingUploadActivity] = useState(null);

  const [isSelectActivityOpen, setIsSelectActivityOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [fileDetailName, setFileDetailName] = useState("");
  const [fileDetailTag, setFileDetailTag] = useState("");
  const [fileDescription, setFileDescription] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // WebViewer viewer
  const [selectedFile, setSelectedFile] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const viewerRef = useRef(null);

  const stats = mockStats;

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  // WebViewer Open
  const activityMap = [
    ...activities.planned,
    ...activities.inProgress,
    ...activities.completed,
  ].reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const openEvidenceView = (file) => {
    const activity = activityMap[file.relatedActivity] || null;
    setSelectedFile({ ...file, activity });
    setIsViewerOpen(true);
  };

  useEffect(() => {
    if (!isViewerOpen || !selectedFile) return;
    if (selectedFile.fileType === "image") return;

    const loadViewer = async () => {
      const WebViewer = window.WebViewer;
      const options = {
        path: "/webViewer/lib",
      };

      if (selectedFile.fileType === "pdf") {
        options.initialDoc = selectedFile.url;
      } else {
        const blob = await fetch(selectedFile.url).then((r) => r.blob());
        options.initialDoc = blob;
      }

      WebViewer(options, viewerRef.current);
    };

    loadViewer();
  }, [isViewerOpen, selectedFile]);

  //파일 업로드 → 활동 선택
  const handleActivitySelect = (activity) => {
    setPendingUploadActivity(activity);

    setIsSelectActivityOpen(false);

    setFileDetailName(pendingUploadFile.name);
    setFileDetailTag(activity.tag ?? "");
    setFileDescription("");

    setIsDetailModalOpen(true);
  };

  //업로드 파일 정보 저장
  const saveUploadedFile = () => {
    if (!pendingUploadFile || !pendingUploadActivity) return;

    const file = pendingUploadFile;

    const newFileObj = {
      id: `new-${Date.now()}`,
      name: fileDetailName,
      description: fileDescription,
      fileType: file.type.includes("pdf")
        ? "pdf"
        : file.type.includes("image")
        ? "image"
        : "document",
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().slice(0, 10),
      relatedActivity: pendingUploadActivity.id,
      tag: fileDetailTag,
      url: URL.createObjectURL(file),
    };

    setFiles((prev) => [...prev, newFileObj]);

    setPendingUploadFile(null);
    setPendingUploadActivity(null);
    setIsDetailModalOpen(false);
  };

  //파일 필터링

  const filteredFiles = (() => {
    if (activeTabIndex === 0) return files;
    if (activeTabIndex === 1) return files.filter((f) => f.relatedActivity);
    if (activeTabIndex === 2) {
      const diff = (d) => (Date.now() - new Date(d)) / (1000 * 60 * 60 * 24);
      return files.filter((f) => diff(f.uploadDate) <= 7);
    }
    return files;
  })();

  //파일 태그별 분류

  const filesByTag = files.reduce((acc, f) => {
    const act = activityMap[f.relatedActivity];
    if (!act) return acc;

    const tag = act.tag || "기타";
    if (!acc[tag]) acc[tag] = [];

    acc[tag].push(f);
    return acc;
  }, {});

  // 활동 추가 + 자동 분류
  const addActivity = (activity) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(activity.date).setHours(0, 0, 0, 0);

    const newItem = {
      id: `new-${Date.now()}`,
      title: activity.title,
      tag: activity.tag,
      categories: [activity.tag],
      date: activity.date,
      files: 0,
    };

    if (startDate > today) {
      setActivities((prev) => ({
        ...prev,
        planned: [...prev.planned, newItem],
      }));
    } else {
      setActivities((prev) => ({
        ...prev,
        inProgress: [...prev.inProgress, newItem],
      }));
    }
  };

  useImperativeHandle(ref, () => ({
    addActivity,
  }));

  //활동 수정
  const openEditModal = (item) => {
    setEditItem({ ...item });
    setIsEditOpen(true);
  };

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

  //화면 UI
  return (
    <PageContainer>
      <Container>
        <MainLayout>
          {/* 좌측 칸반 */}
          <LeftSection>
            <BoardContainer>
              <KanbanColumn
                title="예정"
                icon={activeYet}
                items={activities.planned}
                onEdit={openEditModal}
              />
              <KanbanColumn
                title="진행 중"
                icon={activeIng}
                items={activities.inProgress}
                onEdit={openEditModal}
              />
              <KanbanColumn
                title="완료"
                icon={activeDone}
                items={activities.completed}
                onEdit={openEditModal}
              />
            </BoardContainer>

            <StatsSection>
              <StatsGrid>
                <StatCard>
                  전체 활동
                  <StatValue>{stats.totalActivities}</StatValue>
                </StatCard>
                <StatCard>
                  완료율
                  <StatValue>{stats.completionRate}%</StatValue>
                </StatCard>
                <StatCard>
                  증빙 파일
                  <StatValue>{files.length}</StatValue>
                </StatCard>
              </StatsGrid>
            </StatsSection>
          </LeftSection>

          {/* 우측 파일리스트 */}
          <RightSidebar>
            <SidebarHeader>
              <h3>증빙 자료</h3>

              <Toggle
                value={activeTabIndex}
                onChange={setActiveTabIndex}
                options={["전체", "활동별", "최근"]}
              />

              <SearchBar>
                <Search />
                <input type="text" placeholder="파일 검색" />
              </SearchBar>
            </SidebarHeader>

            <FileList
              mode={activeTabIndex}
              filteredFiles={filteredFiles}
              filesByTag={filesByTag}
              onClickFile={openEvidenceView}
            />

            <FileUpload
              onFileSelected={(f) => {
                setPendingUploadFile(f);
                setIsSelectActivityOpen(true);
              }}
            />
          </RightSidebar>

          {/* 모달들 */}
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

          <ViewerModal
            isOpen={isViewerOpen}
            onClose={() => setIsViewerOpen(false)}
            selectedFile={selectedFile}
            viewerRef={viewerRef}
          />

          <EditModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            editItem={editItem}
            setEditItem={setEditItem}
            onSave={saveEdit}
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
  gap: 32px;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const StatsSection = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatCard = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  margin-top: 6px;
  font-size: 22px;
  font-weight: 700;
`;

const RightSidebar = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: fit-content;
`;

const SidebarHeader = styled.div`
  margin-bottom: 20px;
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