import { useState, useEffect, FC } from "react";
import CalculatorKey from "./CalculatorButton";
import "./Calculator.css";

const Calculator: FC = () => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [isCalcFinished, setCalcFinished] = useState<boolean>(true);
    const [prevDisplay, setPrevDisplay] = useState<string>("");
    const [prevValue, setPrevValue] = useState<string>("");
    const [nextValue, setNextValue] = useState<string>("0");
    const [operator, setOperator] = useState<string>("");

    const CalculatorOperations = {
        "/": (firstValue: number, secondValue: number) => firstValue / secondValue,
        "*": (firstValue: number, secondValue: number) => firstValue * secondValue,
        "+": (firstValue: number, secondValue: number) => firstValue + secondValue,
        "-": (firstValue: number, secondValue: number) => firstValue - secondValue,
        "=": (firstValue: number, secondValue: number) => secondValue,
    };

    const performOperation = (new_operator: string) => {
        const temp = CalculatorOperations[operator as keyof typeof CalculatorOperations](Number(prevValue), Number(nextValue));
        setOperator("");
        setNextValue(String(temp));
        setPrevValue(String(temp));
        setPrevDisplay(new_operator === '=' ? prevValue + operator + nextValue : String(temp));
        setCalcFinished(true);
        if (operator === "/" && nextValue === "0") {
            setButtonDisabled(true);
        }
    };

    const insertDot = () => {
        if (!/\./.test(nextValue)) {
            setNextValue(nextValue + ".");
        }
    };

    const percentage = () => {
        setNextValue(String(Number(nextValue) / 100));
        if (prevValue && nextValue === "") {
            setPrevValue(String(Number(prevValue) / 100));
            setPrevDisplay(String(Number(prevValue) / 100));
        }
    };

    const changeSign = () => {
        setNextValue(String(Number(nextValue) * -1));
    };

    const clearData = () => {
        setCalcFinished(true);
        setNextValue("0");
        setPrevValue("");
        setPrevDisplay("");
        setOperator("");
    };

    const backspace = () => {
        let temp = nextValue;
        setNextValue(temp.slice(0, temp.length - 1));
    };

    const onNumberKey = (number: number) => {
        if (isButtonDisabled) setButtonDisabled(false);
        if (operator === '=') clearData();
        setNextValue(isCalcFinished || nextValue === "0" ? String(number) : nextValue + number);
        setCalcFinished(false);
    };

    const onOperatorKey = (value: string) => {
        if (isButtonDisabled) setButtonDisabled(false);
        if (value in CalculatorOperations) {
            setCalcFinished(true);
            if (operator === "" || operator === '=') {
                setOperator(value);
                setPrevValue(nextValue);
                setPrevDisplay(nextValue);
            }
            if (prevValue && operator && nextValue && !isCalcFinished) {
                performOperation(value);
            }
            if (operator) {
                setOperator(value);
            }
        }
        switch (value) {
            case "c":
                clearData();
                break;
            case "\xB1":
                changeSign();
                break;
            case ".":
                insertDot();
                break;
            case "%":
                percentage();
                break;
            case "Back":
                backspace();
                break;
            default:
                break;
        }
    };

    const onKeyClick = (value: number | string) => {
        if (typeof (value) === "number") onNumberKey(value);
        else onOperatorKey(value);
    }

    return (
        <div className="calculator">
            <div className="calculator-input">
                <div className="pre-result">{prevDisplay + operator} </div>
                <div className="result">{nextValue} </div>
            </div>
            <div className="calculator-keypad">
                {/* First Row */}
                <CalculatorKey keyValue={"c"} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"%"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"/"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"Back"} onKeyClick={onKeyClick} />
                {/* Second Row */}
                <CalculatorKey keyValue={7} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={8} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={9} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"*"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Third Row */}
                <CalculatorKey keyValue={4} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={5} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={6} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"-"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Fourth Row */}
                <CalculatorKey keyValue={1} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={2} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={3} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"+"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Fifth Row */}
                <CalculatorKey keyValue={"\xB1"} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={0} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"."} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"="} isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
            </div>
        </div>
    );
}

export default Calculator;