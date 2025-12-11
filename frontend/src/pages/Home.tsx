
import  { useState } from 'react';
import { RoomModal } from '../components/RoomModel';
import { ChessKing } from 'lucide-react';

export type gameType = 'create'|"join"

export default function Home() {
  const [modalType, setModalType] = useState<gameType | null >(null); // 'create' or 'join'

  const openModal = (type :gameType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="flex  w-full items-center justify-center p-6">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 sm:text-8xl">
            <ChessKing/>  Checkmate <span className="text-blue-600 text-opacity-80">.</span>
            </h1>
            <p className="max-w-lg text-xl leading-relaxed text-slate-500 font-light">
              Experience <span className='font-semibold text-blue-600'>pure, distraction-free</span> chess. Connect instantly, 
              challenge friends, and elevate your game with a beautiful, 
              minimalist interface.
            </p>
          </div>
          
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-900/5 transform hover:shadow-2xl transition duration-300">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Ready to Play?
              </h2>
              <p className="mt-2 text-slate-500">
                Choose your option to start a game instantly.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => openModal('create')}
                className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                
                  Create New Room
              </button>

              {/* Join Room Button - Secondary Outline */}
              <button
                onClick={() => openModal('join')}
                className="group w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-center font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-200/50"
              >
               
                  Join Existing Room
              </button>
            </div>

            <div className="mt-10 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-400">
                Play now. <span className='font-semibold text-blue-600'>No sign-up or download needed.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {modalType && <RoomModal type={modalType} onClose={closeModal} />}
    </div>
  );
}

