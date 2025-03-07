const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { setRoutes } = require('./routes/chatRoutes');
const ChatService = require('./services/chatService');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'https://br.finflow.shop',
    'https://es.finflow.shop',
    'https://en.finflow.shop'
];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite a requisição
        } else {
            callback(new Error('Not allowed by CORS')); // Bloqueia requisições não permitidas
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

const chatService = new ChatService(
    process.env.CHATGPT_API_KEY,  
    process.env.OPENAI_ASSISTANT_ID  
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setRoutes(app, chatService);  // Agora passa o chatService corretamente

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
