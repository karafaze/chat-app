import React from "react";
import { nanoid } from "nanoid";
import "./userlist.css";

export default function UserList({ users }) {
    const usersInChat = users.map((user) => {
        return (
            <div key={nanoid()} className="chat--users__single">
                <i className="ri-user-voice-fill"></i>
                <span>{user.username}</span>
            </div>
        );
    });

    return (
        <React.Fragment>
            <div className="chat--users__title">
                <h2>In chat</h2>
            </div>
            <div className="chat--users__list">{usersInChat}</div>
        </React.Fragment>
    );
}