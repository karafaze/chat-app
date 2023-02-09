import React from "react";
import "./chatinput.css";

export default function ChatInput({message, setMessage, sendMessage}) {
    return (
        <React.Fragment>
            <input
                className="chat--input"
                placeholder="Start typing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="chat--input__btnwrapper">
                <button
                    onClick={sendMessage}
                    type="submit"
                    className="chat--input__btn"
                >
                    Send
                </button>
                <i className="ri-send-plane-line"></i>
            </div>
        </React.Fragment>
    );
}
