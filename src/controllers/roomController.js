const Room = require('../models/RoomModel');

const createRoom = async (req, res) => {
    const { name, description, capacity } = req.body;

    const room = await Room.create({
        name,
        description,
        capacity,
    });

    res.status(201).json(room);
};

const getRooms = async (req, res) => {
    const rooms = await Room.find({ isActive: true });
    res.json(rooms);
};

const joinRoom = async (req, res) => {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);

    if (room) {
        res.json({ message: `Joined room: ${room.name}` });
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
};

module.exports = { createRoom, getRooms, joinRoom };
