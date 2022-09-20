import React from "react";
import Entry from "./components/Entry";
import useAuthStatus from "./libs/useAuthStatus";
const Writer = React.lazy(() => import("./components/Posts/Writer"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));
function App() {
    const { loggedIn } = useAuthStatus();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'feed' },
            loggedIn ? (React.createElement(React.Fragment, null,
                React.createElement(Writer, null),
                React.createElement(Posts, null))) : (React.createElement(React.Fragment, null,
                React.createElement(Entry, null))),
            React.createElement("br", null)),
        React.createElement("div", { className: 'sidebar' }, loggedIn && React.createElement(Sidebar, null))));
}
export default App;
