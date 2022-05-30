import React, { useContext } from "react";
import { UserContext } from "../libs/UserContext";

export default function User() {
    const myData = useContext(UserContext)

    return (
        <div className="feed">
            {JSON.stringify(myData)}<br/>
            Add Friend<br/>
            Delete my Account
        </div>
    )
}