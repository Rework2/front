import { useState, useCallback } from "react";
import styled, { css } from "styled-components";

const Toggle = ({ value, onChange, options=[ ] }) => {
    const count = options.length;
    const isControlled = typeof value === "number";
    const [inner, setInner] = useState(0);

    const selected = isControlled ? value : inner;

    const setSelected = useCallback(
        (next) => {
            if (!isControlled) setInner(next);
            onChange?.(next);
        },
        [isControlled, onChange]
    );

    return (
        <ToggleWrap>
            <Switch>
                <Track />
                
                {/* 3개의 텍스트 */}
                {options.map((label, index) => (
                    <LabelIn
                        key={label}
                        style={{ left: `${(index * 100) / 3}%` }}
                        $active={selected === index}
                        onClick={() => setSelected(index)}
                    >
                        {label}
                    </LabelIn>
                ))}

                {/*index 기반 이동 */}
                <Knob $index={selected} 
                    $count={count}
                />
            </Switch>
        </ToggleWrap>
    );
};

export default Toggle;

const ToggleWrap = styled.div`
    display: inline-flex;
    align-items: center;
    width: 100%;
`;

const Switch = styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    border-radius: 100px;
    background: transparent;
`;

const Track = styled.div`
    position: absolute;
    inset: 0;
    background: #fff;
    border-radius: 100px;
`;

const Knob = styled.div`
    position: absolute;
    bottom: 5px;
    height: 46px;
    width: 33.33%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 100px;

    transform: translateX(${(p) => `calc(${p.$index * 100}% )`});
    transition: transform 0.35s ease;
`;

const LabelIn = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    width: 33.33%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;

    ${(p) =>
        p.$active
            ? css`
                color: #ffffff;
              `
            : css`
                color: #868686;
              `}
`;