import React, { useEffect } from "react";
export default function PostSkeleton() {
    useEffect(() => {
        const skeletons = Array.from(document.getElementsByClassName("skeleton-animate"));
        skeletons.forEach((item) => {
            item.style.width = Math.random() * 30 + 20 + "%";
            item.style.animation = `stretch ${Math.random() * 100 + 500}ms -${Math.random()}s infinite`;
        });
        return () => {
            skeletons.forEach((item) => (item.style.animation = "none"));
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'post' },
            React.createElement("div", { className: 'post-title' },
                React.createElement("span", { className: 'skeleton-text' }),
                React.createElement("span", { className: 'skeleton-text' })),
            React.createElement("div", { className: 'post-body' },
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null))),
        React.createElement("div", { className: 'post' },
            React.createElement("div", { className: 'post-title' },
                React.createElement("span", { className: 'skeleton-text' }),
                React.createElement("span", { className: 'skeleton-text' })),
            React.createElement("div", { className: 'post-body' },
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null))),
        React.createElement("div", { className: 'post' },
            React.createElement("div", { className: 'post-title' },
                React.createElement("span", { className: 'skeleton-text' }),
                React.createElement("span", { className: 'skeleton-text' })),
            React.createElement("div", { className: 'post-body' },
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null),
                React.createElement("span", { className: 'skeleton-text skeleton-animate' }),
                React.createElement("br", null)))));
}
