import React from "react";
import { useState, useEffect } from 'react';

const Clock: React.FC = () => {

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

    return (
        <div>
            <div>
                {Math.floor(count / 3600)} : {Math.floor(count / 60) % 60} : {count % 60}
            </div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>

        </div>
    );
};

export default Clock;