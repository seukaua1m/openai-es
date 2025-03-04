class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }

    async sendMessage(req, res) {
        try {
            const { message } = req.body;
            console.log('Received message:', message);
            const response = await this.chatService.fetchResponse(message);
            console.log('Response from ChatGPT:', response);
            res.status(200).json({ response });
        } catch (error) {
            console.error('Error in sendMessage:', error);
            res.status(500).json({ error: 'An error occurred while sending the message.' });
        }
    }
}

module.exports = ChatController;