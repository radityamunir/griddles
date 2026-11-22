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

  // Complete Categories & Sets Data Structure
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
        },
        {
          id: 3,
          name: 'Set 03: Hits, Thrillers & Drama',
          puzzles: [
            { id: 1, answer: "DESPICABLE ME", clue: "Gru and his army of yellow Minions.", funFact: "Minion speech is a mix of many real languages, food words, and gibberish.", image: "/images/movies/set3/1.png" },
            { id: 2, answer: "IRON MAN", clue: "Tony Stark builds a powered suit of armor.", funFact: "Robert Downey Jr. improvised several famous lines during production.", image: "/images/movies/set3/2.png" },
            { id: 3, answer: "THE FAST AND THE FURIOUS", clue: "High-speed street racing and family loyalty.", funFact: "The franchise began with a focus on underground street racing in Los Angeles.", image: "/images/movies/set3/3.png" },
            { id: 4, answer: "BLACK MIRROR", clue: "Anthology series exploring dark sides of technology.", funFact: "Each episode acts as a standalone cautionary story with different casts.", image: "/images/movies/set3/4.png" },
            { id: 5, answer: "KINGDOM OF HEAVEN", clue: "Crusades-era historical epic directed by Ridley Scott.", funFact: "The extended director's cut significantly expands character arcs and battle context.", image: "/images/movies/set3/5.png" },
            { id: 6, answer: "MEMENTO", clue: "A man with short-term memory loss hunts his wife's killer.", funFact: "Christopher Nolan structured the narrative in reverse chronological order.", image: "/images/movies/set3/6.png" },
            { id: 7, answer: "THE DAY AFTER TOMORROW", clue: "Sudden climate shift triggers a global freeze.", funFact: "Disaster films often blend weather science with large-scale visual effects.", image: "/images/movies/set3/7.png" },
            { id: 8, answer: "500 DAYS OF SUMMER", clue: "An unconventional look at a non-linear romance.", funFact: "The story is told out of chronological order to mirror emotional memory.", image: "/images/movies/set3/8.png" },
            { id: 9, answer: "FREE WILLY", clue: "A boy befriends a captive killer whale.", funFact: "Keiko, the whale who played Willy, later became the focus of a major rehabilitation effort.", image: "/images/movies/set3/9.png" },
            { id: 10, answer: "CHILDS PLAY", clue: "A killer doll possessed by a serial killer's spirit.", funFact: "Chucky became one of horror cinema's most recognizable slasher icons.", image: "/images/movies/set3/10.png" },
            { id: 11, answer: "AIRPLANE", clue: "Deadpan comedy spoof of disaster movies.", funFact: "The film packed rapid-fire visual gags and wordplay into almost every scene.", image: "/images/movies/set3/11.png" },
            { id: 12, answer: "QUEENS GAMBIT", clue: "A chess prodigy rises through competitive tournaments.", funFact: "Interest in chess surged worldwide after the miniseries debuted.", image: "/images/movies/set3/12.png" },
            { id: 13, answer: "THE SILENCE OF THE LAMBS", clue: "An FBI trainee seeks insight from a brilliant imprisoned psychiatrist.", funFact: "It won all five major Academy Awards: Picture, Director, Actor, Actress, and Adapted Screenplay.", image: "/images/movies/set3/13.png" },
            { id: 14, answer: "AMERICAN SNIPER", clue: "War drama following Navy SEAL marksman Chris Kyle.", funFact: "It became one of the highest-grossing war films in box office history.", image: "/images/movies/set3/14.png" },
            { id: 15, answer: "LIFE OF PI", clue: "A young man survives adrift on a lifeboat with a Bengal tiger.", funFact: "Ang Lee won Best Director for the film's visual storytelling and water sequences.", image: "/images/movies/set3/15.png" }
          ]
        },
        {
          id: 4,
          name: 'Set 04: Sci-Fi, Mystery & TV Icons',
          puzzles: [
            { id: 1, answer: "STAR TREK", clue: "To boldly go where no one has gone before.", funFact: "The original series premiered in 1966 and launched decades of sci-fi television and film.", image: "/images/movies/set4/1.png" },
            { id: 2, answer: "PANS LABYRINTH", clue: "Dark fantasy set in post-civil-war Spain.", funFact: "Guillermo del Toro designed creature effects with detailed practical makeup and prosthetics.", image: "/images/movies/set4/2.png" },
            { id: 3, answer: "THE HUNGER GAMES", clue: "Televised survival competition in a dystopian nation.", funFact: "The story is set in Panem, divided into twelve districts around the Capitol.", image: "/images/movies/set4/3.png" },
            { id: 4, answer: "GAME OF THRONES", clue: "Noble houses battle for the Iron Throne in Westeros.", funFact: "Filming spanned multiple countries to capture diverse climates and landscapes.", image: "/images/movies/set4/4.png" },
            { id: 5, answer: "SCHOOL OF ROCK", clue: "A substitute teacher turns prep students into a rock band.", funFact: "Many of the young actors played their instruments live on set.", image: "/images/movies/set4/5.png" },
            { id: 6, answer: "THE NUN", clue: "Gothic horror entry tied to The Conjuring universe.", funFact: "Set in an isolated abbey in Romania, it leans into eerie candlelit atmospheres.", image: "/images/movies/set4/6.png" },
            { id: 7, answer: "DOCTOR STRANGE", clue: "A surgeon learns the mystic arts after an accident.", funFact: "Mirror-dimension sequences fold cityscapes like kaleidoscopes.", image: "/images/movies/set4/7.png" },
            { id: 8, answer: "TRANSFORMER", clue: "Robots in disguise that shift into vehicles.", funFact: "The franchise originated in the 1980s across toys, comics, and animation.", image: "/images/movies/set4/8.png" },
            { id: 9, answer: "GET OUT", clue: "A visit to a girlfriend's family estate turns sinister.", funFact: "Jordan Peele won the Academy Award for Best Original Screenplay for his directorial debut.", image: "/images/movies/set4/9.png" },
            { id: 10, answer: "PINK PANTHER", clue: "Clumsy inspector and a famous jewel in animated form.", funFact: "Henry Mancini's jazzy theme music became a classic in its own right.", image: "/images/movies/set4/10.png" },
            { id: 11, answer: "A STAR IS BORN", clue: "Musical drama about fame, mentorship, and heartbreak.", funFact: "The story has been adapted multiple times across different musical eras.", image: "/images/movies/set4/11.png" },
            { id: 12, answer: "KNIVES OUT", clue: "A southern detective investigates a wealthy family mystery.", funFact: "Benoit Blanc's signature drawl was inspired by classic mystery sleuths.", image: "/images/movies/set4/12.png" },
            { id: 13, answer: "WHEN HARRY MET SALLY", clue: "Years of banter test whether men and women can just be friends.", funFact: "The diner scene takes place at Katz's Delicatessen in New York City.", image: "/images/movies/set4/13.png" },
            { id: 14, answer: "GHOSTBUSTER", clue: "Paranormal investigators bust specters in New York.", funFact: "The proton pack hum and ghost trap effects became instant pop-culture staples.", image: "/images/movies/set4/14.png" },
            { id: 15, answer: "THE SOPRANOS", clue: "New Jersey mob boss balances crime family and therapy.", funFact: "Widely credited with helping kick off the modern golden age of prestige TV drama.", image: "/images/movies/set4/15.png" }
          ]
        },
        {
          id: 5,
          name: 'Set 05: Classics, Anime & Favorites',
          puzzles: [
            { id: 1, answer: "SUPERMAN", clue: "Metropolis's caped hero from Krypton.", funFact: "Created in 1938 by Jerry Siegel and Joe Shuster, Superman helped define the superhero genre.", image: "/images/movies/set5/1.png" },
            { id: 2, answer: "TITANIC", clue: "Romance aboard the ill-fated ocean liner.", funFact: "James Cameron's epic tied the record for the most Academy Awards won by a single film.", image: "/images/movies/set5/2.png" },
            { id: 3, answer: "TOP GUN", clue: "Elite fighter pilots train at naval aviation school.", funFact: "Aviation sequences combined real fighter jets with high-G cockpit filming.", image: "/images/movies/set5/3.png" },
            { id: 4, answer: "GREYS ANATOMY", clue: "Long-running medical drama set at a Seattle hospital.", funFact: "Every episode title is named after a song.", image: "/images/movies/set5/4.png" },
            { id: 5, answer: "FAMILY GUY", clue: "Seth MacFarlane's animated sitcom about the Griffin family.", funFact: "Known for fast cutaway gags and satirical pop-culture references.", image: "/images/movies/set5/5.png" },
            { id: 6, answer: "SCARFACE", clue: "Tony Montana's rise and fall in 1980s Miami.", funFact: "The neon-lit aesthetic and quotes remain heavily referenced in hip-hop and cinema.", image: "/images/movies/set5/6.png" },
            { id: 7, answer: "YOUR NAME", clue: "Makoto Shinkai's anime hit about two teens swapping lives.", funFact: "Comet Tiamat and changing seasons anchor the film's emotional connection across distance.", image: "/images/movies/set5/7.png" },
            { id: 8, answer: "PROJECT HAIL MARY", clue: "Sci-fi story of an astronaut waking up with amnesia on a deep-space mission.", funFact: "Based on Andy Weir's novel focused on orbital mechanics and makeshift problem-solving.", image: "/images/movies/set5/8.png" },
            { id: 9, answer: "MARTY SUPREME", clue: "Ping-pong-inspired drama starring Timothee Chalamet.", funFact: "Directed by Josh Safdie with intense pacing and period detail.", image: "/images/movies/set5/9.png" },
            { id: 10, answer: "FRIDAY THE 13TH", clue: "Camp Crystal Lake slasher franchise.", funFact: "Jason Voorhees became one of horror's most recognizable masked figures.", image: "/images/movies/set5/10.png" },
            { id: 11, answer: "LEGALLY BLONDE", clue: "Elle Woods heads to Harvard Law School.", funFact: "The 'bend and snap' became a playful pop-culture catchphrase.", image: "/images/movies/set5/11.png" },
            { id: 12, answer: "SOUND OF MUSIC", clue: "A governess brings music to a von Trapp family household in Austria.", funFact: "Features classic Rodgers and Hammerstein songs like 'Do-Re-Mi' and 'My Favorite Things'.", image: "/images/movies/set5/12.png" },
            { id: 13, answer: "THE BIG BANG THEORY", clue: "Sitcom centered on physicists and their neighbors.", funFact: "Ran for twelve seasons and popularized nerd-culture humor in prime time.", image: "/images/movies/set5/13.png" },
            { id: 14, answer: "LOST IN TRANSLATION", clue: "An actor and a young graduate form a quiet bond in Tokyo.", funFact: "Sofia Coppola won Best Original Screenplay for the intimate character study.", image: "/images/movies/set5/14.png" },
            { id: 15, answer: "A NIGHTMARE BEFORE CHRISTMAS", clue: "Jack Skellington discovers Halloween Town and Christmas Town.", funFact: "Stop-motion animation required painstaking frame-by-frame puppet movement.", image: "/images/movies/set5/15.png" }
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
        },
        {
          id: 3,
          name: 'Set 03: Sports, Tech & Stage Icons',
          puzzles: [
            { id: 1, answer: "ERLING HAALAND", clue: "Prolific Norwegian striker known for scoring goals at a rapid pace.", funFact: "He holds youth and senior scoring records across multiple European leagues.", image: "/images/peoples/set3/1.png" },
            { id: 2, answer: "STEPHEN CURRY", clue: "Sharpshooting NBA guard who transformed three-point shooting.", funFact: "He became the first unanimous MVP in NBA history in 2016.", image: "/images/peoples/set3/2.png" },
            { id: 3, answer: "ELON MUSK", clue: "Entrepreneur behind electric vehicles and commercial rocketry.", funFact: "Helped lead ventures in spaceflight, electric cars, and neural interfaces.", image: "/images/peoples/set3/3.png" },
            { id: 4, answer: "ROBERT DOWNEY JR", clue: "Actor famous for bringing Iron Man and Sherlock Holmes to life.", funFact: "His comeback performance in Iron Man helped launch the Marvel Cinematic Universe.", image: "/images/peoples/set3/4.png" },
            { id: 5, answer: "MIKE TYSON", clue: "Youngest heavyweight boxing champion in history.", funFact: "Won the heavyweight title at age 20 with explosive power.", image: "/images/peoples/set3/5.png" },
            { id: 6, answer: "ELVIS PRESLEY", clue: "The King of Rock and Roll from Memphis.", funFact: "His 1950s performances reshaped popular music and youth culture.", image: "/images/peoples/set3/6.png" },
            { id: 7, answer: "SALVADOR DALI", clue: "Surrealist artist famous for melting clocks and distinctive mustache.", funFact: "Blended dreamlike imagery with meticulous academic painting technique.", image: "/images/peoples/set3/7.png" },
            { id: 8, answer: "SHAKIRA", clue: "Colombian singer-songwriter known for global hits and dance.", funFact: "Has performed at multiple FIFA World Cup events across her career.", image: "/images/peoples/set3/8.png" },
            { id: 9, answer: "BENJAMIN FRANKLIN", clue: "American founding father, inventor, and diplomat.", funFact: "Helped establish public libraries, postal systems, and lightning rod experiments.", image: "/images/peoples/set3/9.png" },
            { id: 10, answer: "DAVID BOWIE", clue: "Chameleonic British musician known for theatrical personas.", funFact: "Frequently reinvented his sound and visual style from glam rock to electronic.", image: "/images/peoples/set3/10.png" },
            { id: 11, answer: "WINSTON CHURCHILL", clue: "British wartime prime minister and Nobel laureate in literature.", funFact: "Delivered iconic speeches during World War II and was also an avid painter.", image: "/images/peoples/set3/11.png" },
            { id: 12, answer: "FRANK SINATRA", clue: "Crooner and member of the Rat Pack.", funFact: "Recorded timeless standards like 'Fly Me to the Moon' and 'My Way'.", image: "/images/peoples/set3/12.png" },
            { id: 13, answer: "JOHNNY DEPP", clue: "Actor known for eccentric roles like Captain Jack Sparrow.", funFact: "Collaborated frequently with director Tim Burton on stylized fantasy films.", image: "/images/peoples/set3/13.png" },
            { id: 14, answer: "SARDAR PATEL", clue: "Key Indian statesman known as the Iron Man of India.", funFact: "Played a central role in integrating princely states into modern India.", image: "/images/peoples/set3/14.png" },
            { id: 15, answer: "SNOOP DOGG", clue: "West Coast hip-hop icon with a laid-back persona.", funFact: "Has crossed over into mainstream television, cooking shows, and global events.", image: "/images/peoples/set3/15.png" }
          ]
        },
        {
          id: 4,
          name: 'Set 04: Pioneers, Innovators & Stars',
          puzzles: [
            { id: 1, answer: "NEIL ARMSTRONG", clue: "First human to walk on the Moon during Apollo 11.", funFact: "Stepped onto the lunar surface on July 20, 1969.", image: "/images/peoples/set4/1.png" },
            { id: 2, answer: "BUZZ ALDRIN", clue: "Apollo 11 lunar module pilot and second person on the Moon.", funFact: "Captured many of the most famous photographs from the Apollo 11 moonwalk.", image: "/images/peoples/set4/2.png" },
            { id: 3, answer: "MICHAEL COLLINS", clue: "Apollo 11 command module pilot orbiting the Moon.", funFact: "Waited alone in lunar orbit while Armstrong and Aldrin walked on the surface.", image: "/images/peoples/set4/3.png" },
            { id: 4, answer: "BILL GATES", clue: "Co-founder of Microsoft and global philanthropist.", funFact: "Helped popularize personal computer software in the late 20th century.", image: "/images/peoples/set4/4.png" },
            { id: 5, answer: "YAO MING", clue: "Towering Chinese basketball center and NBA All-Star.", funFact: "Stood at 7 feet 6 inches tall and helped bridge basketball between China and the US.", image: "/images/peoples/set4/5.png" },
            { id: 6, answer: "CHE GUEVARA", clue: "Major figure of the Cuban Revolution.", funFact: "His portrait became one of the most reproduced political images in the world.", image: "/images/peoples/set4/6.png" },
            { id: 7, answer: "OZZY OSBOURNE", clue: "Heavy metal frontman dubbed the Prince of Darkness.", funFact: "Rose to fame with Black Sabbath before building a major solo rock career.", image: "/images/peoples/set4/7.png" },
            { id: 8, answer: "LADY GAGA", clue: "Pop singer, songwriter, and Oscar-winning actress.", funFact: "Known for bold fashion eras, vocal range, and chart-topping pop albums.", image: "/images/peoples/set4/8.png" },
            { id: 9, answer: "COCO CHANEL", clue: "French fashion designer who popularized modern women's silhouettes.", funFact: "Known for tweed suits, quilted bags, and timeless minimalist elegance.", image: "/images/peoples/set4/9.png" },
            { id: 10, answer: "NIKOLA TESLA", clue: "Inventor and electrical engineer behind AC power systems.", funFact: "Pioneered alternating current induction motors and high-voltage experiments.", image: "/images/peoples/set4/10.png" },
            { id: 11, answer: "SIA", clue: "Australian singer-songwriter known for powerful vocals and visual disguises.", funFact: "Wrote major hits for other artists alongside solo tracks like 'Chandelier'.", image: "/images/peoples/set4/11.png" },
            { id: 12, answer: "JACKIE CHAN", clue: "Martial artist and actor famous for acrobatic stunts and comedy.", funFact: "Performed countless intricate stunts combining kung fu choreography with slapstick timing.", image: "/images/peoples/set4/12.png" },
            { id: 13, answer: "MARK ZUCKERBERG", clue: "Co-founder and CEO of Facebook and Meta.", funFact: "Launched the social network from his college dorm room in 2004.", image: "/images/peoples/set4/13.png" },
            { id: 14, answer: "EFREN REYES", clue: "Legendary Filipino billiards player known as 'The Magician'.", funFact: "Famous for creative trick shots and winning world pool championships.", image: "/images/peoples/set4/14.png" },
            { id: 15, answer: "VALENTINO ROSSI", clue: "Multi-time MotoGP world champion motorcycle racer.", funFact: "Iconic for his number 46 and bright yellow racing gear.", image: "/images/peoples/set4/15.png" }
          ]
        },
        {
          id: 5,
          name: 'Set 05: Champions, Creators & Icons',
          puzzles: [
            { id: 1, answer: "CRISTIANO RONALDO", clue: "Portuguese football superstar with record international goals.", funFact: "Has won top honors across multiple European leagues and international tournaments.", image: "/images/peoples/set5/1.png" },
            { id: 2, answer: "KOBE BRYANT", clue: "Five-time NBA champion known as the Black Mamba.", funFact: "Spent his entire 20-season NBA career with the Los Angeles Lakers.", image: "/images/peoples/set5/2.png" },
            { id: 3, answer: "BABE RUTH", clue: "Baseball legend who transformed home run hitting.", funFact: "Began his career as an elite pitcher before becoming baseball's premier slugger.", image: "/images/peoples/set5/3.png" },
            { id: 4, answer: "KARL MARX", clue: "19th-century philosopher and economist behind Das Kapital.", funFact: "His writings deeply influenced modern political and economic theory.", image: "/images/peoples/set5/4.png" },
            { id: 5, answer: "CONNOR MGCREGOR", clue: "Irish mixed martial artist and two-division UFC champion.", funFact: "Became one of the highest-drawing stars in combat sports history.", image: "/images/peoples/set5/5.png" },
            { id: 6, answer: "BANKSY", clue: "Anonymous street artist and satirical muralist.", funFact: "Known for stenciled works with political and social commentary worldwide.", image: "/images/peoples/set5/6.png" },
            { id: 7, answer: "MRBEAST", clue: "Digital creator famous for high-budget challenges and philanthropy.", funFact: "Known for large-scale stunts, giveaways, and charity initiatives online.", image: "/images/peoples/set5/7.png" },
            { id: 8, answer: "STEVIE WONDER", clue: "Soul and R&B legend and multi-instrumentalist.", funFact: "Signed with Motown as a child prodigy and won dozens of Grammy Awards.", image: "/images/peoples/set5/8.png" },
            { id: 9, answer: "ALEXANDER GRAHAM BELL", clue: "Inventor closely associated with the practical telephone.", funFact: "Conducted early acoustic experiments and founded major telecommunications ventures.", image: "/images/peoples/set5/9.png" },
            { id: 10, answer: "JK ROWLING", clue: "Author behind the global Harry Potter book series.", funFact: "Created the wizarding school saga that became a worldwide publishing phenomenon.", image: "/images/peoples/set5/10.png" },
            { id: 11, answer: "LEONARD NIMOY", clue: "Actor famous for portraying Spock in Star Trek.", funFact: "Helped shape the logical Vulcan greeting and hand gesture.", image: "/images/peoples/set5/11.png" },
            { id: 12, answer: "OLIVIA RODRIGO", clue: "Grammy-winning pop and alternative singer-songwriter.", funFact: "Broke streaming records with her debut single 'Drivers License'.", image: "/images/peoples/set5/12.png" },
            { id: 13, answer: "JIM CARREY", clue: "Elastic physical comedian and dramatic actor.", funFact: "Known for expressive comedic roles as well as dramatic performances.", image: "/images/peoples/set5/13.png" },
            { id: 14, answer: "JEFF BEZOS", clue: "Founder of Amazon and space company Blue Origin.", funFact: "Started Amazon as an online bookstore in the mid-1990s.", image: "/images/peoples/set5/14.png" },
            { id: 15, answer: "NILE RODGERS", clue: "Guitarist, songwriter, and producer behind Chic and countless hits.", funFact: "Co-wrote and produced landmark dance, pop, and funk tracks across decades.", image: "/images/peoples/set5/15.png" }
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

  // Calculate total puzzles and solved count per category
  const getCategoryStats = (cat) => {
    let total = 0;
    let solved = 0;
    cat.sets.forEach((set) => {
      total += set.puzzles.length;
      set.puzzles.forEach((p) => {
        if (solvedPuzzles[getPuzzleKey(cat.id, set.id, p.id)]) solved++;
      });
    });
    return { total, solved };
  };

  // Calculate solved count per set
  const getSetSolvedCount = (catId, setId, setPuzzles) => {
    let count = 0;
    setPuzzles.forEach((p) => {
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
        setSolvedPuzzles((prev) => ({ ...prev, [key]: true }));
        setCoins((prev) => prev + 10);
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
              ✨ Know it?<br />Show it.
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
                  const { total, solved } = getCategoryStats(cat);
                  const progressPercent = total > 0 ? (solved / total) * 100 : 0;

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
                            <div className="text-xs font-bold text-slate-700 mt-0.5">{solved} / {total} Solved</div>
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
                          style={{ width: `${progressPercent}%` }}
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
            <div className="space-y-3 flex-1 flex flex-col">
              <button
                onClick={() => setCurrentScreen('home')}
                className="self-start bg-white border-2 border-ink px-3 py-1 rounded-xl font-bold text-xs shadow-cartoon-sm"
              >
                ⬅️ Back to Categories
              </button>

              <div className="text-center my-0.5">
                <span className="text-3xl">{selectedCategory.emoji}</span>
                <h3 className="font-black text-xl mt-0.5">{selectedCategory.name}</h3>
                <p className="text-xs font-bold text-slate-600">Select a Set to Play</p>
              </div>

              <div className="space-y-2.5 flex-1 flex flex-col justify-center pb-4 overflow-y-auto">
                {selectedCategory.sets.map((set) => {
                  const setSolved = getSetSolvedCount(selectedCategory.id, set.id, set.puzzles);
                  const setTotal = set.puzzles.length;

                  return (
                    <button
                      key={set.id}
                      onClick={() => {
                        setSelectedSet(set);
                        setCurrentScreen('grid');
                      }}
                      className={`w-full border-3 border-ink p-3 rounded-2xl font-black text-left flex justify-between items-center shadow-cartoon transition-transform active:translate-x-0.5 active:translate-y-0.5 shrink-0 ${
                        setSolved === setTotal ? 'bg-mintGreen' : 'bg-electricYellow hover:bg-yellow-300'
                      }`}
                    >
                      <div>
                        <div className="text-sm">{set.name}</div>
                        <div className="text-[11px] font-bold text-slate-700 mt-0.5">{setTotal} Puzzles Available</div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-cartoon-sm text-xs shrink-0">
                        <span>{setSolved} / {setTotal}</span>
                        <span>{setSolved === setTotal ? '✓' : '→'}</span>
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