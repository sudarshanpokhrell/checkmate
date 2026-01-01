import { Copy } from 'lucide-react';
import  { useEffect, useState } from 'react';
import type { gameType } from '../pages/Home';
import { useNavigate } from "react-router-dom";

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function RoomModal({ type, onClose }: { type: gameType; onClose: () => void }) {
  const isCreate = type === 'create';
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    if (isCreate) setRoomCode(generateRoomCode());
  }, [isCreate]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-900">
            {isCreate ? 'Create Your Room' : 'Join a Room'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-50"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isCreate ? (
          <div className="space-y-4">
          
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={roomCode}
                readOnly
                className="flex-1 rounded-xl border border-slate-200 p-3 bg-slate-50 text-slate-700"
              />
              <button
                onClick={copyCode}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                <Copy/>
              </button>
            </div>
            <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 shadow-md active:scale-[0.99]" onClick={()=> navigate("/game")}>
              Start Game
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Room Code (e.g., 'ABCD-1234')"
              className="w-full rounded-xl border border-slate-200 p-3 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 shadow-md active:scale-[0.99]" onClick={()=> navigate("/game")}>
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}