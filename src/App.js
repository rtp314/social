import React from "react";
import { Link, Outlet } from "react-router-dom";
import Posts from "./components/Posts";
import Sidebar from "./components/Sidebar";
import Writer from "./components/Writer";
import useAuthStatus from "./libs/useAuthStatus";
import { UserContextProvider } from "./libs/UserContext";

function App() {
	const [loggedIn, myID] = useAuthStatus();

	return (
		<UserContextProvider>
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
					{loggedIn && <Sidebar/>}
				</div>
			</div>
		</UserContextProvider>
    );
}

export default App;
