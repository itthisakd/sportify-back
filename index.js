require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const errorMiddleware = require("./middlewares/error");
const accountRoutes = require("./routes/accountRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sportRoutes = require("./routes/sportRoutes");
const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const messageRoutes = require("./routes/messageRoutes");

//––––––––––––––––––––––––––– Setup Cross Origin / Middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//––––––––––––––––––––––––––– Routes
app.use("/account", accountRoutes);
app.use("/match", matchRoutes);
app.use("/sport", sportRoutes);
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/message", messageRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});
app.use(errorMiddleware);

//––––––––––––––––––––––––––– Running Server
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
// const { sequelize } = require("./models");
// sequelize.sync({ alter: true }).then(() => console.log("DB Sync"));

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["token"],
    credentials: true,
  },
});
const jwt = require("jsonwebtoken");

io.on("connection", (socket) => {

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log("JOINED ROOM " + roomId);
  });

  socket.on("sendChatMessage", (msg) => {
    console.log("MESSAGE RECEIVED IN BACK", msg);
    console.log("ROOM", [msg.toId, msg.fromId].sort((a, b) => a - b).join("-"));

    socket.broadcast
      .to([msg.toId, msg.fromId].sort((a, b) => a - b).join("-"))
      .emit("sendChatMessageBack", msg);
    console.log("AFTER EMIT")
  });

  socket.on("disconnect", () => {
    console.log("WS DISCONNECTED")
  });
});

// io.use(async (socket, next) => {
//   try {
//     const token = socket.handshake.query.token;
//     const payload = await jwt.verify(token, process.env.SECRET_KEY);
//     socket.userId = payload.id;
//     socket.username = payload.username;
//     socket.profile_url = payload.profile_url;
//     socket.role = payload.role;
//     next();
//   } catch (err) {}
// });
