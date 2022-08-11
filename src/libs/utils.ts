import { Timestamp } from "firebase/firestore";

function getDayFromInt(int: number) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[int];
}

function getTimestamp(input: Timestamp | Date): string {
	if (!(input instanceof Timestamp) && !(input instanceof Date)) {
		return "incorrect format";
	}

	let sent: Date;
	let timestamp: string;
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const now = new Date();

	if (input instanceof Timestamp) {
		sent = input.toDate();
	} else {
		sent = input;
	}

	if (now.getTime() - sent.getTime() < 24 * 3600 * 1000) {
		timestamp = sent.toTimeString().slice(0, 5);
	} else if (now.getTime() - sent.getTime() < 7 * 24 * 3600 * 1000) {
		timestamp = days[sent.getDay()];
	} else {
		timestamp = sent.toDateString();
	}

	return timestamp;
}

function getMsgDay(inputTimestamp: Timestamp | Date) {
	if (!(inputTimestamp instanceof Timestamp) && !(inputTimestamp instanceof Date)) {
		console.error("getMsgDay error: incorrect input format");
		return undefined;
	}

	let sent: Date;

	if (inputTimestamp instanceof Timestamp) {
		sent = inputTimestamp.toDate();
	} else {
		sent = inputTimestamp;
	}

	return sent.getDay();
}

function getMsgTime(inputTimestamp: Timestamp | Date) {
	if (!(inputTimestamp instanceof Timestamp) && !(inputTimestamp instanceof Date)) {
		return "incorrect format";
	}

	let sent: Date;

	if (inputTimestamp instanceof Timestamp) {
		sent = inputTimestamp.toDate();
	} else {
		sent = inputTimestamp;
	}

	return sent.toTimeString().slice(0, 5);
}

export { getDayFromInt, getTimestamp, getMsgDay, getMsgTime };
