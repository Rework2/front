import ProgressBar from '@ramonak/react-progress-bar';
import styled from "styled-components";

// 프로그레스 바 컴포넌트 (진행률 표시)
const Progress = ({ completed }) => {

    return (
        <ProgressWrapper>
            {/* 오른쪽 표시할 숫자 */}
            <RightPercent>{completed}%</RightPercent>

            {/* 중앙 숫자(label)는 끄지 않는다 → isLabelVisible 사용 X */}
            <ProgressBar
                completed={completed}
                bgColor="#000000"
                baseBgColor="rgba(255,255,255,0.3)"
                height="10px"
                labelAlignment="outside"     // 우측에 기본 라벨 유지
                labelColor="#fff"         // 라벨 색(검정)
                isLabelVisible={false}
            />
        </ProgressWrapper>
    );
};
export default Progress;

const ProgressWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const RightPercent = styled.div`
    position: absolute;
    right: 0;
    top: -18px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
`;