const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const { Readable } = require('stream');
const { Server } = require('socket.io');

// Import configs
const connectDB = require('./config/db');
const { initEmail } = require('./config/email');
const chatSocket = require('./sockets/chatSocket');
const callSocket = require('./sockets/callSocket');

// Routes
const messageRoutes = require('./routes/messageRoutes');
const fileRoutes = require('./routes/fileRoutes');
const callRoutes = require('./routes/callRoutes');

dotenv.config();
const app = express();
const server = http.createServer(app);
const upload = multer();

app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Initialize Email transporter
initEmail();

// Setup Socket.io
const io = new Server(server, { cors: { origin: '*' } });
chatSocket(io);
callSocket(io);

// Routes
app.use('/messages', messageRoutes);
app.use('/files', fileRoutes(upload));
app.use('/api/calls', callRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Welcome to the chat & file upload server");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
