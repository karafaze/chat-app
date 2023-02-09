import React from "react";
import { nanoid } from "nanoid";
import Message from "../message/Message";
import './chatcontent.css';

export default function ChatContent({ messageList, user }) {
    const displayMessage = messageList.map((message) => {
        if (message) {
            if (message.author === user.username) {
                return (
                    <div key={nanoid()} className="message__container align-to-end">
                        <Message isSender={true} message={message}/>
                    </div>
                );
            } else {
                return (
                    <div key={nanoid()} className="message__container">
                        <Message isSender={false} message={message}/>
                    </div>
                );
            }
        } else {
            return null;
        }
    });
    return displayMessage;
}