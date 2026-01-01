import { Chess } from "chess.js";
import { Player } from "../types/ChessType";
import { io } from "../index";

export type GameState = {
  turn: "white" | "black";
  winner: Player | null;
  board: Chess;
  history: any[];
  status: "waiting" | "in_progress" | "ended";
};

export class Game {
  roomId: string;
  player1: Player;
  player2: Player | null = null;
  state: GameState;
  startTime: Date;

  constructor(roomId: string, player: Player) {
    this.roomId = roomId;
    this.player1 = player;

    this.state = {
      turn: "white",
      winner: null,
      board: new Chess(),
      history: [],
      status: "waiting",
    };

    this.startTime = new Date();
  }

  addPlayer(player: Player) {
    if (this.player2)  {
      io.to(player.id).emit("error", {message: "Room is full."})
    }
    this.player2 = player;
    this.state.status = "in_progress";
  }

  makeMove(playerId: string, move: { from: string; to: string }) {
    const fromPlayer =
      this.player1.id === playerId ? this.player1 : this.player2;

    if (!fromPlayer) {
      io.to(playerId).emit("error", { message: "Invalid Move" });
      return;
    }

    if (fromPlayer.role !== this.state.turn) {
      io.to(playerId).emit("error", {message: "Not your move."})
    }

    try {
      this.state.board.move(move);
    } catch (error) {
      io.to(playerId).emit("error", { message: "Invalid Move" });
    }

    if (this.state.board.isGameOver()) {
      io.to(this.player1.id).emit("game_over", {
        winner: this.state.board.turn() === "w" ? "Black" : "White",
      });
      io.to(this.player1.id).emit("game_over", {
        winner: this.state.board.turn() === "w" ? "Black" : "White",
      });
      return;
    }

    if (this.state.turn === "white" && this.player2) {
      io.to(this.player2.id).emit("move_made", move);
    }

    if (this.state.turn === "black") {
      io.to(this.player1.id).emit("move_made", move);
    }

    this.state.turn = this.state.turn === "black" ? "white" : "black";
    return;
  }
}
