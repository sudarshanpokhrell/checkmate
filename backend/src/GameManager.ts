import { Chess } from "chess.js";
import { Socket } from "socket.io";



export class GameManager {
    private games: Game []
}


export class Game {
    public player1: string;
    public player2: string;
    private board: Chess;
    private moveCount: number;
    private startTime: Date


    constructor (player1: socket)

}