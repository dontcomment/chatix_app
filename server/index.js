const express = require('express')
const app = express()
const PORT = 5000

const rooms = new Map()

const http = require('http').Server(app)

const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin:'http://localhost:3000'
    }

})


socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`)
    
    socket.on('ROOM:NEWLOGIN', ({room, user}) => {
        socket.join(room)
        if (!rooms.has(room)) {
            rooms.set(room, new Map([
                ['users', new Map()],
                ['messages', []]
            ]))
        }

        rooms.get(room).get('users').set(socket.id, user)
        const users = [...rooms.get(room).get('users').values()]
        socketIO.to(room).emit('ROOM:USER_UPDATE', users)
    })

    socket.on('ROOM:NEW_MESSAGE', ({room, user, text}) => {
        let hour = new Date().getHours()
        let min = new Date().getMinutes()
        let key = new Date()

        if (min < 10) {
            return min = '0' + min
        }
        
        
        const time = `${hour}:${min}`
        const obj = {
            user,
            text,
            time,
            key
        }
        rooms.get(room).get('messages').push(obj)
        socketIO.to(room).emit('ROOM:NEW_MESSAGE', obj)
    })
    
    
    socket.on('disconnect', () => {
        rooms.forEach((item, room) => {
            if (item.get('users').delete(socket.id)) {
                const users = [...rooms.get(room).get('users').values()]
                socketIO.to(room).emit('ROOM:USER_UPDATE', users)
            }
        })
    })

    
})

http.listen(PORT, () => {
    console.log('Serever working...')
})