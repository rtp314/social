import React, { useEffect, useRef, useState } from "react";
import { useDebounce, useInterval, useTimeout } from "../libs/utilityHooks";

export default function Testing() {
//TEST these with re-rendering

    const debounce = useDebounce();
    const [timeout, clearTimeout, reset] = useTimeout();
    const [interval, clearInterval] = useInterval();
    const testing = useRef();
    const [count, setCount] = useState(0);

    function handleTest() {
        // debounce(()=>alert("finished"), 300)
        debounce(()=>alert("done"), 1000)
    }

    function increment() {
        console.log("incremented");
        setCount(prev => prev + 1)
    }

    useEffect(()=>{
        interval(increment, 500);
        return clearInterval
    },[])

    return (
        <div ref={testing} onClick={handleTest}>Test text count:{count}</div>
    )

}