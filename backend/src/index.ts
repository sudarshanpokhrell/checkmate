import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { GameManager } from "./game/GameManager";

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const gameManager = new GameManager();

io.on("connection", (socket) => {
  console.log("Player Connected: ", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    gameManager.joinRoom(socket.id, roomId, username);
    console.log("Joining room", roomId)
  });

  socket.on("make-move", ({ from, to }) => {
    gameManager.makeMove(socket.id, { from, to });
  });
  
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
