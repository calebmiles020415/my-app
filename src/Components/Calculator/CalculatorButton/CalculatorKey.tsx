import { FC } from 'react';
import './CalculatorKey.css'

interface Props {
    keyValue: number | string;
    isDisable?: boolean;
    onKeyClick: (key: number | string) => void
}

const CalculatorKey: React.FC<Props> = (props) => {
    const { keyValue, onKeyClick, isDisable } = props;

    return (
        <button className={`calc-btn ${typeof (keyValue) === 'number' ? 'bg-white' : 'bg-black'}`} onClick={() => onKeyClick(keyValue)} disabled={isDisable}>
            {keyValue}
        </button>
    );
}

export default CalculatorKey;