import styled from "styled-components"
import { useState, useRef, useEffect, useMemo } from "react";
import { useActivity } from "../hooks/useActivity";

import upload from "../assets/upload.svg";
import filter from "../assets/filter.svg";

import Dropdown from "../components/Activity/Dropdown";
import Activity from "../components/Activity/Activity";
import ExportDropdown from "../components/Activity/ExportDropdown";

import AddActiveBtn from "../components/Activity/AddActiveBtn";   // 추가 버튼 컴포넌트

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

const ActivePage = () => {
    const [openExport, setOpenExport] = useState(false);
    const [selectedActivityType, setSelectedActivityType] = useState("모든 활동");
    const [selectedPeriod, setSelectedPeriod] = useState("전체 기간");

    // useActivity 훅 사용
    const {
        activities,
        addActivity,
        updateActivity,
        handleDeleteActivity,
        handleChangeProgress,
        updateFileCount
    } = useActivity();

    // 필터 옵션 생성 (activities 변경 시 자동 업데이트)
    const { activityTypeOptions, periodOptions } = useMemo(() => {
        const types = new Set(["모든 활동"]);
        const years = new Set();

        const allItems = [
            ...activities.planned,
            ...activities.inProgress,
            ...activities.completed
        ];

        allItems.forEach(activity => {
            if (activity.tag) types.add(activity.tag);
            if (activity.startYear) years.add(activity.startYear);
            if (activity.endYear) years.add(activity.endYear);
            // date 필드에서도 연도 추출 (backup)
            if (activity.date) {
                const year = parseInt(activity.date.split('-')[0]);
                if (!isNaN(year)) years.add(year);
            }
        });

        // 사용자 정의 활동 타입 추가 (localStorage)
        try {
            const userId = getCurrentUserId();
            const customTypesKey = userId ? `custom_activity_types_${userId}` : "custom_activity_types";
            const customTypesStr = localStorage.getItem(customTypesKey);
            if (customTypesStr) {
                const customTypes = JSON.parse(customTypesStr);
                customTypes.forEach(t => types.add(t.label));
            }
        } catch (e) {
            console.error("Failed to load custom types:", e);
        }

        const sortedTypes = Array.from(types).filter(t => t !== "모든 활동").sort();

        return {
            activityTypeOptions: ["모든 활동", ...sortedTypes],
            periodOptions: ["전체 기간", ...Array.from(years).sort((a, b) => b - a).map(y => `${y}년`)]
        };
    }, [activities]);

    // 필터링된 활동 목록 생성
    const filteredActivities = useMemo(() => {
        const filterList = (list) => {
            return list.filter(activity => {
                // 활동 유형 필터
                if (selectedActivityType !== "모든 활동" && activity.tag !== selectedActivityType) {
                    return false;
                }

                // 기간 필터
                if (selectedPeriod !== "전체 기간") {
                    const selectedYear = parseInt(selectedPeriod.replace("년", ""));
                    const startYear = activity.startYear || parseInt(activity.date?.split('-')[0]);
                    const endYear = activity.endYear || startYear;

                    if (selectedYear < startYear || selectedYear > endYear) {
                        return false;
                    }
                }

                return true;
            });
        };

        return {
            planned: filterList(activities.planned),
            inProgress: filterList(activities.inProgress),
            completed: filterList(activities.completed)
        };
    }, [activities, selectedActivityType, selectedPeriod]);

    return (
        <PageContainer>
            <Container>
                <ActiveTopWrap>
                    <ATitleWrap>
                        <ATitle>활동 관리 허브</ATitle>
                        <ASub>모든 활동과 증빙 자료를 한 곳에서 관리하고 시각화하세요.</ASub>
                    </ATitleWrap>

                    <ADownloadWrap>
                        <ProofABtnWrap>
                            <ProofABtn onClick={() => setOpenExport(prev => !prev)}>
                                <img src={upload} />내보내기
                            </ProofABtn>

                            {openExport && <ExportDropdown />}
                        </ProofABtnWrap>

                        {/* 새 활동 추가 버튼 컴포넌트 */}
                        <AddActiveBtn
                            onAdd={addActivity}
                        />
                    </ADownloadWrap>
                </ActiveTopWrap>

                <AFilter>
                    <DdWrap>
                        <Dropdown
                            props={activityTypeOptions}
                            value={selectedActivityType}
                            onChange={setSelectedActivityType}
                            icon={filter}
                        />
                        <Dropdown
                            props={periodOptions}
                            value={selectedPeriod}
                            onChange={setSelectedPeriod}
                        />
                    </DdWrap>
                </AFilter>

                <AManageWrap>
                    {/* 필터링된 데이터와 핸들러를 Activity에 전달 */}
                    <Activity
                        activities={filteredActivities}
                        allActivities={activities} // useFile 등을 위해 전체 데이터도 전달 (필요 시)
                        onDeleteActivity={handleDeleteActivity}
                        onChangeProgress={handleChangeProgress}
                        onUpdateFileCount={updateFileCount}
                        onUpdateActivity={updateActivity}
                    />
                </AManageWrap>
            </Container>
        </PageContainer>
    );
};

export default ActivePage;

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 2rem;
    background: #F8FBFF;
`;

const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
`;
const ActiveTopWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ATitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const ATitle = styled.div`
    font-weight: 600;
    font-size: 32px;
`;
const ASub = styled.div`
    font-family: "Pretendard", Regular;
    font-weight: 400;
    font-size: 16px;
    color: #0F172AB2;
`;

const ADownloadWrap = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const ProofABtnWrap = styled.div`
    position: relative;
`;

const ProofABtn = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    white-space: nowrap;
    padding: 10px 16px;

    font-family: "Pretendard", Medium;
    font-weight: 500;
    font-size: 14px;
    color: #2A5EE4;

    background: #fff;
    border: 1px solid #2A5EE4;
    border-radius: 8px;

    > img {
        width: 16px;
        height: 16px;
    }
`;

const AFilter = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 12px;
`;

const DdWrap = styled.div`
    display: flex;
    gap: 20px;
`;

const AManageWrap = styled.div`
    display: flex;
    margin-top: 20px;
`;