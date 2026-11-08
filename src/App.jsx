import React, { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'sets', 'grid', 'game'
  const [coins, setCoins] = useState(100);
  
  // Navigation & Game states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [activePuzzle, setActivePuzzle] = useState(null);
  
  // Track solved puzzles (e.g., {"movies-set1-1": true, ...})
  const [solvedPuzzles, setSolvedPuzzles] = useState({});
  
  // Gameplay input states
  const [currentGuesses, setCurrentGuesses] = useState({});
  const [showWinModal, setShowWinModal] = useState(false);
  const [activeFunFact, setActiveFunFact] = useState(null);

  // Categories, Sets & Beta Puzzles Data Structure (Ready for your custom data & fun facts!)
  const categories = [
    {
      id: 'people',
      name: 'FAMOUS PEOPLE',
      emoji: '🦸',
      color: 'bg-skyBlue',
      sets: [
        {
          id: 1,
          name: 'Set 1: Icons & Legends',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: i === 0 ? "EINSTEIN" : `ICON${i + 1}`,
            clue: i === 0 ? "Theoretical physicist with wild hair." : `Famous historical figure #${i + 1}`,
            funFact: i === 0 ? "Albert Einstein failed his university entrance exam on his first try in 1895!" : `Fun fact about icon #${i + 1} goes here!`,
            art: "⚡🧠"
          }))
        },
        {
          id: 2,
          name: 'Set 2: Pop Culture Stars',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: `STAR${i + 1}`,
            clue: `Pop culture superstar #${i + 1}`,
            funFact: `Fun fact about star #${i + 1} goes here!`,
            art: "🌟🎬"
          }))
        }
      ]
    },
    {
      id: 'movies',
      name: 'MOVIES & SERIES',
      emoji: '🎬',
      color: 'bg-candyPink',
      sets: [
        {
          id: 1,
          name: 'Set 1: Blockbusters',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: `MOVIE${i + 1}`,
            clue: `Blockbuster hit #${i + 1}`,
            funFact: `Fun fact about movie #${i + 1} goes here!`,
            art: "🍿🎥"
          }))
        },
        {
          id: 2,
          name: 'Set 2: Cult Classics',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: `CLASSIC${i + 1}`,
            clue: `Cult classic #${i + 1}`,
            funFact: `Fun fact about classic #${i + 1} goes here!`,
            art: "📼✨"
          }))
        }
      ]
    },
    {
      id: 'cities',
      name: 'WORLD CITIES',
      emoji: '🏙️',
      color: 'bg-mintGreen',
      sets: [
        {
          id: 1,
          name: 'Set 1: Global Capitals',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: `CITY${i + 1}`,
            clue: `Global capital #${i + 1}`,
            funFact: `Fun fact about city #${i + 1} goes here!`,
            art: "🌆🗺️"
          }))
        },
        {
          id: 2,
          name: 'Set 2: Iconic Skylines',
          puzzles: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            answer: `SKYLINE${i + 1}`,
            clue: `Iconic skyline city #${i + 1}`,
            funFact: `Fun fact about skyline #${i + 1} goes here!`,
            art: "🌉🏙️"
          }))
        }
      ]
    },
  ];

  // Helper key for solved mapping
  const getPuzzleKey = (catId, setId, puzzleId) => `${catId}-${setId}-${puzzleId}`;

  // Handle typing letters
  const handleKeyPress = (letter) => {
    if (!activePuzzle) return;
    const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
    const currentWord = currentGuesses[key] || "";
    
    if (currentWord.length < activePuzzle.answer.length) {
      const updatedWord = currentWord + letter;
      const newGuesses = { ...currentGuesses, [key]: updatedWord };
      setCurrentGuesses(newGuesses);

      // Check if word is complete and correct
      if (updatedWord === activePuzzle.answer) {
        setSolvedPuzzles(prev => ({ ...prev, [key]: true }));
        setCoins(prev => prev + 10); // Reward coins
        setShowWinModal(true);
      }
    }
  };

  // Handle delete letter
  const handleDelete = () => {
    if (!activePuzzle) return;
    const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
    const currentWord = currentGuesses[key] || "";
    if (currentWord.length > 0) {
      setCurrentGuesses({
        ...currentGuesses,
        [key]: currentWord.slice(0, -1)
      });
    }
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
        <div className="flex-1 overflow-y-auto p-4 flex flex-col relative">
          
          {/* 1. HOME SCREEN: 3 Categories */}
          {currentScreen === 'home' && (
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <h2 className="text-center font-black text-xl mb-2 tracking-wide">CHOOSE A CATEGORY</h2>
              
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setCurrentScreen('sets'); }}
                  className={`w-full ${cat.color} border-4 border-ink p-4 rounded-2xl shadow-cartoon font-black text-left flex justify-between items-center transform hover:-translate-y-1 transition-transform`}
                >
                  <div>
                    <div className="text-2xl">{cat.emoji} {cat.name}</div>
                    <div className="text-xs opacity-90 font-bold mt-1">Beta Beta Ready (2 Sets)</div>
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
                    onClick={() => { setSelectedSet(set); setCurrentScreen('grid'); }}
                    className="w-full bg-white border-4 border-ink p-4 rounded-2xl shadow-cartoon font-black text-left flex justify-between items-center transform hover:-translate-y-1 transition-transform hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-lg">{set.name}</div>
                      <div className="text-xs text-slate-500 font-bold mt-1">15 Puzzles Available</div>
                    </div>
                    <span className="text-2xl">🧩</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. 15-ICON SET GRID SCREEN (Shows Fun Fact Badge when solved) */}
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
                {selectedSet.puzzles.map((puzzle) => {
                  const key = getPuzzleKey(selectedCategory.id, selectedSet.id, puzzle.id);
                  const isSolved = solvedPuzzles[key];

                  return (
                    <button 
                      key={puzzle.id}
                      onClick={() => {
                        setActivePuzzle(puzzle);
                        setCurrentScreen('game');
                      }}
                      className={`aspect-square border-3 border-ink rounded-xl font-black flex flex-col items-center justify-center shadow-cartoon-sm transition-transform active:translate-x-1 active:translate-y-1 ${
                        isSolved ? 'bg-mintGreen' : 'bg-white hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-lg">{isSolved ? '✓' : `#${puzzle.id}`}</span>
                      <span className="text-[10px] opacity-70">{isSolved ? 'SOLVED' : 'LOCKED'}</span>
                      {isSolved && <span className="text-[9px] bg-white border border-ink px-1 rounded mt-0.5">💡 Fact</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. GUESSER GAMEPLAY SCREEN */}
          {currentScreen === 'game' && activePuzzle && (
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setCurrentScreen('grid')}
                  className="bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-sm shadow-cartoon-sm"
                >
                  ⬅️ Back to Grid
                </button>
                <span className="font-black text-xs bg-electricYellow border-2 border-ink px-2 py-1 rounded-lg">
                  PUZZLE #{activePuzzle.id}
                </span>
              </div>

              {/* Artwork Frame */}
              <div className="bg-white border-4 border-ink rounded-3xl h-40 shadow-cartoon flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl">{activePuzzle.art}</div>
              </div>

              {/* Clue Text */}
              <div className="bg-amber-100 border-2 border-ink p-2 rounded-xl text-center text-xs font-bold shadow-cartoon-sm">
                💡 Clue: {activePuzzle.clue}
              </div>

              {/* Answer Boxes */}
              <div className="flex justify-center gap-1 flex-wrap">
                {activePuzzle.answer.split('').map((_, idx) => {
                  const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
                  const currentWord = currentGuesses[key] || "";
                  const char = currentWord[idx] || "";
                  return (
                    <div key={idx} className="w-7 h-9 bg-white border-3 border-ink rounded-lg flex items-center justify-center font-black text-md shadow-cartoon-sm">
                      {char}
                    </div>
                  );
                })}
              </div>

              {/* Virtual QWERTY Keyboard */}
              <div className="bg-slate-200 border-3 border-ink p-2 rounded-2xl shadow-cartoon">
                <div className="grid grid-cols-7 gap-1 text-center font-black">
                  {['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'].map((letter) => (
                    <button 
                      key={letter} 
                      onClick={() => handleKeyPress(letter)}
                      className="bg-white border-2 border-ink py-2 rounded-lg shadow-cartoon-sm text-sm active:translate-x-0.5 active:translate-y-0.5 hover:bg-slate-50"
                    >
                      {letter}
                    </button>
                  ))}
                  <button 
                    onClick={handleDelete}
                    className="col-span-2 bg-candyPink text-white border-2 border-ink py-2 rounded-lg shadow-cartoon-sm text-xs active:translate-x-0.5 active:translate-y-0.5"
                  >
                    DEL ⌫
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WIN & FUN FACT MODAL */}
          {showWinModal && activePuzzle && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-paper border-4 border-ink p-6 rounded-3xl shadow-cartoon w-full max-w-xs space-y-4 text-center animate-bounce-once">
                <div className="text-4xl">🎉</div>
                <h3 className="font-black text-xl">CORRECT!</h3>
                <p className="font-bold text-sm text-slate-700">You solved <span className="underline">{activePuzzle.answer}</span>!</p>
                
                {/* Fun Fact Card */}
                <div className="bg-amber-100 border-3 border-ink p-3 rounded-2xl shadow-cartoon-sm text-left">
                  <div className="font-black text-xs text-amber-800 mb-1">🧠 FUN FACT:</div>
                  <p className="text-xs font-bold leading-relaxed">{activePuzzle.funFact}</p>
                </div>

                <div className="text-xs font-black text-emerald-600">+10 Coins Earned! 🪙</div>

                <button 
                  onClick={() => {
                    setShowWinModal(false);
                    setCurrentScreen('grid');
                  }}
                  className="w-full bg-electricYellow border-3 border-ink py-3 rounded-xl font-black text-sm shadow-cartoon active:translate-x-0.5 active:translate-y-0.5"
                >
                  CONTINUE ➡️
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}