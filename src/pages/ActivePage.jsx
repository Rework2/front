import styled from "styled-components"
import { useState, useRef } from "react";

import upload from "../assets/upload.svg";
import filter from "../assets/filter.svg";

import Dropdown from "../components/Activity/Dropdown";
import Activity from "../components/Activity/Activity";
import ExportDropdown from "../components/Activity/ExportDropdown";

import AddActiveBtn from "../components/Activity/AddActiveBtn";   // 🔥 추가 버튼 컴포넌트

const ActivePage = () => {
    const [openExport, setOpenExport] = useState(false);

    // Activity 컴포넌트 제어용
    const activityRef = useRef();

    const AllActive = ["모든 활동", "1", "2"];
    const AllPeiod = ["전체 기간", "1", "2"];

    return (
        <ActivePageWrap>
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

                    {/* 🔥 새 활동 추가 버튼 컴포넌트 */}
                    <AddActiveBtn 
                        onAdd={(activity) => {
                            activityRef.current.addActivity(activity);
                        }}
                    />
                </ADownloadWrap>
            </ActiveTopWrap>

            <AFilter>
                <img src={filter} />
                <DdWrap>
                    <Dropdown props={AllActive} />
                    <Dropdown props={AllPeiod} />
                </DdWrap>
            </AFilter>

            <AManageWrap>
                {/* 🔥 Activity 컴포넌트가 addActivity를 가지고 있음 */}
                <Activity ref={activityRef} />
            </AManageWrap>

        </ActivePageWrap>
    );
};

export default ActivePage;

/* ================================
   Styled Components
================================ */

const ActivePageWrap = styled.div`
    padding: 32px;
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
    font-family: "Pretendard", Bold;
    font-weight: 700;
    font-size: 16px;
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
    padding: 7px 12px;

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