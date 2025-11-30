// props:
// - title: 컬럼 제목
// - icon: lucide-react 아이콘 컴포넌트
// - items: 배열(해당 상태의 활동 목록)
// - type: planned | progress | completed (완료는 submissions 사용)

import styled from "styled-components";
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { DEFAULT_ACTIVITY_TYPES } from "../roadmappage/constants";

const KanbanColumn = ({
    title,
    icon,
    items = [],
    type,
    onChangeProgress,  // 추가
    onEdit
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dateModal, setDateModal] = useState({
        isOpen: false,
        item: null,
        targetProgress: 0,
        message: "",
        newDate: ""
    });

    // 활동 이동 처리 (예정 <-> 진행중 <-> 완료)
    const handleMove = (item, progress) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const itemDate = new Date(item.date);

        if (progress === 0) { // To Planned
            if (itemDate <= today) {
                setDateModal({
                    isOpen: true,
                    item,
                    targetProgress: 0,
                    message: "예정 활동은 오늘 이후의 날짜여야 합니다.",
                    newDate: ""
                });
                return;
            }
        } else if (progress === 50) { // To In Progress
            if (itemDate > today) {
                setDateModal({
                    isOpen: true,
                    item,
                    targetProgress: 50,
                    message: "진행 중인 활동은 오늘 또는 이전 날짜여야 합니다.",
                    newDate: ""
                });
                return;
            }
        }

        onChangeProgress(item, progress);
        setOpenModal(false);
        setSelectedItem(null);
    };

    // 날짜 재설정 및 이동 처리
    const handleDateSubmit = () => {
        if (!dateModal.newDate) return;

        const updatedItem = { ...dateModal.item, date: dateModal.newDate };
        onChangeProgress(dateModal.item, dateModal.targetProgress, updatedItem);

        setDateModal({ isOpen: false, item: null, targetProgress: 0, message: "", newDate: "" });
        setOpenModal(false);
        setSelectedItem(null);
    };

    return (
        <>
            <ColumnWrap>
                <Header>
                    <Title $type={type}>
                        <img src={icon} style={{ width: 20, height: 20 }} />
                        <h3>{title}</h3>
                        <span className="count">{items.length}</span>
                    </Title>

                    <MenuWrap>
                        <MoreVertical onClick={() => setOpenModal(true)} />
                    </MenuWrap>
                </Header>

                <TaskList>
                    {items.map(item => (
                        <TaskCard key={item.id} onClick={() => onEdit(item)}>
                            <TaskTitle>
                                {item.isAiRecommendation && <AiPrefix>✨ AI 추천</AiPrefix>}
                                {item.title}
                            </TaskTitle>
                            <CategroryTags>{item.tag}</CategroryTags>
                            <TaskMeta>
                                <span>📅 {item.date}</span>
                                <span>📎 {item.files || 0}개</span>
                            </TaskMeta>
                        </TaskCard>
                    ))}
                </TaskList>
            </ColumnWrap>

            {/* 활동 이동 모달 */}
            {openModal && !dateModal.isOpen && (
                <ModalOverlay onClick={() => setOpenModal(false)}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: "16px" }}>{title} - 활동 이동</h3>

                        <ModalCardList>
                            {items.map(item => (
                                <ModalCard
                                    key={item.id}
                                    $selected={selectedItem?.id === item.id}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                                        {item.tag} · 파일 {item.files}개
                                    </div>
                                </ModalCard>
                            ))}
                        </ModalCardList>

                        {selectedItem && (
                            <>
                                <div style={{ marginTop: "16px", fontSize: "14px", padding: "12px", background: "#F8FAFC", borderRadius: "8px" }}>
                                    <strong>{selectedItem.title}</strong>를 어디로 이동할까요?
                                </div>

                                <ModalButtons>
                                    {type !== "planned" && (
                                        <ModalButton onClick={() => handleMove(selectedItem, 0)}>
                                            📋 예정으로 이동
                                        </ModalButton>
                                    )}

                                    {type !== "progress" && (
                                        <ModalButton onClick={() => handleMove(selectedItem, 50)}>
                                            ⚡ 진행중으로 이동
                                        </ModalButton>
                                    )}

                                    {type !== "completed" && selectedItem.files > 0 && (
                                        <ModalButton onClick={() => handleMove(selectedItem, 100)}>
                                            ✅ 완료로 이동
                                        </ModalButton>
                                    )}

                                    {type !== "completed" && selectedItem.files === 0 && (
                                        <div style={{
                                            padding: "12px",
                                            background: "#FEE2E2",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                            color: "#991B1B",
                                            textAlign: "center"
                                        }}>
                                            증빙 파일이 있어야 완료 처리할 수 있습니다
                                        </div>
                                    )}
                                </ModalButtons>
                            </>
                        )}

                        <CloseButton onClick={() => {
                            setOpenModal(false);
                            setSelectedItem(null);
                        }}>
                            닫기
                        </CloseButton>
                    </ModalBox>
                </ModalOverlay>
            )}

            {/* 날짜 재설정 모달 */}
            {dateModal.isOpen && (
                <ModalOverlay onClick={() => setDateModal({ ...dateModal, isOpen: false })}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: "16px" }}>날짜 재설정</h3>
                        <div style={{ marginBottom: "20px", color: "#64748B", fontSize: "14px" }}>
                            {dateModal.message}
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                                새로운 날짜 선택
                            </label>
                            <input
                                type="date"
                                value={dateModal.newDate}
                                onChange={(e) => setDateModal({ ...dateModal, newDate: e.target.value })}
                                min={dateModal.targetProgress === 0 ? new Date(Date.now() + 86400000).toISOString().split('T')[0] : undefined}
                                max={dateModal.targetProgress === 50 ? new Date().toISOString().split('T')[0] : undefined}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid #E2E8F0",
                                    fontSize: "14px"
                                }}
                            />
                        </div>

                        <ModalButtons>
                            <ModalButton onClick={handleDateSubmit} disabled={!dateModal.newDate}>
                                확인 및 이동
                            </ModalButton>
                        </ModalButtons>

                        <CloseButton onClick={() => setDateModal({ ...dateModal, isOpen: false })}>
                            취소
                        </CloseButton>
                    </ModalBox>
                </ModalOverlay>
            )}
        </>
    );
};

