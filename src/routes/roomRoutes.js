const express = require('express');
const { createRoom, getRooms, joinRoom } = require('../controllers/roomController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/rooms', protect, createRoom);
router.get('/rooms', protect, getRooms);
router.post('/rooms/join', protect, joinRoom);

module.exports = router;
