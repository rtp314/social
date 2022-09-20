import React from "react";
import "../styles/user.css";
export default function User() {
    return (React.createElement("div", { id: 'user', className: 'feed' },
        React.createElement("div", { className: 'settings-sidebar' },
            React.createElement("ul", null,
                React.createElement("li", null, "Account"),
                React.createElement("li", null, "Personal Data"),
                React.createElement("li", null, "Other"))),
        React.createElement(Account, null)));
}
function Account() {
    return (React.createElement("div", { className: 'settings-main' },
        React.createElement("h2", null, "Account Settings"),
        React.createElement("ul", null,
            React.createElement("li", null, "Name"),
            React.createElement("li", null, "Email"),
            React.createElement("li", null, "Password"))));
}
