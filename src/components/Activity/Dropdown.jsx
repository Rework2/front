import { useState, useEffect } from "react";
import styled from "styled-components";
import dropdown from "../../assets/dropdown.svg";

const Dropdown = ({ props: propsList, value, onChange, icon, width }) => {
    const list = Array.isArray(propsList)
        ? propsList
        : propsList?.data || [];

    const [currentValue, setCurrentValue] = useState(value || list[0]);
    const [showOptions, setShowOptions] = useState(false);

    // value prop이 변경되면 currentValue 업데이트
    useEffect(() => {
        if (value !== undefined) {
            setCurrentValue(value);
        }
    }, [value]);

    // 옵션 선택 핸들러
    const handleOnChangeSelectValue = (e) => {
        const newValue = e.target.getAttribute("value");
        setCurrentValue(newValue);
        setShowOptions(false);

        // onChange 콜백 호출
        if (onChange) {
            onChange(newValue);
        }
    }

    return (
        <SelectBox $width={width}>
            <Label onClick={() => setShowOptions(prev => !prev)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {icon && <img src={icon} style={{ width: '16px', height: '16px' }} alt="" />}
                    {currentValue}
                </div>
                <img src={dropdown} alt="toggle" />
            </Label>

            <SelectOptions $show={showOptions}>
                {list.map((data, index) => (
                    <Option key={index} value={data} onClick={handleOnChangeSelectValue}>
                        {data}
                    </Option>
                ))}
            </SelectOptions>
        </SelectBox>
    );
}

export default Dropdown;

const SelectBox = styled.div`
    position: relative;
    width: ${props => props.$width || '200px'};
    height: 36px;

    display: flex;
    align-items: center;
    padding: 0 12px;

    border-radius: 8px;
    background: #fff;
    border: 1px solid #d1d5db;
`;

const Label = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    > img {
        width: 16px;
        height: 16px;
    }
`;

const SelectOptions = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    margin-top: 6px;

    display: ${({ $show }) => ($show ? "block" : "none")};
    z-index: 1000;
`;

const Option = styled.div`
    padding: 10px 12px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #f3f4f6;
    }
`;