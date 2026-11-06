import React, { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [coins, setCoins] = useState(100);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:py-6">
      <div className="w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-paper dot-grid border-4 border-ink shadow-2xl sm:rounded-3xl flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <div className="bg-electricYellow border-b-4 border-ink px-4 py-3 flex items-center justify-between shadow-cartoon-sm z-10">
          <h1 className="font-black tracking-wider text-xl transform -rotate-1">GRIDDLES</h1>
          <div className="bg-white border-2 border-ink px-3 py-1 rounded-full font-bold text-sm shadow-cartoon-sm flex items-center gap-1">
            <span>🪙</span> {coins}
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {currentScreen === 'home' && (
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <h2 className="text-center font-black text-xl mb-2">CHOOSE A CATEGORY</h2>
              
              <button 
                onClick={() => setCurrentScreen('grid')}
                className="w-full bg-candyPink border-4 border-ink p-4 rounded-2xl shadow-cartoon font-black text-left flex justify-between items-center transform hover:-translate-y-1 transition-transform"
              >
                <div>
                  <div className="text-2xl">🎬 MOVIES</div>
                  <div className="text-xs opacity-90 font-bold mt-1">18 / 30 Solved</div>
                </div>
                <span className="text-2xl">➡️</span>
              </button>
            </div>
          )}

          {currentScreen === 'grid' && (
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-sm shadow-cartoon-sm"
              >
                ⬅️ Back
              </button>
              <h3 className="font-black text-lg text-center">MOVIES - SET 1</h3>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => alert(`Clicked puzzle #${i + 1}`)}
                    className="aspect-square bg-white border-3 border-ink rounded-xl font-black flex flex-col items-center justify-center shadow-cartoon-sm hover:bg-slate-100"
                  >
                    <span className="text-lg">#{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}