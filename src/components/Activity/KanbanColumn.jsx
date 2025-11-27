// src/components/Activity/KanbanColumn.jsx
// ---------------------------------------
// ✔ KanbanColumn
// 하나의 칸반 컬럼(예정/진행/완료)을 재사용 가능한 컴포넌트로 분리
// props:
// - title: 컬럼 제목
// - icon: lucide-react 아이콘 컴포넌트
// - items: 배열(해당 상태의 활동 목록)
// - type: planned | progress | completed (완료는 submissions 사용)
// ---------------------------------------

import styled from "styled-components";
import { useState } from "react";
import { MoreVertical } from "lucide-react";

const KanbanColumn = ({ 
    title, 
    icon: Icon,  // props.icon을 Icon으로 받아 아이콘처럼 렌더링
    items = [], 
    type,
    onChangeProgress,
    onEdit
}) => {
    const [openModal , setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); //선택된 카드
    return (
        <>
        <ColumnWrap>
        
        {/* -------- 컬럼 헤더 -------- */}
        <Header>
            <Title $type={type}>
                <img src={Icon} style={{width: 20, height: 20}}/>
                <h3>{title}</h3>
                {/* 항목 개수 표시 */}
                <span className="count">{items.length}</span>
            </Title>

            <MenuWrap>

                {/* 우측 더보기 아이콘 */}
                <MoreVertical onClick={() => setOpenModal(true)}/>
            </MenuWrap>

        </Header>


        {/* -------- 활동 카드 리스트 -------- */}
        <TaskList>
            {items.map(item => (
            <TaskCard key={item.id} onClick={() => onEdit(item)}>
                
                {/* 활동 제목 */}
                <TaskTitle>{item.title}</TaskTitle>

                {/* 카테고리 태그 */}
                <CategroryTags>{item.tag}</CategroryTags>
                <CategoryDetail>{item.categories}</CategoryDetail>

                {/* {type === "progress" && (
                    <Progress />
                )} */}

                {/* 날짜/파일 수 */}
                <TaskMeta>
                <span>📅 {item.date}</span>

                {/* 완료 컬럼은 submissions 사용 */}
                <span>📎 {type === "completed" ? item.submissions : item.files}개</span>
                </TaskMeta>

            </TaskCard>
            ))}
        </TaskList>

        </ColumnWrap>

        {/* -------- 모달창 (컬럼 더보기 버튼 클릭 시) -------- */}
        {openModal && (
            <ModalOverlay onClick={() => setOpenModal(false)}>
                <ModalBox onClick={(e) => e.stopPropagation()}>

                    <h3 style={{ marginBottom: "16px" }}>{title} - 활동 선택</h3>

                    {/* 카드 선택 리스트 */}
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

                    {/* 선택 후 상태 이동 버튼 */}
                    {selectedItem && (
                        <>
                        <div style={{ marginTop: "16px", fontSize: "14px" }}>
                            <strong>{selectedItem.title}</strong> 이동하기
                        </div>

                        <ModalButtons>
                            <ModalButton onClick={() => { 
                                onChangeProgress(selectedItem, 0);
                                setOpenModal(false);
                                setSelectedItem(null);
                            }}>
                                예정으로
                            </ModalButton>

                            <ModalButton onClick={() => {
                                onChangeProgress(selectedItem, 50);
                                setOpenModal(false);
                                setSelectedItem(null);
                            }}>
                                진행중으로
                            </ModalButton>

                            {/* 파일이 있을 때만 완료 허용 */}
                            {selectedItem.files > 0 && (
                                <ModalButton onClick={() => {
                                    onChangeProgress(selectedItem, 100);
                                    setOpenModal(false);
                                    setSelectedItem(null);
                                }}>
                                    완료로
                                </ModalButton>
                            )}
                        </ModalButtons>
                        </>
                    )}

                    <CloseButton onClick={() => setOpenModal(false)}>
                        닫기
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

    box-shadow: 0px 4px 8px rgba(16, 24, 40, 0.039);
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

    h3 {
        font-size: 15px;
        font-weight: 600;
    }

    .count {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 10px;

    background: ${({$type}) =>
        $type === "planned"
            ? "#FEF3C7" //예정
            : $type === "progress"
            ? "#DBEAFE"       // 진행중
            : $type === "completed"
            ? "#D1FAE5"       // 완료
            : "#E2E8F0"};
    
    color: ${({$type}) =>
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
    box-shadow: 0px 4px 8px rgba(16, 24, 40, 0.039);

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

const CategroryTags = styled.div`
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
    border: 1px solid ${({$selected}) => $selected ? "#2A5EE4" : "#E2E8F0"};
    background: ${({$selected}) => $selected ? "#EFF6FF" : "#fff"};
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