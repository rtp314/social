import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase_config";
// returns boolean for logged in or not
export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [myID, setMyID] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
            setMyID(user.uid);
        }
        else {
            setLoggedIn(false);
        }
    });
    return { loggedIn, myID };
}
