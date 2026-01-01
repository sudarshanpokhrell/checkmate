import { useCallback, useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import { Chess } from "chess.js";
import { connectSocket, socket } from "../lib/socket";

const Game = () => {
  const [chess, setChess] = useState(() => new Chess());
  const [board, setBoard] = useState(chess.board());
  const [status, setStatus] = useState<"waiting" | "in_progress" | "ended">(
    "waiting"
  );
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {

    connectSocket();

    const onConnect = ()=>{
      console.log("Player Connected", socket.id)
      socket.emit("join-room", { roomId: 12345, username: "algoristotle" })

    }
    

    const onGameStart = () => {
      setStatus("in_progress");
    };

    const onMoveMade = (move: any) => {
      chess.move(move);
      setBoard(chess.board);

      console.log("Move made");
    };

    const onGameOver = ({ winner }: { winner: string }) => {
      setStatus("ended");
      setWinner(winner);
    };

    const onError = ({ message }: { message: string }) => {
      alert(message);
    };
    socket.on("connect", onConnect)
    socket.on("game_start", onGameStart);
    socket.on("move_made", onMoveMade);
    socket.on("game_over", onGameOver);
    socket.on("error", onError);

    return () => {
      socket.off("game-start", onGameStart);
      socket.off("move-made", onMoveMade);
      socket.off("game-over", onGameOver);
      socket.off("error", onError);
    };
  }, []);

  const handleMove = useCallback(
    (move: { from: string; to: string }) => {
      if (status !== "in_progress") return;

      socket.emit("make-move", move);
    },
    [status]
  );

  if (status === "waiting") {
    return <div>Waiting for opponent.</div>;
  }

  if (status === "ended") {
    return (
      <div>
        <h1>Game Over</h1>
        <p>Winner: {winner}</p>
      </div>
    );
  }

  return (
    <div>
      <ChessBoard board={board} onMove={handleMove} />
    </div>
  );
};

export default Game;
