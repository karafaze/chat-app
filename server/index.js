const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const {addUser, getUser, getAllUsersInRoom, removeUser} = require('./users')

const app = express();
app.use(cors());

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} has connected.`)

    socket.on('user_creation_request', userData => {
        const {user, error} = addUser(userData)
        if (error){
            socket.emit('bad_credential', error)
        } else {
            socket.join(user.room)
            socket.emit('user_created', user)
            io.to(user.room).emit('room_detail', {users: getAllUsersInRoom(user.room)})
        }
    })

    socket.on('send_message', messageData => {
        io.to(messageData.room).emit('new_message', messageData)
    })

    socket.on('active_users', (room) => {
        const users = getAllUsersInRoom(room);
        io.to(room).emit('users_list', users)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user){
            const users = getAllUsersInRoom(user.room);
            io.to(user.room).emit('users_list', users)
            socket.leave(user.room)
        }
        console.log(`User ${socket.id} has disconnected.`)
    })
})

httpServer.listen(3001, () => {
    console.log('server running...')
})