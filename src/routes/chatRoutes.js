const express = require('express');
const ChatController = require('../controllers/chatController');

const router = express.Router();

const setRoutes = (app, chatService) => {
    const chatController = new ChatController(chatService);
    app.use('/api/chat', router);
    router.post('/send', chatController.sendMessage.bind(chatController));
};

module.exports = { setRoutes };