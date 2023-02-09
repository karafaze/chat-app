import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import "./login.css";

export default function Login({socket}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if ((username !== "") & (room !== "")) {
            const userData = { username, room, id:socket.id };
            socket.emit("user_creation_request", userData);
        }
        socket.on('user_created', user => {
            navigate(`/chat/${user.room}/${user.id}`)
        })
        socket.on('bad_credential', error => {
            console.log(error)
        })
    }

    return (
        <React.Fragment>
            <Header inChat={false}/>
            <main>
                <h1 className="login--title">
                    Register now and start chatting !
                </h1>
                <section className="loginform__container">
                    <form className="loginform">
                        <div className="loginform--input__container">
                            <label htmlFor="username">
                                <i className="ri-user-fill"></i>
                            </label>
                            <input
                                value={username}
                                name="username"
                                onChange={(e) => setUsername(e.target.value.trim())}
                                className="loginform--input"
                                placeholder="Username..."
                            />
                        </div>
                        {/* {formError && <span>{formError}</span>} */}
                        <div className="loginform--input__container">
                            <label htmlFor="room">
                                <i className="ri-wechat-line"></i>
                            </label>
                            <input
                                value={room}
                                name="room"
                                onChange={(e) =>
                                    setRoom(e.target.value.trim().toLowerCase())
                                }
                                className="loginform--input"
                                placeholder="Chat room..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="loginform--btn"
                            onClick={handleSubmit}
                        >
                            Join the chat
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
