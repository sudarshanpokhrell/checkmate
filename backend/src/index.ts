import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { GameManager } from "./game/GameManager";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const gameManager = new GameManager();

io.on("connection", (socket) => {
  console.log("Player Connected: ", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    const {to, message } = gameManager.joinRoom(socket.id, roomId, username);

    to?.forEach(socketId => {
        io.to(socketId).emit(message);
    });



});

  socket.on("make-move", ({ from, to }) => {});
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
