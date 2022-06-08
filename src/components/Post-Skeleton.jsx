import React, { useEffect } from "react";

export default function PostSkeleton() {

    useEffect(()=>{
        const skeletons = Array.from(document.getElementsByClassName("skeleton-animate"))
        skeletons.forEach(item => {
            item.style.width = (Math.random() * 30) + 20 + "%";
            item.style.animation = `stretch ${Math.random() * 100 + 500}ms -${Math.random()}s infinite`
        })
        return ()=> {
            skeletons.forEach(item => item.style.animation = "none")
        }
    },[])

    return (
        <>
            <div className="post">
                <div className="post-title">
                    <span className="skeleton-text"></span>  
                    <span className="skeleton-text"></span>
                </div>
                <div className="post-body">
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                </div>
            </div>
                <div className="post">
                <div className="post-title">
                    <span className="skeleton-text"></span>  
                    <span className="skeleton-text"></span>
                </div>
                <div className="post-body">
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                </div>
            </div>
                <div className="post">
                <div className="post-title">
                    <span className="skeleton-text"></span>  
                    <span className="skeleton-text"></span>
                </div>
                <div className="post-body">
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                    <span className="skeleton-text skeleton-animate"></span><br/>
                </div>
            </div>
        </>
    )
}