import React from "react";
//@ts-ignore
import styles from "./UploadedImage.module.css";
export default function UploadedImage({ imgSrc, imgName, deleteImage }) {
    return (React.createElement("div", { className: styles.container },
        React.createElement("span", { className: styles.delete, onClick: () => deleteImage(imgName) }, "Delete"),
        React.createElement("img", { className: styles.image, src: imgSrc })));
}
