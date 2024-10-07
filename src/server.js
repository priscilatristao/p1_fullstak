const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const roomRoutes = require('./routes/roomRoutes');

connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', roomRoutes);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('message', 'A user has joined the room');
    });

    socket.on('disconnect', () => {
        console.log('User has left');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

