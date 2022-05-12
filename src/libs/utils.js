import { Timestamp } from "firebase/firestore";

function getDayFromInt(int) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[int]
};

function getTimestamp(input) {
    if (!(input instanceof Timestamp) && !(input instanceof Date)) {
        return "incorrect format";
    };

    let sent;
    let timestamp;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();

    if (input instanceof Timestamp) {
        sent = input.toDate();
    } else {
        sent = input;
    };

    if ((now-sent) < (24*3600*1000)) {
        timestamp = sent.toTimeString().slice(0,5)
    } else if ((now-sent) < (7*24*3600*1000)) {
        timestamp = days[sent.getDay()]
    } else {
        timestamp = sent.toDateString();
    }

    return timestamp
}

function getMsgDay(inputTimestamp) {
    if (!(inputTimestamp instanceof Timestamp) && !(inputTimestamp instanceof Date)) {
        return "incorrect format";
    };

    let sent;

    if (inputTimestamp instanceof Timestamp) {
        sent = inputTimestamp.toDate();
    } else {
        sent = inputTimestamp;
    };

    return sent.getDay()
}

function getMsgTime(inputTimestamp) {
    if (!(inputTimestamp instanceof Timestamp) && !(inputTimestamp instanceof Date)) {
        return "incorrect format";
    };

    let sent;

    if (inputTimestamp instanceof Timestamp) {
        sent = inputTimestamp.toDate();
    } else {
        sent = inputTimestamp;
    };

    return sent.toTimeString().slice(0,5)
}

export {getDayFromInt, getTimestamp, getMsgTime};