import { useState } from "react";
import styled from "styled-components";
import dropdown from "../../assets/dropdown.svg";

const Dropdown = (props) => {
    const list = Array.isArray(props.props) 
      ? props.props
      : props.props?.data || [];

    const [currentValue, setCurrentValue] = useState(list[0]);
    const [showOptions, setShowOptions] = useState(false);

    const handleOnChangeSelectValue = (e) => {
        setCurrentValue(e.target.getAttribute("value"));
        setShowOptions(false);
    }

    return (
        <SelectBox>
            <Label onClick={() => setShowOptions(prev => !prev)}>
                {currentValue}
                <img src={dropdown} />
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
    position: relative;   /* 드롭다운이 이 기준으로 펼쳐짐 */
    width: 200px;
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
    top: 100%;   /* SelectBox 바로 아래 */
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