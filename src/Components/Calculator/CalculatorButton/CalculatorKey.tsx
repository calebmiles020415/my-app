import * as React from "react";
import './CalculatorKey.css'

interface Props {
    keyValue: number | string;
    className: string;
    isDisable?: boolean;
    onKeyClick: (key: number | string) => void
}

const CalculatorKey: React.FC<Props> = (props) => {

    return (
        <button className={props.className} onClick={() => props.onKeyClick(props.keyValue)} disabled={props.isDisable}>
            <span>{props.keyValue}</span>
        </button>
    );
}

export default CalculatorKey;