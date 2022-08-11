import { useRef } from "react";

export function useTimeout() {
	const timeoutRef = useRef();
	const callbackRef = useRef();
	const delayRef = useRef();

	const timeout = (callback: () => any, delay: number): NodeJS.Timeout => {
		callbackRef.current = callback;
		delayRef.current = delay;
		timeoutRef.current = setTimeout(callbackRef.current, delay);
		return timeoutRef.current;
	};

	const cancel = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const reset: () => void = () => {
		if (callbackRef.current && delayRef.current) {
			cancel();
			timeout(callbackRef.current, delayRef.current);
		}
	};

	return { timeout, cancel, reset };
}

export function useDebounce() {
	const timeoutID = useRef();
	const { timeout, reset } = useTimeout();

	const debounce = (callback: () => any, delay: number) => {
		if (timeoutID.current) {
			reset();
		} else {
			timeoutID.current = timeout(callback, delay);
		}
	};

	return debounce;
}

export function useInterval() {
	const intervalRef = useRef();

	const interval = (callback: () => any, ms: number) => {
		console.log("interval set");
		intervalRef.current = setInterval(callback, ms);
	};

	const clear = () => clearInterval(intervalRef.current);

	return { interval, clear };
}
