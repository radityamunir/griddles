import React, { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'sets', 'grid', 'game'
  const [coins, setCoins] = useState(100);
  
  // Navigation states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);

  // Categories & Sets Data Structure
  const categories = [
    {
      id: 'movies',
      name: 'MOVIES & SERIES',
      emoji: '🎬',
      color: 'bg-candyPink',
      solved: 18,
      total: 30,
      sets: [
        { id: 1, name: 'Set 1: Blockbusters', solved: 9, total: 15 },
        { id: 2, name: 'Set 2: Cult Classics', solved: 9, total: 15 },
      ]
    },
    {
      id: 'people',
      name: 'FAMOUS PEOPLE',
      emoji: '🦸',
      color: 'bg-skyBlue',
      solved: 12,
      total: 30,
      sets: [
        { id: 1, name: 'Set 1: Icons & Legends', solved: 6, total: 15 },
        { id: 2, name: 'Set 2: Pop Culture Stars', solved: 6, total: 15 },
      ]
    },
    {
      id: 'cities',
      name: 'WORLD CITIES',
      emoji: '🏙️',
      color: 'bg-mintGreen',
      solved: 25,
      total: 30,
      sets: [
        { id: 1, name: 'Set 1: Global Capitals', solved: 13, total: 15 },
        { id: 2, name: 'Set 2: Iconic Skylines', solved: 12, total: 15 },
      ]
    },
  ];

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentScreen('sets');
  };

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    setCurrentScreen('grid');
  };

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
          
          {/* 1. HOME SCREEN: 3 Categories */}
          {currentScreen === 'home' && (
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <h2 className="text-center font-black text-xl mb-2 tracking-wide">CHOOSE A CATEGORY</h2>
              
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`w-full ${cat.color} border-4 border-ink p-4 rounded-2xl shadow-cartoon font-black text-left flex justify-between items-center transform hover:-translate-y-1 transition-transform`}
                >
                  <div>
                    <div className="text-2xl">{cat.emoji} {cat.name}</div>
                    <div className="text-xs opacity-90 font-bold mt-1">{cat.solved} / {cat.total} Solved</div>
                  </div>
                  <span className="text-2xl">➡️</span>
                </button>
              ))}
            </div>
          )}

          {/* 2. SET SELECTION SCREEN: Choose Set 1 or Set 2 */}
          {currentScreen === 'sets' && selectedCategory && (
            <div className="space-y-4 flex-1 flex flex-col">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-sm shadow-cartoon-sm"
              >
                ⬅️ Back to Categories
              </button>
              
              <div className="text-center my-2">
                <span className="text-3xl">{selectedCategory.emoji}</span>
                <h3 className="font-black text-xl mt-1">{selectedCategory.name}</h3>
                <p className="text-xs font-bold opacity-70">Select a Set to Play</p>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {selectedCategory.sets.map((set) => (
                  <button 
                    key={set.id}
                    onClick={() => handleSelectSet(set)}
                    className="w-full bg-white border-4 border-ink p-4 rounded-2xl shadow-cartoon font-black text-left flex justify-between items-center transform hover:-translate-y-1 transition-transform hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-lg">{set.name}</div>
                      <div className="text-xs text-slate-500 font-bold mt-1">Progress: {set.solved} / {set.total}</div>
                    </div>
                    <span className="text-2xl">🧩</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. 15-ICON SET GRID SCREEN */}
          {currentScreen === 'grid' && selectedSet && (
            <div className="space-y-4 flex-1 flex flex-col">
              <button 
                onClick={() => setCurrentScreen('sets')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-sm shadow-cartoon-sm"
              >
                ⬅️ Back to Sets
              </button>
              
              <div className="text-center">
                <h3 className="font-black text-lg">{selectedCategory.name}</h3>
                <p className="text-xs font-bold text-slate-600">{selectedSet.name}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-4">
                {Array.from({ length: 15 }).map((_, i) => {
                  const isSolved = i < 3; // Mocking first 3 solved
                  return (
                    <button 
                      key={i}
                      onClick={() => {
                        setSelectedPuzzle(i + 1);
                        setCurrentScreen('game');
                      }}
                      className={`aspect-square border-3 border-ink rounded-xl font-black flex flex-col items-center justify-center shadow-cartoon-sm transition-transform active:translate-x-1 active:translate-y-1 ${
                        isSolved ? 'bg-mintGreen' : 'bg-white hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-lg">{isSolved ? '✓' : `#${i + 1}`}</span>
                      <span className="text-[10px] opacity-70">{isSolved ? 'SOLVED' : 'LOCKED'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. GUESSER GAMEPLAY SCREEN */}
          {currentScreen === 'game' && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <button 
                onClick={() => setCurrentScreen('grid')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-sm shadow-cartoon-sm"
              >
                ⬅️ Back to Grid
              </button>

              {/* Artwork Frame */}
              <div className="bg-white border-4 border-ink rounded-3xl h-48 shadow-cartoon flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl animate-bounce">⚔️</div>
                <div className="absolute top-2 right-2 bg-electricYellow border-2 border-ink px-2 py-0.5 rounded-lg text-xs font-black">
                  #{selectedPuzzle}
                </div>
              </div>

              {/* Answer Boxes */}
              <div className="flex justify-center gap-1 flex-wrap">
                {['L', 'I', 'G', 'H', 'T', 'S', 'A', 'B', 'E', 'R'].map((char, idx) => (
                  <div key={idx} className="w-7 h-9 bg-white border-3 border-ink rounded-lg flex items-center justify-center font-black text-md shadow-cartoon-sm">
                    {char}
                  </div>
                ))}
              </div>

              {/* Paid Hint Bar */}
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-electricYellow border-2 border-ink py-2 rounded-xl font-bold text-xs shadow-cartoon-sm flex flex-col items-center active:translate-x-0.5 active:translate-y-0.5">
                  <span>💡 Clue</span>
                  <span className="text-[10px]">🪙20</span>
                </button>
                <button className="bg-skyBlue border-2 border-ink py-2 rounded-xl font-bold text-xs shadow-cartoon-sm flex flex-col items-center active:translate-x-0.5 active:translate-y-0.5">
                  <span>🔍 Pool</span>
                  <span className="text-[10px]">🪙15</span>
                </button>
                <button className="bg-candyPink border-2 border-ink py-2 rounded-xl font-bold text-xs shadow-cartoon-sm flex flex-col items-center active:translate-x-0.5 active:translate-y-0.5">
                  <span>✨ Reveal</span>
                  <span className="text-[10px]">🪙25</span>
                </button>
              </div>

              {/* Virtual QWERTY Keyboard */}
              <div className="bg-slate-200 border-3 border-ink p-2 rounded-2xl shadow-cartoon">
                <div className="grid grid-cols-7 gap-1 text-center font-black">
                  {['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'].map((letter) => (
                    <button key={letter} className="bg-white border-2 border-ink py-2 rounded-lg shadow-cartoon-sm text-sm active:translate-x-0.5 active:translate-y-0.5 hover:bg-slate-50">
                      {letter}
                    </button>
                  ))}
                  <button className="col-span-2 bg-candyPink text-white border-2 border-ink py-2 rounded-lg shadow-cartoon-sm text-xs active:translate-x-0.5 active:translate-y-0.5">
                    DEL ⌫
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}