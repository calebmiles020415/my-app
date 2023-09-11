import * as React from "react";
import CalculatorKey from "./CalculatorButton";
import "./Calculator.css";

const Calculator: React.FC = () => {
    const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(false);
    const [isCalcFinished, setCalcFinished] = React.useState<boolean>(true);
    const [prevDisplay, setPrevDisplay] = React.useState<string>("");
    const [prevValue, setPrevValue] = React.useState<string>("");
    const [nextValue, setNextValue] = React.useState<string>("0");
    const [operator, setOperator] = React.useState<string>("");

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
                <CalculatorKey keyValue={"c"} className="calc-btn bg-black" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"%"} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"/"} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"Back"} className="calc-btn bg-black" onKeyClick={onKeyClick} />
                {/* Second Row */}
                <CalculatorKey keyValue={7} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={8} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={9} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"*"} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Third Row */}
                <CalculatorKey keyValue={4} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={5} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={6} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"-"} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Fourth Row */}
                <CalculatorKey keyValue={1} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={2} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={3} className="calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"+"} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                {/* Fifth Row */}
                <CalculatorKey keyValue={"\xB1"} className="calc-btn bg-white" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={0} className="key-zero calc-btn bg-white" onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"."} className="key-dot calc-btn bg-white" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
                <CalculatorKey keyValue={"="} className="calc-btn bg-black" isDisable={isButtonDisabled} onKeyClick={onKeyClick} />
            </div>
        </div>
    );
}

export default Calculator;