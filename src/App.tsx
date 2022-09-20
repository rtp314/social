import React from "react";
import Entry from "./components/Entry";
import useAuthStatus from "./libs/useAuthStatus";

const Writer = React.lazy(() => import("./components/Posts/Writer"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));

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
