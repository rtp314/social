import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./firebase_config";

// returns boolean for logged in or not

export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user)=> {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    })
   
    return loggedIn
}