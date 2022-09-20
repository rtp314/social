var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../libs/firebase_config";
export default function ChatWriter({ chatID }) {
    const [newMsg, setNewMsg] = useState("");
    function handleMessage(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const msg = newMsg;
            setNewMsg("");
            yield addDoc(collection(db, "chats", chatID, "messages"), {
                date: Timestamp.now(),
                msg: msg,
                uid: (_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid,
            });
        });
    }
    return (React.createElement("div", { className: 'chat-writer' },
        React.createElement("form", { onSubmit: handleMessage },
            React.createElement("input", { type: 'text', value: newMsg, onChange: (e) => setNewMsg(e.target.value), placeholder: 'Type your message here' }),
            React.createElement("button", { className: 'button primary', type: 'submit' }, "Send"))));
}
