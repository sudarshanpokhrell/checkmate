import { Game } from "./Game";
import { Player, role } from "../types/ChessType";

export class GameManager {
  private games: Game[] = [];
  private players: Player[] = [];

  createPlayer(
    socketId: string,
    role: role,
    roomId?: string,
    username?: string
  ) {
    const player: Player = {
      id: socketId,
      roomId: roomId ?? generateRoomId(),
      username: username,
      role: role,
    };

    this.players.push(player);
    return player;
  }

  joinRoom(socketId: string, roomId: string, username?: string) {
    const existingGame = this.games.find((room) => room.roomId === roomId);

    if (existingGame) {
      if (existingGame.player2) {
        throw new Error("Room is full.");
      } else {
        const player = this.createPlayer(socketId, "black", roomId, username);

        existingGame.addPlayer(player);

        return { game: existingGame, player };
      }
    } else {
      const player = this.createPlayer(socketId, "white", roomId, username);

      const game = new Game(roomId, player);

      return { game, player };
    }
  }

  playerDisconnect(socketId:string){
    const player = this.players.find((player)=> player.id === socketId);

    if(!player) return;

    const game = this.games.find((game)=> game.player1.id === socketId || game.player2?.id === socketId)

    if(game?.state.status === "in_progress"){
        const winner = player.role === "white" ?"black":"white";
        //TODO: endGame with winner.
    }
  }

}

function generateRoomId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
