import React from "react";
import Entry from "./components/Entry";
import Posts from "./components/Posts";
import Sidebar from "./components/Sidebar";
import Writer from "./components/Writer";
import useAuthStatus from "./libs/useAuthStatus";

function App() {
	const { loggedIn } = useAuthStatus();

	return (
		<>
			<div className='feed'>
				{loggedIn ? (
					<>
						<Writer />
						<Posts />
					</>
				) : (
					<>
						<Entry />
					</>
				)}
				<br />
			</div>

			<div className='sidebar'>{loggedIn && <Sidebar />}</div>
		</>
	);
}

export default App;