export default KanbanColumn;

const ColumnWrap = styled.div`
    background: #fff;
    border: 1px solid #E9F1FF;
    border-radius: 16px;
    padding: 24px;

    box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    border-bottom: 1px solid #E9F1FF;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    gap: 6px;
    transform: translateY(-3px);

    h3 {
        font-size: 15px;
        font-weight: 600;
    }

    .count {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 10px;

    background: ${({ $type }) =>
        $type === "planned"
            ? "#FEF3C7" //예정
            : $type === "progress"
                ? "#DBEAFE"       // 진행중
                : $type === "completed"
                    ? "#D1FAE5"       // 완료
                    : "#E2E8F0"};
    
    color: ${({ $type }) =>
        $type === "planned"
            ? "#D97706" //예정
            : $type === "progress"
                ? "#2563EB"       // 진행중
                : $type === "completed"
                    ? "#059669"       // 완료
                    : "#475569"};
  }
`;

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const TaskCard = styled.div`
    padding: 16.67px;
    border-radius: 12px;
    border: 1px solid #E9F1FF;
    background: #fff;
    transition: 0.15s;
    box-shadow: 0 10px 24px rgba(16, 24, 40, 0.06);

    &:hover {
        background: #EFF4FF;
    }
`;

const TaskTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const TaskMeta = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #64748B;
`;



const getCategoryColor = (tagName) => {
    const type = DEFAULT_ACTIVITY_TYPES.find(t => t.label === tagName);
    return type ? type.color : "#F1F5F9";
};

const CategroryTags = styled.div`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    background: ${({ children }) => getCategoryColor(children)};
    font-size: 12px;
    font-weight: 500;
    color: #334155;
    margin-top: 8px;
`;

const AiPrefix = styled.span`
    font-size: 11px;
    color: #4F46E5;
    margin-right: 4px;
    font-weight: 600;
    vertical-align: middle;
`;

const CategoryDetail = styled.div`
`;


const MenuWrap = styled.div`
`;

const MenuBox = styled.div`
    position: absolute;
    background: #fff;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    box-shadow: 0px 4px 16px rgba(16, 24, 40, 0.1);
    margin-top: 8px;
    z-index: 10;
`;

const MenuItem = styled.div`
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background: #F3F4F6;
    }
`;



const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const ModalBox = styled.div`
    background: white;
    padding: 24px;
    width: 360px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
`;

const ModalCardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 20px;
`;

const ModalCard = styled.div`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({ $selected }) => $selected ? "#2A5EE4" : "#E2E8F0"};
    background: ${({ $selected }) => $selected ? "#EFF6FF" : "#fff"};
    cursor: pointer;

    &:hover {
        background: #F8FAFC;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ModalButton = styled.button`
    padding: 10px;
    background: #EFF6FF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background: #DBEAFE;
    }
`;

const CloseButton = styled.button`
    margin-top: 14px;
    background: transparent;
    border: none;
    color: #64748B;
    cursor: pointer;
    width: 100%;
    text-align: center;
`;