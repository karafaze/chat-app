import React from "react";
import "./message.css";

export default function Message({ isSender, message }) {
    if (isSender) {
        return (
            <React.Fragment>
                <div className="message__content user--message__content">
                    <p>{message.content}</p>
                    <span className="user--timestamp">at {message.timestamp}</span>
                </div>
                <div className="message__username user--message__username">you</div>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <div className="message__username">{message.author}</div>
                <div className="message__content">
                    <p>{message.content}</p>
                    <span>at {message.timestamp}</span>
                </div>
            </React.Fragment>
        );
    }
}