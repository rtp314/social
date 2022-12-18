import { useEffect } from "react";

export default function useClickOutside(ref: Node, callback: () => any) {
	function handleClick(event: Event) {
		if (event.currentTarget !== ref) {
			callback();
		}
	}

	function unsubscribe() {
		window.removeEventListener("click", handleClick);
	}

	useEffect(() => {
		window.addEventListener("click", handleClick, { once: true });
		return unsubscribe;
	}, []);

	return unsubscribe;
}
