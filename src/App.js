import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Chat from "./components/Chat";
import Post from "./components/Post";
import { auth } from "./libs/firebase_config";
import useAuthStatus from "./libs/useAuth";

function App() {
  const loggedIn = useAuthStatus();

  function handleSignOut() {
    signOut(auth)
      .then(()=>{
        console.log("signed out")
      });

  }

  return (
    <>
      <div className="wrapper-center">
        <div className="feed">
          {loggedIn ? <Post /> : <><p>Content will be loaded here when logged in</p><Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link></>}
          <br/>
          <Outlet />
          {/* {loggedIn && JSON.stringify(auth)} */}
        </div>
        <div className="sidebar">
          <button onClick={handleSignOut} type="button">Sign Out</button>
          <Chat/>
        </div>
      </div>
    </>
    
  );
}

export default App;
