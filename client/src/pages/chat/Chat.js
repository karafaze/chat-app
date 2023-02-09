import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserList from "../../components/userlist/UserList";
import ChatInput from "../../components/chatinput/ChatInput";
import ChatContent from "../../components/chatcontent/ChatContent";

import "./chat.css";

export default function Chat({ socket, user }) {
    const { roomId } = useParams();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.emit("active_users", user.room);
        socket.on("users_list", (userList) => {
            setUsers(userList);
        });
        return () => {
            socket.removeListener("user_list")
        }
    }, [socket, users, user]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList])

    useEffect(() => {
        socket.on("new_message", (messageData) => {
            setMessageList((prevMessages) => [...prevMessages, messageData]);
        });
        return () => {
            socket.removeListener('new_message')
        }
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== "") {
            const messageData = {
                author: user.username,
                content: message,
                timestamp: `${new Date().getHours()}h${new Date().getMinutes()}`,
                room: user.room,
            };
            socket.emit("send_message", messageData);
            setMessage("");
        }
    };

    return (
        <React.Fragment>
            <Header inChat={true} socket={socket} />
            <main>
                <h1 className="chat--title">Room #{roomId.toUpperCase()}</h1>
                <div className="main--wrapper">
                    <section className="chat--users__wrapper">
                        <UserList users={users} />
                    </section>
                    <section className="chat--wrapper">
                        <div className="chat">
                            <ChatContent
                                messageList={messageList}
                                user={user}
                            />
                            <div ref={lastMessageRef}></div>
                        </div>
                        <form className="chat--input__wrapper">
                            <ChatInput
                                message={message}
                                setMessage={setMessage}
                                sendMessage={sendMessage}
                            />
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}
