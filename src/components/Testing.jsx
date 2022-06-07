import React, { useRef } from "react";
import { useDebounce, useTimeout } from "../libs/utilityHooks";

export default function Testing() {
    const debounce = useDebounce();
    const [timeout, clear, reset] = useTimeout();
    const testing = useRef();

    function handleTest() {
        // debounce(()=>alert("finished"), 300)
        debounce(()=>alert("done"), 1000)
    }

    return (
        <div ref={testing} onClick={handleTest}>Test text</div>
    )

}