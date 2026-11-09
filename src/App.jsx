import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'sets', 'grid', 'game'
  const [coins, setCoins] = useState(100);
  
  // Navigation & Game states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [activePuzzle, setActivePuzzle] = useState(null);
  
  // Track solved puzzles
  const [solvedPuzzles, setSolvedPuzzles] = useState({});
  
  // Gameplay input states
  const [currentGuesses, setCurrentGuesses] = useState({});
  const [showWinModal, setShowWinModal] = useState(false);
  
  // Ref to automatically focus hidden input for physical/mobile keyboard
  const inputRef = useRef(null);

  // Auto-focus the hidden input when entering the game screen
  useEffect(() => {
    if (currentScreen === 'game' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentScreen, activePuzzle]);

  // Data containing your Movies & Series Set 1 lineup
  const categories = [
    {
      id: 'movies',
      name: 'MOVIES & SERIES',
      emoji: '🎬',
      color: 'bg-candyPink',
      sets: [
        {
          id: 1,
          name: 'Set 1: Blockbusters & Icons',
          puzzles: [
            { id: 1, answer: "FANTASTIC FOUR", clue: "Marvel's premier superhero family.", funFact: "Stan Lee and Jack Kirby created them in 1961 to rival DC's Justice League.", image: "/images/movies/set1/1.png" },
            { id: 2, answer: "INTERSTELLAR", clue: "Christopher Nolan's space-time bending epic.", funFact: "Theoretical physicist Kip Thorne served as an executive producer to ensure scientific accuracy.", image: "/images/movies/set1/2.png" },
            { id: 3, answer: "BARBIE", clue: "Greta Gerwig's pink-soaked cultural phenomenon.", funFact: "Production caused a global shortage of pink paint by international supplier Rosenlund.", image: "/images/movies/set1/3.png" },
            { id: 4, answer: "DUNE", clue: "Denis Villeneuve's sci-fi desert masterpiece.", funFact: "The fictional language of Chakobsa used in the film was built by linguist David J. Peterson.", image: "/images/movies/set1/4.png" },
            { id: 5, answer: "LA LA LAND", clue: "Jazz, romance, and starry nights in Los Angeles.", funFact: "Ryan Gosling actually learned to play jazz piano proficiently over three months of intense daily practice.", image: "/images/movies/set1/5.png" },
            { id: 6, answer: "BREAKING BAD", clue: "Chemistry teacher turned meth kingpin.", funFact: "The iconic blue methamphetamine prop was actually made out of blue rock candy flavored like cotton candy.", image: "/images/movies/set1/6.png" },
            { id: 7, answer: "KILL BILL", clue: "The Bride's roaring rampage of revenge.", funFact: "Uma Thurman's iconic yellow tracksuit was a direct tribute to Bruce Lee's outfit in Game of Death.", image: "/images/movies/set1/7.png" },
            { id: 8, answer: "STAR WARS", clue: "A long time ago in a galaxy far, far away...", funFact: "The iconic lightsaber hum was created by sound designer Ben Burrt combining a TV set idle hum and a movie projector motor.", image: "/images/movies/set1/8.png" },
            { id: 9, answer: "MISSION IMPOSSIBLE", clue: "Ethan Hunt's death-defying stunts.", funFact: "Tom Cruise famously performs almost all of his own dangerous action stunts without a stunt double.", image: "/images/movies/set1/9.png" },
            { id: 10, answer: "THE SIMPSONS", clue: "Springfield's yellow-skinned animated family.", funFact: "Matt Groening named most of the main characters after members of his own real family.", image: "/images/movies/set1/10.png" },
            { id: 11, answer: "THE SHINING", clue: "All work and no play makes Jack a dull boy.", funFact: "Director Stanley Kubrick forced actor Shelley Duvall to endure extreme psychological stress to capture authentic terror.", image: "/images/movies/set1/11.png" },
            { id: 12, answer: "BOHEMIAN RHAPSODY", clue: "Queen's legendary musical biopic.", funFact: "Rami Malek wore prosthetic teeth for a full year before filming began to master Freddie Mercury's speaking and singing posture.", image: "/images/movies/set1/12.png" },
            { id: 13, answer: "KING KONG", clue: "The giant ape atop the Empire State Building.", funFact: "The original 1933 masterpiece pioneered groundbreaking stop-motion animation techniques in cinema history.", image: "/images/movies/set1/13.png" },
            { id: 14, answer: "THE ODYSSEY", clue: "Epic mythological journey across ancient seas.", funFact: "It is one of the oldest foundational works of Western literature credited to the ancient poet Homer.", image: "/images/movies/set1/14.png" },
            { id: 15, answer: "INSIDE OUT", clue: "Emotions running wild inside an adolescent mind.", funFact: "Neuroscientists and psychologists were consulted during scriptwriting to accurately map out how human memory works.", image: "/images/movies/set1/15.png" }
          ]
        }
      ]
    }
  ];

  // Helper key for solved mapping
  const getPuzzleKey = (catId, setId, puzzleId) => `${catId}-${setId}-${puzzleId}`;

  // Handle native keyboard typing
  const handleInputChange = (e) => {
    if (!activePuzzle) return;
    const cleanAnswer = activePuzzle.answer.replace(/\s+/g, '');
    const rawInput = e.target.value.toUpperCase().replace(/[^A-Z]/g, ''); // Only allow uppercase letters A-Z
    
    if (rawInput.length <= cleanAnswer.length) {
      const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
      const newGuesses = { ...currentGuesses, [key]: rawInput };
      setCurrentGuesses(newGuesses);

      // Check if word is complete and correct
      if (rawInput === cleanAnswer) {
        setSolvedPuzzles(prev => ({ ...prev, [key]: true }));
        setCoins(prev => prev + 10);
        setShowWinModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:py-6">
      <div 
        className="w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-paper dot-grid border-4 border-ink shadow-2xl sm:rounded-3xl flex flex-col overflow-hidden relative cursor-text"
        onClick={() => {
          // Focus hidden input if tapping anywhere on the game screen
          if (currentScreen === 'game' && inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        
        {/* Top Header */}
        <div className="bg-electricYellow border-b-4 border-ink px-4 py-3 flex items-center justify-between shadow-cartoon-sm z-10">
          <h1 className="font-black tracking-wider text-xl transform -rotate-1">GRIDDLES</h1>
          <div className="bg-white border-2 border-ink px-3 py-1 rounded-full font-bold text-sm shadow-cartoon-sm flex items-center gap-1">
            <span>🪙</span> {coins}
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col relative">
          
          {/* 1. HOME SCREEN */}
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
                    <div className="text-xs opacity-90 font-bold mt-1">Beta Test: Set 1 Ready</div>
                  </div>
                  <span className="text-2xl">➡️</span>
                </button>
              ))}
            </div>
          )}

          {/* 2. SET SELECTION SCREEN */}
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
                <p className="text-xs font-bold opacity-70">Select Set 1 Beta Test</p>
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
                      <div className="text-xs text-slate-500 font-bold mt-1">15 Puzzles Loaded</div>
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
                      className="aspect-square bg-white border-3 border-ink rounded-xl overflow-hidden relative shadow-cartoon-sm transition-transform active:translate-x-1 active:translate-y-1 group"
                    >
                      <img 
                        src={puzzle.image} 
                        alt={`Puzzle #${puzzle.id}`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                        #{puzzle.id}
                      </div>

                      {isSolved && (
                        <div className="absolute inset-0 bg-mintGreen/30 backdrop-blur-[1px] flex flex-col items-center justify-center">
                          <span className="text-xl">✅</span>
                          <span className="text-[9px] font-black bg-white border border-ink px-1 rounded shadow-xs mt-0.5">💡 Fact</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. GUESSER GAMEPLAY SCREEN (Using Native Keyboard & Larger Artwork) */}
          {currentScreen === 'game' && activePuzzle && (() => {
            const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
            const currentWord = currentGuesses[key] || "";
            let letterIndex = 0;

            return (
              <div className="space-y-4 flex-1 flex flex-col justify-between py-2">
                
                {/* Hidden native input to capture keyboard typing */}
                <input 
                  ref={inputRef}
                  type="text"
                  value={currentWord}
                  onChange={handleInputChange}
                  className="absolute opacity-0 pointer-events-none"
                  autoFocus
                />

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

                {/* Larger Artwork Frame taking up spacious central area */}
                <div className="w-60 h-60 mx-auto bg-white border-4 border-ink rounded-3xl shadow-cartoon overflow-hidden flex items-center justify-center">
                  <img 
                    src={activePuzzle.image} 
                    alt={`Puzzle #${activePuzzle.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Clue Text */}
                <div className="bg-amber-100 border-2 border-ink p-2.5 rounded-2xl text-center text-xs font-bold shadow-cartoon-sm">
                  💡 Clue: {activePuzzle.clue}
                </div>

                {/* Answer Boxes with Spacing */}
                <div className="flex justify-center gap-1.5 flex-wrap items-center">
                  {activePuzzle.answer.split('').map((char, idx) => {
                    if (char === ' ') {
                      return <div key={idx} className="w-4 h-10" />;
                    }
                    
                    const currentChar = currentWord[letterIndex] || "";
                    letterIndex++;

                    return (
                      <div key={idx} className="w-8 h-10 bg-white border-3 border-ink rounded-xl flex items-center justify-center font-black text-lg shadow-cartoon-sm">
                        {currentChar}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center text-[11px] font-bold opacity-60">
                  ⌨️ Type with your device keyboard
                </div>
              </div>
            );
          })()}

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