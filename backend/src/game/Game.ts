import { Chess } from "chess.js";
import { Player } from "../types/ChessType";

export type GameState= {
    turn: "white" |"black";
    winner: Player| null;
    board: Chess;
    history: any[];
    status: "waiting"| "in_progress" | "ended"
}


export class Game {
    roomId: string;
    player1: Player;
    player2: Player | null = null;
    state: GameState;
    startTime: Date;

    constructor(roomId:string ,player:Player){

        this.roomId = roomId;

        this.player1 = player;

        this.state = {
            turn: "white",
            winner: null,
            board: new Chess(),
            history: [],
            status: "waiting"
        }
        this.startTime = new Date();

    }

    addPlayer (player: Player){
        if(this.player2) throw new Error ("Room is Full.");
        this.player2 = player;

        this.state.status = "in_progress";
    }
}


