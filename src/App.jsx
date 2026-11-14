import React, { useState, useRef } from 'react';

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
  
  // Ref for hidden input
  const inputRef = useRef(null);

  // Complete Categories & Sets Data Structure (90 Total Puzzles)
  const categories = [
    {
      id: 'movies',
      name: 'Movies & Series',
      emoji: '🍿',
      color: 'bg-candyPink',
      sets: [
        {
          id: 1,
          name: 'Set 01: Blockbusters & Icons',
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
        },
        {
          id: 2,
          name: 'Set 02: Cult Classics & Masterpieces',
          puzzles: [
            { id: 1, answer: "BLADE RUNNER 2049", clue: "Denis Villeneuve's neon-drenched cyberpunk sequel.", funFact: "Ryan Gosling actually really punched Harrison Ford in the face during a fight scene.", image: "/images/movies/set2/1.png" },
            { id: 2, answer: "INCEPTION", clue: "A dream within a dream within a dream.", funFact: "The spinning top symbol was inspired by a psychological concept explored in Greek philosophy.", image: "/images/movies/set2/2.png" },
            { id: 3, answer: "WHIPLASH", clue: "Not quite my tempo.", funFact: "J.K. Simmons actually cracked a rib during the intense physical rehearsal of the slap scene with Miles Teller.", image: "/images/movies/set2/3.png" },
            { id: 4, answer: "THE GODFATHER", clue: "An offer you cannot refuse.", funFact: "The cat Marlon Brando holds in the opening scene was a stray studio cat that wandered onto the set.", image: "/images/movies/set2/4.png" },
            { id: 5, answer: "PULP FICTION", clue: "Quentin Tarantino's non-linear crime masterpiece.", funFact: "The briefcase combination '666' has sparked decades of fan theories about what was inside.", image: "/images/movies/set2/5.png" },
            { id: 6, answer: "THE TRUMAN SHOW", clue: "In case I don't see ya, good afternoon, good evening, and good night!", funFact: "Jim Carrey took a massive pay cut to star in this dramatic role outside his usual comedy style.", image: "/images/movies/set2/6.png" },
            { id: 7, answer: "FRIENDS", clue: "Six pals hanging out at Central Perk.", funFact: "The iconic orange couch was found in the basement of the Warner Bros. lot storage room.", image: "/images/movies/set2/7.png" },
            { id: 8, answer: "JURASSIC PARK", clue: "Spared no expense on cloned dinosaurs.", funFact: "The terrifying T-Rex dinosaur roar combined the sounds of an elephant seal, tiger, and alligator.", image: "/images/movies/set2/8.png" },
            { id: 9, answer: "THE LORD OF THE RINGS", clue: "One Ring to rule them all.", funFact: "Viggo Mortensen broke his toe kicking an orc helmet, and his cry of pain in the film is completely real.", image: "/images/movies/set2/9.png" },
            { id: 10, answer: "THE MATRIX", clue: "Take the red pill and see how deep the rabbit hole goes.", funFact: "The iconic green digital rain code was actually created using Japanese sushi recipe characters.", image: "/images/movies/set2/10.png" },
            { id: 11, answer: "ONE PIECE", clue: "Set sail to find the ultimate treasure!", funFact: "Eiichiro Oda has kept strict control over the overarching plot since starting the manga in 1997.", image: "/images/movies/set2/11.png" },
            { id: 12, answer: "SPIDERMAN", clue: "With great power comes great responsibility.", funFact: "Tobey Maguire caught a lunch tray full of food in one take without CGI during the cafeteria scene.", image: "/images/movies/set2/12.png" },
            { id: 13, answer: "DUMB AND DUMBER", clue: "So you're telling me there's a chance?", funFact: "Jim Carrey's cracked tooth in the film was real; he chipped it as a kid and removed the cap for comedy effect.", image: "/images/movies/set2/13.png" },
            { id: 14, answer: "INSIDIOUS", clue: "It's not the house that is haunted.", funFact: "The entire film was shot on a micro-budget in just three weeks inside a residential house in Los Angeles.", image: "/images/movies/set2/14.png" },
            { id: 15, answer: "MAD MAX", clue: "Witness me across the post-apocalyptic wasteland.", funFact: "Over 80% of the spectacular stunt driving and fiery explosions in Fury Road were practical effects.", image: "/images/movies/set2/15.png" }
          ]
        }
      ]
    },
    {
      id: 'people',
      name: 'Famous People',
      emoji: '😎',
      color: 'bg-skyBlue',
      sets: [
        {
          id: 1,
          name: 'Set 01: Icons & Legends',
          puzzles: [
            { id: 1, answer: "MICHAEL JACKSON", clue: "The King of Pop who popularized the moonwalk.", funFact: "Michael Jackson patented special gravity-leaning shoes used in his 'Smooth Criminal' live performances.", image: "/images/peoples/set1/1.png" },
            { id: 2, answer: "BRUNO MARS", clue: "Grammy-winning retro pop and funk hitmaker.", funFact: "He started his career as an Elvis Presley impersonator in Hawaii when he was just four years old.", image: "/images/peoples/set1/2.png" },
            { id: 3, answer: "ISAAC NEWTON", clue: "Formulated the laws of motion and universal gravitation.", funFact: "He spent a lot of his time secretly studying alchemy and predicting biblical end times.", image: "/images/peoples/set1/3.png" },
            { id: 4, answer: "STEPHEN HAWKING", clue: "Theoretical physicist who unlocked the secrets of black holes.", funFact: "Despite losing his voice to ALS, his computerized voice synthesizer retained a distinct American accent.", image: "/images/peoples/set1/4.png" },
            { id: 5, answer: "NAPOLEON BONAPARTE", clue: "French military commander and emperor.", funFact: "Despite popular myths, Napoleon was actually of average height for a French man during his lifetime.", image: "/images/peoples/set1/5.png" },
            { id: 6, answer: "MARADONA", clue: "Legendary Argentine footballer of 'Hand of God' fame.", funFact: "There is an actual official religion founded by his fans in Argentina called the Maradoniana Church.", image: "/images/peoples/set1/6.png" },
            { id: 7, answer: "JOHN CENA", clue: "WWE champion turned Hollywood actor.", funFact: "He holds the record for granting the highest number of wishes (over 650) for the Make-A-Wish Foundation.", image: "/images/peoples/set1/7.png" },
            { id: 8, answer: "STAN LEE", clue: "The legendary comic book writer who co-created Marvel universe.", funFact: "He made cameo appearances in almost every single Marvel Cinematic Universe film before his passing.", image: "/images/peoples/set1/8.png" },
            { id: 9, answer: "KATY PERRY", clue: "Pop superstar known for high-energy anthems and Super Bowl halftime shows.", funFact: "She started her music career as a gospel singer releasing Christian music under her birth name Katy Hudson.", image: "/images/peoples/set1/9.png" },
            { id: 10, answer: "JIMI HENDRIX", clue: "Revolutionary electric guitar virtuoso of the 1960s.", funFact: "He was naturally left-handed and played a right-handed Fender Stratocaster strung upside down.", image: "/images/peoples/set1/10.png" },
            { id: 11, answer: "HENRY FORD", clue: "Industrialist who revolutionized assembly line manufacturing.", funFact: "He once commissioned a massive rubber plantation town named Fordlândia in the Amazon rainforest.", image: "/images/peoples/set1/11.png" },
            { id: 12, answer: "KIM JONG UN", clue: "Supreme Leader of North Korea.", funFact: "He is famously known to be an avid fan of American basketball and once hosted former NBA star Dennis Rodman.", image: "/images/peoples/set1/12.png" },
            { id: 13, answer: "TIGER WOODS", clue: "Golf icon who dominated the sport for decades.", funFact: "He won his very first Masters Tournament in 1997 by a historic 12-stroke margin at age 21.", image: "/images/peoples/set1/13.png" },
            { id: 14, answer: "SAMUEL L JACKSON", clue: "Prolific actor known for iconic cinematic quotes and badass roles.", funFact: "He has appeared in films that have collectively grossed over $27 billion worldwide, making him one of the highest-grossing actors in history.", image: "/images/peoples/set1/14.png" },
            { id: 15, answer: "OPPENHEIMER", clue: "Theoretical physicist known as the father of the atomic bomb.", funFact: "He learned Sanskrit and quoted ancient Hindu scripture ('Now I am become Death') after the Trinity test.", image: "/images/peoples/set1/15.png" }
          ]
        },
        {
          id: 2,
          name: 'Set 02: History & Pop Culture',
          puzzles: [
            { id: 1, answer: "ALBERT EINSTEIN", clue: "Genius physicist with iconic hair and the theory of relativity.", funFact: "He was offered the presidency of Israel in 1952, but politely declined the position.", image: "/images/peoples/set2/1.png" },
            { id: 2, answer: "VAN GOGH", clue: "Post-impressionist Dutch painter of starry nights.", funFact: "During his entire lifetime, he only successfully sold a single painting titled 'The Red Vineyard'.", image: "/images/peoples/set2/2.png" },
            { id: 3, answer: "GUY FAWKES", clue: "Famous conspirator behind the historic Gunpowder Plot.", funFact: "His iconic face mask featured in V for Vendetta has become a global symbol for political protest.", image: "/images/peoples/set2/3.png" },
            { id: 4, answer: "ALAN TURING", clue: "Father of modern computer science and codebreaker.", funFact: "He was an Olympic-level marathon runner who frequently ran the 40 miles between Bletchley Park and London for meetings.", image: "/images/peoples/set2/4.png" },
            { id: 5, answer: "CLEOPATRA", clue: "The legendary last active ruler of the Ptolemaic Kingdom of Egypt.", funFact: "She was actually of Greek Macedonian descent rather than native Egyptian.", image: "/images/peoples/set2/5.png" },
            { id: 6, answer: "BILLIE EILISH", clue: "Grammy-winning alternative pop singer-songwriter.", funFact: "She recorded the entirety of her multi-platinum debut album inside her brother Finneas's small bedroom studio.", image: "/images/peoples/set2/6.png" },
            { id: 7, answer: "SERENA WILLIAMS", clue: "Tennis legend and 23-time Grand Slam singles champion.", funFact: "She and her sister Venus used to practice tennis on public courts in Compton that frequently had glass and trash on them.", image: "/images/peoples/set2/7.png" },
            { id: 8, answer: "USAIN BOLT", clue: "The fastest human in history and Olympic sprint king.", funFact: "As a child growing up in Jamaica, he was actually much more passionate about cricket and European football.", image: "/images/peoples/set2/8.png" },
            { id: 9, answer: "TAYLOR SWIFT", clue: "Global megastar songwriter shaping modern music culture.", funFact: "She is the first artist in history to win the Grammy Award for Album of the Year four separate times.", image: "/images/peoples/set2/9.png" },
            { id: 10, answer: "MARILYN MONROE", clue: "Hollywood golden age screen siren and pop icon.", funFact: "She was an avid reader who left behind a personal library containing over 400 classic books.", image: "/images/peoples/set2/10.png" },
            { id: 11, answer: "OBAMA", clue: "44th President of the United States.", funFact: "He won two Grammy Awards for Best Spoken Word Album for the audiobook recordings of his memoirs.", image: "/images/peoples/set2/11.png" },
            { id: 12, answer: "GORDON RAMSAY", clue: "Fiery Michelin-starred chef and TV personality.", funFact: "Before pursuing culinary arts full-time, he was a competitive football player whose career was cut short by a knee injury.", image: "/images/peoples/set2/12.png" },
            { id: 13, answer: "FRIDA KAHLO", clue: "Iconic Mexican painter renowned for vibrant self-portraits.", funFact: "She converted her family home, 'La Casa Azul', into a vibrant blue hub for artists and political thinkers.", image: "/images/peoples/set2/13.png" },
            { id: 14, answer: "SLASH", clue: "Legendary top-hat-wearing Guns N' Roses lead guitarist.", funFact: "His iconic top hat was originally bought at a store in Los Angeles just a day before his first major band gig.", image: "/images/peoples/set2/14.png" },
            { id: 15, answer: "STEVE HARVEY", clue: "Comedian and host famous for hosting Family Feud.", funFact: "Before achieving television fame, he spent three years living out of his 1976 Ford Tempo while working odd stand-up gigs.", image: "/images/peoples/set2/15.png" }
          ]
        }
      ]
    },
    {
      id: 'cities',
      name: 'World Cities',
      emoji: '🗼',
      color: 'bg-mintGreen',
      sets: [
        {
          id: 1,
          name: 'Set 01: Global Landmarks',
          puzzles: [
            { id: 1, answer: "TOKYO", clue: "Bustling capital of Japan known for neon lights and skyscrapers.", funFact: "Tokyo is the most populous metropolitan area in the entire world, housing over 37 million people.", image: "/images/cities/set1/1.png" },
            { id: 2, answer: "NEW DELHI", clue: "Historic capital city of India.", funFact: "It houses one of the world's largest spice markets, Khari Baoli, which has operated since the 17th century.", image: "/images/cities/set1/2.png" },
            { id: 3, answer: "BALI", clue: "Famous Indonesian island paradise known for temples and beaches.", funFact: "Bali observes 'Nyepi' (Day of Silence) once a year where all lights, fires, and travel are completely prohibited.", image: "/images/cities/set1/3.png" },
            { id: 4, answer: "SYDNEY", clue: "Australian coastal hub featuring a famous iconic opera house.", funFact: "The famous Sydney Opera House roof shells were inspired by the simple peeling segments of an ordinary orange.", image: "/images/cities/set1/4.png" },
            { id: 5, answer: "MECCA", clue: "Holiest city in Islam located in Saudi Arabia.", funFact: "The towering Makkah Royal Clock Tower here is one of the tallest architectural structures on Earth.", image: "/images/cities/set1/5.png" },
            { id: 6, answer: "INTERLAKEN", clue: "Swiss resort town nestled between scenic alpine lakes.", funFact: "Its name literally translates to 'between lakes' (Thun and Brienz).", image: "/images/cities/set1/6.png" },
            { id: 7, answer: "BERLIN", clue: "Vibrant capital of Germany rich in modern history.", funFact: "Berlin has more bridges than Venice, boasting over 1,700 bridges across its waterways.", image: "/images/cities/set1/7.png" },
            { id: 8, answer: "SAN FRANCISCO", clue: "Northern California city famous for its steep hills and cable cars.", funFact: "The iconic Golden Gate Bridge is officially painted in a distinct color shade known as 'International Orange'.", image: "/images/cities/set1/8.png" },
            { id: 9, answer: "CAPE TOWN", clue: "Port city in South Africa beneath imposing Table Mountain.", funFact: "Table Mountain is estimated to be one of the oldest geological mountain formations in the world.", image: "/images/cities/set1/9.png" },
            { id: 10, answer: "BARCELONA", clue: "Catalan coastal city known for unique Gaudí architecture.", funFact: "The famous Basílica de la Sagrada Família has been under construction continuously since 1882.", image: "/images/cities/set1/10.png" },
            { id: 11, answer: "BRASILIA", clue: "Planned capital of Brazil shaped like an airplane from above.", funFact: "The entire city was built from scratch in just 41 months and inaugurated as capital in 1960.", image: "/images/cities/set1/11.png" },
            { id: 12, answer: "KUALA LUMPUR", clue: "Malaysian capital dominated by the iconic Petronas Twin Towers.", funFact: "The Petronas Twin Towers were the tallest buildings in the world from 1998 to 2004.", image: "/images/cities/set1/12.png" },
            { id: 13, answer: "CHENGDU", clue: "Sichuan capital famous for spicy cuisine and giant pandas.", funFact: "Chengdu is recognized globally as the home and major research breeding center for giant pandas.", image: "/images/cities/set1/13.png" },
            { id: 14, answer: "CASABLANCA", clue: "Major Moroccan port city and economic hub.", funFact: "The Hassan II Mosque in Casablanca features the second-tallest minaret in the world and a laser pointing toward Mecca.", image: "/images/cities/set1/14.png" },
            { id: 15, answer: "HONG KONG", clue: "Global financial powerhouse with a stunning vertical harbor skyline.", funFact: "Hong Kong has more skyscrapers than any other city in the entire world.", image: "/images/cities/set1/15.png" }
          ]
        },
        {
          id: 2,
          name: 'Set 02: Wonders & Metropolises',
          puzzles: [
            { id: 1, answer: "NIAGARA FALLS", clue: "Thunderous roaring waterfalls spanning the US-Canada border.", funFact: "More than 3,160 tons of water flow over Niagara Falls every single second.", image: "/images/cities/set2/1.png" },
            { id: 2, answer: "GIZA", clue: "Egyptian plateau home to the Great Pyramids and Sphinx.", funFact: "The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years.", image: "/images/cities/set2/2.png" },
            { id: 3, answer: "MADRID", clue: "Sunny and vibrant capital city of Spain.", funFact: "Madrid's historic Restaurant Botín has operated continuously since 1725, making it the oldest restaurant in the world.", image: "/images/cities/set2/3.png" },
            { id: 4, answer: "JERUSALEM", clue: "Ancient holy city revered by three major world religions.", funFact: "The ancient Old City of Jerusalem is divided into four distinct quarters: Armenian, Christian, Jewish, and Muslim.", image: "/images/cities/set2/4.png" },
            { id: 5, answer: "FLORENCE", clue: "Italian birthplace of the Renaissance filled with art history.", funFact: "Florence was the first city in Europe to have its streets fully paved with stone in 1339.", image: "/images/cities/set2/5.png" },
            { id: 6, answer: "MOSCOW", clue: "Sprawling capital of Russia featuring Red Square and St. Basil's.", funFact: "Moscow's metro system is famous for its stunning palaces-like stations decorated with chandeliers and marble statues.", image: "/images/cities/set2/6.png" },
            { id: 7, answer: "HAVANA", clue: "Historic capital of Cuba known for vintage cars and colonial architecture.", funFact: "Havana's historic old town was designated a UNESCO World Heritage site in 1982.", image: "/images/cities/set2/7.png" },
            { id: 8, answer: "MACAU", clue: "The bustling gaming and entertainment capital of Asia.", funFact: "Macau has one of the highest population densities in the entire world.", image: "/images/cities/set2/8.png" },
            { id: 9, answer: "REYKJAVIK", clue: "The world's northernmost sovereign capital, located in Iceland.", funFact: "Most buildings in Reykjavik are heated by natural underground geothermal water piped directly from hot springs.", image: "/images/cities/set2/9.png" },
            { id: 10, answer: "JAKARTA", clue: "Sprawling and energetic capital metropolis of Indonesia.", funFact: "Jakarta was historically known as 'Batavia' during the Dutch colonial era.", image: "/images/cities/set2/10.png" },
            { id: 11, answer: "MIAMI", clue: "Sunny South Florida coastal hub known for art deco and beaches.", funFact: "Miami is the only major American city founded by a woman, Julia Tuttle, in 1896.", image: "/images/cities/set2/11.png" },
            { id: 12, answer: "AMSTERDAM", clue: "Picturesque Dutch capital famous for its scenic canals and bicycles.", funFact: "There are more bicycles in Amsterdam than there are human residents.", image: "/images/cities/set2/12.png" },
            { id: 13, answer: "SHANGHAI", clue: "Futuristic global financial hub in China featuring the Oriental Pearl Tower.", funFact: "Shanghai's maglev train reaches staggering operating speeds of up to 431 km/h (268 mph).", image: "/images/cities/set2/13.png" },
            { id: 14, answer: "HIROSHIMA", clue: "Historic Japanese city known for peace monuments and resilience.", funFact: "The Peace Flame in Hiroshima Peace Memorial Park will remain lit continuously until all nuclear weapons on Earth are destroyed.", image: "/images/cities/set2/14.png" },
            { id: 15, answer: "MANCHESTER", clue: "Industrial powerhouse and cultural capital in northern England.", funFact: "Manchester is widely credited as the birthplace of the industrial revolution and modern computing.", image: "/images/cities/set2/15.png" }
          ]
        }
      ]
    }
  ];

  // Helper key for solved mapping
  const getPuzzleKey = (catId, setId, puzzleId) => `${catId}-${setId}-${puzzleId}`;

  // Calculate solved counts per category
  const getCategorySolvedCount = (cat) => {
    let count = 0;
    cat.sets.forEach(set => {
      set.puzzles.forEach(p => {
        if (solvedPuzzles[getPuzzleKey(cat.id, set.id, p.id)]) count++;
      });
    });
    return count;
  };

  // Calculate solved count per set
  const getSetSolvedCount = (catId, setId, setPuzzles) => {
    let count = 0;
    setPuzzles.forEach(p => {
      if (solvedPuzzles[getPuzzleKey(catId, setId, p.id)]) count++;
    });
    return count;
  };

  // Handle native keyboard typing
  const handleInputChange = (e) => {
    if (!activePuzzle || !selectedCategory || !selectedSet) return;
    const cleanAnswer = activePuzzle.answer.replace(/\s+/g, '');
    const rawInput = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (rawInput.length <= cleanAnswer.length) {
      const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
      const newGuesses = { ...currentGuesses, [key]: rawInput };
      setCurrentGuesses(newGuesses);

      if (rawInput === cleanAnswer) {
        setSolvedPuzzles(prev => ({ ...prev, [key]: true }));
        setCoins(prev => prev + 10);
        setShowWinModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:py-6">
      <div className="w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-paper dot-grid border-4 border-ink shadow-2xl sm:rounded-3xl flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <div className="px-4 pt-4 pb-2 flex items-start justify-between shrink-0">
          <div>
            <div className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Your Daily Pop Fix</div>
            <h1 className="text-3xl font-black tracking-wider transform -rotate-1 mt-0.5">
              <span className="bg-electricYellow px-2 py-0.5 border-2 border-ink inline-block shadow-cartoon-sm">GRIDDLES!</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <div className="bg-white border-3 border-ink px-3 py-1 rounded-full font-black text-xs shadow-cartoon-sm flex items-center gap-1">
              <span>⭐</span> {coins}
            </div>
            <div className="text-[10px] font-black text-right leading-tight">
              ✨ Know it?<br/>Show it.
            </div>
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col relative">
          
          {/* 1. HOME SCREEN (Category Choice) */}
          {currentScreen === 'home' && (
            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-black text-base tracking-wide text-slate-800">Pick your playground</h2>
                <span className="text-lg">〰️</span>
              </div>
              
              <div className="space-y-3">
                {categories.map((cat) => {
                  const solvedCount = getCategorySolvedCount(cat);

                  return (
                    <button 
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentScreen('sets');
                      }}
                      className={`w-full ${cat.color} border-3 border-ink p-4 rounded-2xl shadow-cartoon cursor-pointer text-left transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:opacity-100 opacity-95 relative`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 bg-white border-2 border-ink rounded-xl flex items-center justify-center text-2xl shadow-cartoon-sm shrink-0">
                            {cat.emoji}
                          </div>
                          <div>
                            <div className="font-black text-lg leading-tight">{cat.name}</div>
                            <div className="text-xs font-bold text-slate-700 mt-0.5">{solvedCount} / 30 Solved</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-white border-2 border-ink rounded-lg flex items-center justify-center font-black shadow-cartoon-sm">
                          ↗
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 w-full bg-white/60 border-2 border-ink h-3 rounded-full overflow-hidden p-0.5">
                        <div 
                          className="bg-ink h-full rounded-full transition-all duration-500"
                          style={{ width: `${(solvedCount / 30) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. SET CHOICE SCREEN */}
          {currentScreen === 'sets' && selectedCategory && (
            <div className="space-y-4 flex-1 flex flex-col">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-xs shadow-cartoon-sm"
              >
                ⬅️ Back to Categories
              </button>
              
              <div className="text-center my-1">
                <span className="text-4xl">{selectedCategory.emoji}</span>
                <h3 className="font-black text-xl mt-1">{selectedCategory.name}</h3>
                <p className="text-xs font-bold text-slate-600">Select a Set to Play</p>
              </div>

              <div className="space-y-3.5 flex-1 flex flex-col justify-center pb-6">
                {selectedCategory.sets.map((set) => {
                  const setSolved = getSetSolvedCount(selectedCategory.id, set.id, set.puzzles);

                  return (
                    <button
                      key={set.id}
                      onClick={() => {
                        setSelectedSet(set);
                        setCurrentScreen('grid');
                      }}
                      className={`w-full border-3 border-ink p-4 rounded-2xl font-black text-left flex justify-between items-center shadow-cartoon transition-transform active:translate-x-0.5 active:translate-y-0.5 ${
                        setSolved === 15 ? 'bg-mintGreen' : 'bg-electricYellow hover:bg-yellow-300'
                      }`}
                    >
                      <div>
                        <div className="text-base">{set.name}</div>
                        <div className="text-xs font-bold text-slate-700 mt-1">15 Puzzles Available</div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border-2 border-ink px-3 py-1.5 rounded-xl shadow-cartoon-sm text-xs">
                        <span>{setSolved} / 15</span>
                        <span>{setSolved === 15 ? '✓' : '→'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. 15-ICON SET GRID SCREEN */}
          {currentScreen === 'grid' && selectedSet && selectedCategory && (
            <div className="space-y-3 flex-1 flex flex-col">
              <button 
                onClick={() => setCurrentScreen('sets')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-xs shadow-cartoon-sm"
              >
                ⬅️ Back to Sets
              </button>
              
              <div className="text-center">
                <h3 className="font-black text-lg">{selectedCategory.name}</h3>
                <p className="text-xs font-bold text-slate-600">{selectedSet.name}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2.5 overflow-y-auto pb-4">
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
                        src={puzzleImagePath(selectedCategory.id, selectedSet.id, puzzle.id)} 
                        alt={`Puzzle #${puzzle.id}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = puzzle.image;
                        }}
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

          {/* 4. GUESSER GAMEPLAY SCREEN */}
          {currentScreen === 'game' && activePuzzle && selectedCategory && selectedSet && (() => {
            const key = getPuzzleKey(selectedCategory.id, selectedSet.id, activePuzzle.id);
            const currentWord = currentGuesses[key] || "";
            let letterIndex = 0;

            return (
              <div className="space-y-2.5 flex-1 flex flex-col justify-start">
                
                {/* Hidden native input */}
                <input 
                  ref={inputRef}
                  type="text"
                  value={currentWord}
                  onChange={handleInputChange}
                  className="absolute opacity-0 pointer-events-none"
                />

                {/* Top Navigation */}
                <div className="flex justify-between items-center shrink-0">
                  <button 
                    onClick={() => setCurrentScreen('grid')}
                    className="bg-white border-2 border-ink px-3 py-0.5 rounded-xl font-bold text-xs shadow-cartoon-sm"
                  >
                    ⬅️ Back to Grid
                  </button>
                  <span className="font-black text-xs bg-electricYellow border-2 border-ink px-2 py-0.5 rounded-lg">
                    PUZZLE #{activePuzzle.id}
                  </span>
                </div>

                {/* Compact Artwork Frame */}
                <div className="w-36 h-36 mx-auto bg-white border-3 border-ink rounded-2xl shadow-cartoon overflow-hidden flex items-center justify-center shrink-0">
                  <img 
                    src={puzzleImagePath(selectedCategory.id, selectedSet.id, activePuzzle.id)} 
                    alt={`Puzzle #${activePuzzle.id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = activePuzzle.image;
                    }}
                  />
                </div>

                {/* Clue Text */}
                <div className="bg-amber-100 border-2 border-ink px-3 py-1.5 rounded-xl text-center text-xs font-bold shadow-cartoon-sm shrink-0">
                  💡 Clue: {activePuzzle.clue}
                </div>

                {/* Interactive Answer Boxes */}
                <div 
                  onClick={() => {
                    if (inputRef.current) inputRef.current.focus();
                  }}
                  className="bg-slate-100/80 border-2 border-dashed border-ink p-2.5 rounded-2xl flex flex-col items-center gap-1.5 cursor-pointer hover:bg-slate-200/50 transition-colors shadow-cartoon-sm shrink-0"
                >
                  <div className="flex justify-center gap-1 flex-wrap items-center">
                    {activePuzzle.answer.split('').map((char, idx) => {
                      if (char === ' ') {
                        return <div key={idx} className="w-2.5 h-8" />;
                      }
                      
                      const currentChar = currentWord[letterIndex] || "";
                      letterIndex++;

                      return (
                        <div key={idx} className="w-6 h-8 bg-white border-2 border-ink rounded-lg flex items-center justify-center font-black text-sm shadow-cartoon-sm">
                          {currentChar}
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                    👆 Tap here to type answer
                  </span>
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

// Helper function to handle image paths correctly across categories
function puzzleImagePath(catId, setId, puzzleId) {
  if (catId === 'people') {
    return `/images/peoples/set${setId}/${puzzleId}.png`;
  }
  return `/images/${catId}/set${setId}/${puzzleId}.png`;
}