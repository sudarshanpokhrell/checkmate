import {Server} from "socket.io"
import { createServer } from "http";
import express from "express"


const app = express();
const server = createServer(app)
const io = new Server(server)

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})


io.on("connection",(socket)=>{
    console.log("Player Connected: ", socket.id)

    socket.on("join-room", ({roomId, username })=>{
        console.log("Joining room.", username ,"in" ,roomId)


        io.to(socket.id).emit("You are joining in ", roomId)
    })
   
} )



server.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})



