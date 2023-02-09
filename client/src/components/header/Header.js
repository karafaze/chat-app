import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

export default function Header({ inChat, socket }) {
    const navigate = useNavigate()
    const handleLeaveChat = () => {
        socket.disconnect()
        socket.off();
        navigate('/')
        window.location.reload();
    }
    if (inChat) {
        return (
            <nav className="navbar">
                <h2 className="navbar--title">CreativeApp</h2>
                <div 
                    className="navbar--btn"
                    onClick={handleLeaveChat}
                >
                    <button className="leavechat-btn">Leave Chat</button>
                    <i className="ri-arrow-go-back-line"></i>
                </div>
            </nav>
        );
    } else {
        return (
            <header>
                <nav className="navbar">
                    <h2 className="navbar--title">CreativeApp</h2>
                </nav>
            </header>
        );
    }

}
