import { FC } from 'react';
import './CalculatorKey.css'

interface CalculatorKeyProps {
    keyValue: number | string;
    isDisable?: boolean;
    onKeyClick: (key: number | string) => void
}

const CalculatorKey: FC<CalculatorKeyProps> = ({ keyValue, onKeyClick, isDisable }) => {
    return (
        <button className={`calc-btn ${typeof (keyValue) === 'number' ? 'bg-white' : 'bg-black'}`} onClick={() => onKeyClick(keyValue)} disabled={isDisable}>
            {keyValue }
        </button>
    );
}

export default CalculatorKey;