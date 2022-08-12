import React, { useEffect, useRef, useState } from "react";
import { useDebounce, useInterval } from "../libs/utilityHooks";

export default function Testing() {
	//TEST these with re-rendering

	const debounce = useDebounce();
	// const {timeout, clear: clearTimeout, reset} = useTimeout();
	const { interval, clear: clearInterval } = useInterval();
	const testing = useRef<HTMLDivElement | null>(null);
	const [count, setCount] = useState(0);

	function handleTest() {
		// debounce(()=>alert("finished"), 300)
		debounce(() => alert("done"), 1000);
	}

	function increment() {
		console.log("incremented");
		setCount((prev) => prev + 1);
	}

	useEffect(() => {
		interval(increment, 500);
		return clearInterval;
	}, []); //eslint-disable-line

	return (
		<div ref={testing} onClick={handleTest}>
			Test text count:{count}
		</div>
	);
}
