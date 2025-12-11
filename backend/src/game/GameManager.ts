import { Game } from "./Game";
import { Player, role } from "../types/ChessType";
import { io } from "../index";

export class GameManager {
  private games: Game[] = [];
  private players: Player[] = [];

  createPlayer(socketId: string, role: role, roomId: string, username?: string) {
    return {
      id: socketId,
      roomId,
      username,
      role,
    };
  }

  joinRoom(socketId: string, roomId: string, username?: string) {
    let game = this.games.find((g) => g.roomId === roomId);

    if (!game) {
      // Create game for first player
      const player = this.createPlayer(socketId, "white", roomId, username);
      game = new Game(roomId, player);
      this.games.push(game);

      io.to(socketId).emit("waiting", { roomId });
      return;
    }

    if (game.player2) throw new Error("Room is full.");

    const player = this.createPlayer(socketId, "black", roomId, username);
    game.addPlayer(player);

    io.to(game.player1.id).emit("game_started", {you: game.player1, opponent: player} );
    io.to(player.id).emit("game_started",{you: player ,opponent: game.player1} );
  }

  makeMove(socketId: string, move: { from: string; to: string }) {
    const game = this.games.find(
      (g) => g.player1.id === socketId || g.player2?.id === socketId
    );

    if (!game) return;

     game.makeMove(socketId, move);
   
  }
}

export function generateRoomId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
