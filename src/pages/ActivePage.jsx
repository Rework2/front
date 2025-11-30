import styled from "styled-components"
import { useState, useRef, useEffect } from "react";

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

    // Activity 컴포넌트 제어용
    const activityRef = useRef();

    // 로드맵 데이터에서 필터 옵션 생성
    const [activityTypeOptions, setActivityTypeOptions] = useState(["모든 활동"]);
    const [periodOptions, setPeriodOptions] = useState(["전체 기간"]);

    useEffect(() => {
        const loadFilterOptions = () => {
            try {
                const roadmapData = localStorage.getItem("roadmap_activities_db");
                if (roadmapData) {
                    const activities = JSON.parse(roadmapData);

                    const activityTypeMap = {
                        "competition": "공모전/대회",
                        "certification": "자격증",
                        "project": "개인/팀 프로젝트",
                        "extracurricular": "대외활동",
                        "internship": "인턴십",
                        "study": "스터디/동아리"
                    };

                    const types = new Set();
                    const years = new Set();

                    const userId = getCurrentUserId();
                    const customTypesKey = userId ? `custom_activity_types_${userId}` : "custom_activity_types";
                    const customTypesStr = localStorage.getItem(customTypesKey);
                    if (customTypesStr) {
                        const customTypes = JSON.parse(customTypesStr);
                        customTypes.forEach(t => types.add(t.label));
                    }

                    activities.forEach(activity => {
                        const tag = activityTypeMap[activity.type] || activity.type;
                        types.add(tag);
                        if (activity.startYear) years.add(activity.startYear);
                        if (activity.endYear) years.add(activity.endYear);
                    });

                    setActivityTypeOptions(["모든 활동", ...Array.from(types).sort()]);
                    setPeriodOptions(["전체 기간", ...Array.from(years).sort((a, b) => b - a).map(y => `${y}년`)]);
                }
            } catch (e) {
                console.error("Failed to load filter options:", e);
            }
        };

        loadFilterOptions();

        // 로드맵 데이터 변경 감지
        const interval = setInterval(loadFilterOptions, 2000);
        return () => clearInterval(interval);
    }, []);

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
                            onAdd={(activity) => {
                                activityRef.current.addActivity(activity);
                            }}
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
                    {/* 필터 상태를 Activity에 전달 */}
                    <Activity
                        ref={activityRef}
                        selectedActivityType={selectedActivityType}
                        selectedPeriod={selectedPeriod}
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