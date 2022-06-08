import { useRef } from "react";


export function useTimeout() {
    const timeoutRef = useRef();
    const callbackRef = useRef();
    const delayRef = useRef();
    
    const timeout = (callback, delay) => {
        callbackRef.current = callback;
        delayRef.current = delay;
        timeoutRef.current = setTimeout(callbackRef.current, delay);
        return timeoutRef.current
    }

    const cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    const reset = () => {
        if (callbackRef.current && delayRef.current) {
            cancel();
            timeout(callbackRef.current, delayRef.current);
        }
    }

    return [timeout, cancel, reset]
}

export function useDebounce() {
    const timeoutID = useRef();
    const [timeout, cancel, reset] = useTimeout();

    const debounce = (callback, delay) => {
        if (timeoutID.current) {
            reset();
        } else {
            timeoutID.current = timeout(callback, delay)
        }
    }

    return debounce
}

export function useInterval() {
    const intervalRef = useRef();

    const interval = (callback, ms) => {
        console.log("interval set")
        intervalRef.current = setInterval(callback, ms)
    };

    const clear = () => clearInterval(intervalRef.current);

    return [interval, clear]
}

