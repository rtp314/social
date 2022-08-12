import { useRef } from "react";

export function useTimeout() {
	const timeoutRef = useRef<NodeJS.Timeout>();
	const callbackRef = useRef<() => any>();
	const delayRef = useRef<number>();

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
	const timeoutID = useRef<NodeJS.Timeout>();
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
	const intervalRef = useRef<NodeJS.Timer>();

	const interval = (callback: () => any, ms: number) => {
		console.log("interval set");
		intervalRef.current = setInterval(callback, ms);
	};

	const clear = () => clearInterval(intervalRef.current as any as number);

	return { interval, clear };
}
