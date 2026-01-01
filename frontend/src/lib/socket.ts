// lib/socket.ts
import { io } from "socket.io-client"

export const socket = io("http://localhost:3000", {
  autoConnect: false,
})

let connected = false

export const connectSocket = () => {
  if (!connected) {
    socket.connect()
    connected = true
  }
}
