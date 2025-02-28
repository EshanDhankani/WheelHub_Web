

const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { auth } = require('../middleware/auth'); // Assuming you have an authentication middleware

const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/:userId/messages', auth, getMessages);

module.exports = router;
