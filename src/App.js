import React from "react";
import { Link } from "react-router-dom";
import Posts from "./components/Posts";
import Sidebar from "./components/Sidebar";
import Writer from "./components/Writer";
import useAuthStatus from "./libs/useAuthStatus";

function App() {
	const [loggedIn, myID] = useAuthStatus();

	return (
			<>
				<div className="feed">
					{loggedIn ? 
						<>
							<Writer/>
							<Posts />
						</> 
						: 
						<>
							<p>Content will be loaded here when logged in</p>
							<Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link>
						</>
					}
					<br/>
					{/* {loggedIn && JSON.stringify(auth)} */}
				</div>
				
				<div className="sidebar">
					{loggedIn && <Sidebar/>}
				</div>
			</>
    );
}

export default App;