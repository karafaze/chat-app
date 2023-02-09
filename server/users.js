const users = [];

exports.addUser = ({username, room, id}) => {
    const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase())
    if (existingUser){
        return {error : 'This username is taken.'}
    }
    const user = {
        username: username,
        id: id,
        room: room,
    }
    users.push(user)
    return {user}
}

exports.getUser = (username) => {
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase())
    if (typeof user !== 'undefined'){
        return {user}
    } else {
        return { error: 'This user is not registered here.' }
    }
}

exports.getAllUsersInRoom = (room) => {
    return users.filter(user => user.room === room)
}

exports.removeUser = (id) => {
    const userToDeleteIndex = users.findIndex(user => user.id === id)
    const user = users.splice(userToDeleteIndex, 1)
    return user[0]
}