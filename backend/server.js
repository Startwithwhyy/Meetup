const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const authRouter = require('./routes/auth');
const meetingsRouter = require('./routes/meetings');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_ATLAS)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/meetings', meetingsRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'https://3d57c6a79d7873be2310178cbae72e23.loophole.site',
    methods: ["GET", "POST"],
  },
  transports: ["websocket"]
});

io.on("connection", (socket) => {
  // Emit user's socket ID to the client
  socket.emit("me", socket.id);

  console.log("Socket connected:", socket.id);
  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  // socket.on("sendEmoji", (emoji) => {
  //   socket.broadcast.emit("receiveEmoji", emoji);
  // });

  socket.on('sendReaction', (data) => {
    socket.broadcast.emit('receiveReaction', data);
  });
});

server.listen(5000, () => console.log("Server is running on port 5000"));
