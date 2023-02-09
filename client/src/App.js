import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import NotFound from "./pages/notfound/NotFound";

const socket = io.connect("http://localhost:3001");

export default function App() {

    const [user, setUser] = useState(null)
    useEffect(() => {
        socket.on('user_created', user => {
            setUser(user)
        })
        return () => {
            socket.removeListener('user_created')
            socket.disconnect()
            socket.off();
        }
    }, []) 

    return (
        <Routes>
            <Route 
                exact path="/" 
                element={<Login socket={socket} />}
            />
            <Route 
                path="/chat/:roomId/:userId" 
                element={<Chat socket={socket} user={user}/>}
            />
            <Route 
                path="/404"
                element={<NotFound />}
            />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}
