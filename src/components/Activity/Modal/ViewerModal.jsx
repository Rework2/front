import styled from "styled-components";
import FilePreview from "../FilePreview";

const ViewerModal = ({
  isOpen,
  onClose,
  selectedFile
}) => {
  // 모달이 닫혀있거나 선택된 파일이 없으면 렌더링하지 않음
  if (!isOpen || !selectedFile) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <FileTitle>{selectedFile.name}</FileTitle>

        {/*연결된 활동 정보*/}
        {selectedFile.activity && (
          <ActivityBox>
            <Tag>{selectedFile.activity?.tag}</Tag>
            <Title>{selectedFile.activity?.title}</Title>
            <Date>{selectedFile.activity?.date}</Date>
          </ActivityBox>
        )}

        <Divider />

        <Content>
          {/* 파일 미리보기 컴포넌트 */}
          <FilePreview file={selectedFile} />
        </Content>

        <DownloadButton
          onClick={() => {
            // 파일 다운로드 처리
            const a = document.createElement("a");
            a.href = selectedFile.url;
            a.download = selectedFile.name;
            a.click();
          }}
        >
          다운로드
        </DownloadButton>
      </Modal>
    </Overlay>
  );
};

export default ViewerModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const Modal = styled.div`
  width: 900px;
  max-height: 90vh;
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FileTitle = styled.h3`
  margin-bottom: 12px;
`;

const ActivityBox = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 14px;
  border-radius: 10px;
`;

const Tag = styled.div`
  background: #eef2ff;
  padding: 4px 10px;
  display: inline-block;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const Date = styled.div`
  margin-top: 6px;
  color: #6b7280;
`;

const Divider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 16px 0;
`;

const Viewer = styled.div`
  flex: 1;
  height: 75vh;
`;

const DownloadButton = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 12px;
  background: #2563eb;
  border-radius: 8px;
  color: white;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
`;