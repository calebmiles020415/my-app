import { FC, useState, useEffect } from "react";

const Clock: FC = () => {
    const [count, setCount] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const start = () => setIsRunning(true);

    const stop = () => setIsRunning(false);

    const reset = () => setCount(0);

    const showClock = () => {
        const hour = Math.floor(count / 3600);
        const min = Math.floor(count / 60) % 60;
        const sec = count % 60;

        return (
            <div>
                {`${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`}
            </div>
        );
    }

    return (
        <div>
            <div>
                {showClock()}
            </div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Clock;