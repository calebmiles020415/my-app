import React from "react";
import { useState, useEffect } from 'react'

const Clock = () => {
    const [time, setTime] = useState(0);

    return (
        <div>
            <button className="">Start</button>
            <button className="">Stop</button>
            <button className="">Reset</button>
        </div>
    );
}

export default Clock;