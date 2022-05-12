import React from "react";
import { Link, Outlet } from "react-router-dom";
import Chat from "./components/Chat";
import Posts from "./components/Posts";
import Writer from "./components/Writer";
import useAuthStatus from "./libs/useAuthStatus";

function App() {
	const loggedIn = useAuthStatus();

	return (
		<>
			<div className="wrapper-center">
				<div className="feed">
					{loggedIn ? 
						<>
							<Writer/><Posts />
						</> 
						: 
						<>
							<p>Content will be loaded here when logged in</p>
							<Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link>
						</>
					}
					<br/>
					<Outlet />
					{/* {loggedIn && JSON.stringify(auth)} */}
				</div>
				
				<div className="sidebar">
					{loggedIn && <Chat/>}
				</div>
			</div>
		</>
    );
}

export default App;
