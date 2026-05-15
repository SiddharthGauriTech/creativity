"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- PIXIE DUST TRAIL COMPONENT ---
const PixieDust = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const id = Date.now() + Math.random();

      setTrail(prev => {
        const newTrail = [...prev, { id, x, y }];
        return newTrail.length > 20 ? newTrail.slice(newTrail.length - 20) : newTrail;
      });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {trail.map(t => (
          <motion.div
            key={t.id}
            className="absolute w-1.5 h-1.5 bg-[#fef08a] rounded-full shadow-[0_0_10px_#fef08a]"
            initial={{ opacity: 0.8, scale: 1, left: t.x, top: t.y }}
            animate={{ opacity: 0, scale: 0, top: t.y + 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- FLOATING CANDLES COMPONENT ---
const FloatingCandles = () => {
  const [candles, setCandles] = useState([]);
  useEffect(() => {
    setCandles(Array.from({ length: 20 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      delay: Math.random() * 5, duration: 3 + Math.random() * 4,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className="absolute w-2 h-8 bg-white/10 rounded-sm backdrop-blur-sm"
          style={{ left: `${candle.x}vw`, top: `${candle.y}vh` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: candle.duration, delay: candle.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-orange-400 rounded-full blur-[1px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.1 + Math.random() * 0.2, repeat: Infinity }}
          />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-400/20 rounded-full blur-md" />
        </motion.div>
      ))}
    </div>
  );
};

// --- MIRROR OF ERISED COMPONENT ---
const MirrorOfErised = ({ amortentiaActive }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const activateMirror = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(s);
    } catch (err) {
      alert("The mirror needs your permission to reveal its magic.");
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`w-[85vw] sm:w-[400px] h-[55vh] sm:h-[65vh] snap-center shrink-0 relative rounded-[2rem] overflow-hidden border-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-colors duration-1000 flex flex-col items-center justify-center ${amortentiaActive ? 'border-pink-500/50 bg-pink-950/30' : 'border-[#d4af37]/50 bg-[#050505]'}`}>
      {!stream ? (
        <div className="text-center p-8 z-10">
          <h3 className={`text-3xl font-serif mb-6 drop-shadow-md ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>The Mirror of My Soul</h3>
          <p className="text-gray-400 text-sm mb-10 italic leading-relaxed">"It reveals not your reflection, but the deepest love that dwells within my heart."</p>
          <motion.button
            onClick={activateMirror}
            className={`px-8 py-4 rounded-full font-serif text-sm tracking-widest uppercase transition-all duration-300 shadow-xl ${amortentiaActive ? 'bg-pink-900/60 text-pink-200 border border-pink-500/50 hover:bg-pink-800' : 'bg-yellow-900/40 text-yellow-200 border border-yellow-600/50 hover:bg-yellow-800/60'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: amortentiaActive ? ["0px 0px 10px rgba(236,72,153,0.3)", "0px 0px 25px rgba(236,72,153,0.6)", "0px 0px 10px rgba(236,72,153,0.3)"] : ["0px 0px 10px rgba(212,175,55,0.2)", "0px 0px 25px rgba(212,175,55,0.5)", "0px 0px 10px rgba(212,175,55,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            See My Heart's Truth
          </motion.button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] filter contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <motion.div
            className="absolute bottom-[calc(6rem+env(safe-area-inset-bottom))] left-0 right-0 text-center px-8 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="bg-black/20 backdrop-blur-[2px] py-4 rounded-2xl border border-white/5 shadow-2xl">
              <h3 className={`text-3xl font-serif mb-2 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>My Eternal Desire</h3>
              <p className="text-white text-sm italic drop-shadow-lg font-serif px-4">On April 22nd, you became the magic that turned my dreams into reality, my love.</p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

// --- GOLDEN SNITCH COMPONENT ---
const GoldenSnitch = ({ onCatch }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const flyInterval = setInterval(() => {
      if (Math.random() > 0.2) {
        setIsFlying(true);
        setPosition({
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 300),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 100 : 500)
        });
        setTimeout(() => setIsFlying(false), 3000);
      }
    }, 3000);
    return () => clearInterval(flyInterval);
  }, []);

  if (!isFlying) return null;

  return (
    <motion.div
      className="fixed z-[150] w-32 h-32 cursor-pointer flex items-center justify-center drop-shadow-[0_0_20px_#fbbf24]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [1, 1.2, 1], opacity: 1, left: position.x, top: position.y }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      onClick={(e) => { e.stopPropagation(); onCatch(); }}
      onTouchStart={(e) => { e.stopPropagation(); onCatch(); }}
    >
      <div className="w-5 h-5 bg-yellow-400 rounded-full shadow-[0_0_25px_#fbbf24] relative pointer-events-none flex flex-col items-center">
        {/* Wings */}
        <motion.div
          className="absolute top-1/2 -left-10 w-10 h-3 bg-white/90 blur-[1px] rounded-full -translate-y-1/2 origin-right"
          animate={{ rotateY: [0, 70, 0], rotateZ: [-10, 10, -10] }}
          transition={{ duration: 0.05, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 -right-10 w-10 h-3 bg-white/90 blur-[1px] rounded-full -translate-y-1/2 origin-left"
          animate={{ rotateY: [0, 70, 0], rotateZ: [10, -10, 10] }}
          transition={{ duration: 0.05, repeat: Infinity }}
        />

        {/* Hint Text */}
        <motion.p
          className="absolute top-10 -ml-10 text-[9px] font-serif text-yellow-300 tracking-[3px] uppercase whitespace-nowrap bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none border border-yellow-500/30"
          animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Catch My Heart!
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- EXPECTO PATRONUM VOICE COMPONENT ---
const PatronusCharm = () => {
  const [listening, setListening] = useState(false);
  const [spellCast, setSpellCast] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const startListening = () => {
    if (typeof window === 'undefined') return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Browser voice magic not supported (try Chrome/Safari). Tap here to cast manually!");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      setError("");
      setTranscript("Listening...");
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript.toLowerCase();
      setTranscript(`"${result}"`);

      // Allow generous matching for the spell
      if (result.includes("expect") || result.includes("patron") || result.includes("petron") || result.includes("specto") || result.includes("pecto")) {
        setSpellCast(true);
        recognition.stop();
        if (window.navigator && window.navigator.vibrate) window.navigator.vibrate([200, 100, 400]);
      }
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error !== 'no-speech') {
        setError("The magic faded. Try again.");
      } else {
        setError("Speak louder, I couldn't hear the spell!");
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="min-h-[80svh] snap-start flex flex-col items-center justify-center px-6 relative mt-10">
      <AnimatePresence>
        {spellCast && (
          <motion.div
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ background: "radial-gradient(circle at center, #bae6fd 0%, #0ea5e9 40%, #0284c7 100%)" }}
          >
            {/* Massive flash of light */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            {/* Floating Patronus Orbs */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 bg-white/20 rounded-full blur-xl mix-blend-overlay"
                initial={{ x: "50vw", y: "50vh", scale: 0 }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: Math.random() * 3 + 1
                }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: "mirror" }}
              />
            ))}

            <motion.div
              className="z-10 text-center px-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.5 }}
            >
              <h2 className="text-4xl sm:text-6xl font-serif text-white mb-6 drop-shadow-[0_0_30px_#fff]">You are My Eternal Patronus.</h2>
              <p className="text-sky-100 text-lg sm:text-xl font-serif italic max-w-lg mx-auto leading-relaxed drop-shadow-md">
                "With you by my side, no shadow can ever touch my soul. Thank you for being the light that guides me home, my love."
              </p>
              <div className="mt-12 w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.8)]">
                <motion.img
                  src="/magical_owl.png"
                  alt="Owl Patronus"
                  className="w-24 h-24 object-cover rounded-full filter brightness-200 contrast-125 sepia-[0.3] hue-rotate-[180deg]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Close button so they aren't trapped */}
            <motion.button
              className="absolute top-10 right-10 text-white/50 hover:text-white"
              onClick={() => setSpellCast(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center z-10 w-full max-w-md bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-[#d4af37]/20 shadow-2xl">
        <h2 className="text-3xl font-serif text-[#d4af37] mb-4">The Heart's Eternal Seal</h2>
        <p className="text-gray-400 text-sm italic mb-10 leading-relaxed">
          Only the purest magic of our love can reveal this final secret. Speak the words that guard our hearts:
          <br /><strong className="text-[#fef08a] mt-4 text-xl inline-block font-serif tracking-widest drop-shadow-[0_0_10px_rgba(254,240,138,0.5)]">"Expecto Patronum"</strong>
        </p>

        <div className="flex flex-col items-center min-h-[160px]">
          <motion.button
            onClick={() => {
              if (error.includes("not supported")) setSpellCast(true);
              else startListening();
            }}
            className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-300 ${listening ? 'bg-sky-900/40 border-sky-400 text-sky-300' : 'bg-transparent border-[#d4af37]/50 text-[#d4af37]'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={listening ? { boxShadow: ["0px 0px 20px rgba(14,165,233,0.4)", "0px 0px 50px rgba(14,165,233,0.8)", "0px 0px 20px rgba(14,165,233,0.4)"] } : { boxShadow: "0px 0px 20px rgba(212,175,55,0.1)" }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-4xl">{listening ? '🎙️' : '🪄'}</span>
          </motion.button>

          <div className="mt-6 h-12 flex flex-col items-center justify-center">
            {transcript && <p className="text-sky-300/90 text-sm font-mono italic animate-pulse">{transcript}</p>}
            {error && <p className="text-red-400/90 text-xs mt-1 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- DAILY PROPHET COMPONENT ---
const DailyProphet = ({ amortentiaActive }) => {
  return (
    <section className="min-h-[100svh] h-auto snap-start flex flex-col items-center justify-center px-3 sm:px-6 relative py-12 overflow-hidden">
      <motion.div
        className={`w-full max-w-2xl bg-[#e8dcb8] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative p-4 sm:p-10 text-black flex flex-col items-center border border-[#c4b595] transition-all duration-1000 ${amortentiaActive ? 'sepia-[0.3] hue-rotate-[320deg] brightness-90' : 'sepia-[0.5]'}`}
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
        }}
        initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
        whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, type: "spring", damping: 20 }}
      >
        {/* Header */}
        <div className="w-full border-b-4 border-double border-[#3a2c1f] pb-3 sm:pb-4 mb-4 sm:mb-6 text-center pt-1 sm:pt-4">
          <h2 className="font-serif text-[2.5rem] sm:text-7xl leading-none font-black tracking-tighter text-[#2c1f14] uppercase mb-2 sm:mb-4 drop-shadow-sm">
            The Daily Prophet
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-xs font-serif uppercase tracking-widest border-t border-b border-[#3a2c1f] py-1 sm:py-1.5 text-[#4a3b2c] mt-2 gap-1 sm:gap-0">
            <span>Vol. CLXXI</span>
            <span>London, Saturday, May 16</span>
            <span>1 Knut</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-[1.35rem] sm:text-4xl text-center font-bold text-[#2c1f14] leading-tight mb-4 sm:mb-6 uppercase tracking-tight px-1 sm:px-2">
          A Love Stronger Than Magic:<br /> The Universe Celebrates Prakriti's Birthday!
        </h3>

        {/* Moving Picture */}
        <div className="w-full max-w-sm mx-auto aspect-[4/5] relative border-4 border-[#3a2c1f] p-1 bg-[#c4b595] mb-4 sm:mb-6 overflow-hidden shadow-inner">
          <motion.img
            src="/daily4.jpeg"
            alt="Moving Picture"
            className="w-full h-full object-cover object-top filter contrast-[1.15] brightness-[1.05] will-change-transform"
            animate={{
              scale: [1, 1.05, 1],
              x: [0, -5, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay opacity-30 pointer-events-none" />
        </div>

        {/* Article Text */}
        <div className="columns-1 sm:columns-2 gap-6 text-[#3a2c1f] font-serif text-xs sm:text-sm text-justify leading-relaxed">
          <p className="mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl float-left mr-1.5 sm:mr-2 font-bold mt-[-4px] sm:mt-[-6px]">T</span>he stars above Hogwarts align perfectly today to celebrate Prakriti, the girl who brought true magic into Siddharth’s life. Ministry experts confirm that the moment their eyes met, a spell more powerful than the Unbreakable Vow was cast.
          </p>
          <p className="mb-3 sm:mb-4">
            "It is whispered through the Department of Mysteries that her smile is crafted from pure Felix Felicis," reported an Unspeakable. "And her laugh is the only Patronus he will ever need to chase the darkness away."
          </p>
          <p>
            On April 22nd, she stole his heart forever. Today, the entire wizarding world pauses to wish his soulmate the happiest of birthdays. He solemnly swears that he is entirely, unconditionally, and eternally hers.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default function BirthdayMagic() {
  const [taps, setTaps] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [secretVowRevealed, setSecretVowRevealed] = useState(false);

  const [snitchCaught, setSnitchCaught] = useState(false);
  const [amortentiaActive, setAmortentiaActive] = useState(false);
  const [heartMode, setHeartMode] = useState(false);
  const [mischiefManaged, setMischiefManaged] = useState(false);

  // Real-Time Sky Sync State
  const [skyTheme, setSkyTheme] = useState("night");

  // Holographic Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Audio Refs
  const hedwigAudioRef = useRef(null);
  const romanticAudioRef = useRef(null);

  const [timeTogether, setTimeTogether] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  const message = `My Dearest Prakriti,

Like a patronus in the dark, you brought light into my world when I least expected it.

You are the magic I never knew I was looking for. Every moment with you feels like discovering a new spell, something beautiful and entirely ours.

Happy Birthday, my love. I solemnly swear that I am yours, always.

— Siddharth 🦉✨`;

  // Real-Time Sky Sync Logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setSkyTheme("day"); // Twilight/Daytime blue
    } else {
      setSkyTheme("night"); // Midnight dark
    }
  }, []);

  // Heartbeat Haptic Effect for Finale
  useEffect(() => {
    let heartbeatInterval;
    if (mischiefManaged) {
      heartbeatInterval = setInterval(() => {
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([100, 100, 150]); // Thump... Thump
        }
      }, 1200);
    }
    return () => clearInterval(heartbeatInterval);
  }, [mischiefManaged]);

  // Audio Playback Logic
  useEffect(() => {
    if (unlocked && !amortentiaActive && hedwigAudioRef.current) {
      hedwigAudioRef.current.volume = 0.4;
      hedwigAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  }, [unlocked, amortentiaActive]);

  useEffect(() => {
    if (amortentiaActive) {
      if (hedwigAudioRef.current && romanticAudioRef.current) {
        let vol = 0.4;
        const fadeOut = setInterval(() => {
          vol -= 0.05;
          if (vol <= 0) {
            clearInterval(fadeOut);
            hedwigAudioRef.current.pause();
          } else {
            hedwigAudioRef.current.volume = vol;
          }
        }, 300);

        romanticAudioRef.current.volume = 0;
        romanticAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
        let volIn = 0;
        const fadeIn = setInterval(() => {
          volIn += 0.05;
          if (volIn >= 0.5) {
            clearInterval(fadeIn);
          } else {
            romanticAudioRef.current.volume = volIn;
          }
        }, 300);
      }
    }
  }, [amortentiaActive]);

  // Time Together Count-Up Logic
  useEffect(() => {
    // You can change this date to the exact day you started dating or met!
    const startDate = new Date("2026-02-22T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - startDate;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!letterOpened) {
      setTypedText("");
      return;
    }
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(message.slice(0, index));
      index++;
      if (index > message.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [letterOpened, message]);

  // Holographic Device Orientation Listener
  useEffect(() => {
    const handleOrientation = (e) => {
      const x = e.gamma ? Math.max(-20, Math.min(20, e.gamma)) : 0;
      const y = e.beta ? Math.max(-20, Math.min(20, e.beta - 45)) : 0;
      setTilt({ x: x / 1.5, y: y / 1.5 });
    };

    const handleMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = ((e.clientX / w) - 0.5) * 30;
      const y = ((e.clientY / h) - 0.5) * -30;
      setTilt({ x, y });
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleTap = (e) => {
    if (unlocked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const targetX = clientX - rect.left;
    const targetY = clientY - rect.top;

    const edge = Math.floor(Math.random() * 4);
    let originX = 0, originY = 0;
    const w = typeof window !== 'undefined' ? window.innerWidth : 500;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    if (edge === 0) { originX = Math.random() * w; originY = -200; }
    else if (edge === 1) { originX = w + 200; originY = Math.random() * h; }
    else if (edge === 2) { originX = Math.random() * w; originY = h + 200; }
    else { originX = -200; originY = Math.random() * h; }

    const newTap = { id: Date.now(), x: targetX, y: targetY, originX, originY };

    setTaps(prev => {
      if (prev.length >= 5) return prev; // Prevent adding more than 5 stars

      const updated = [...prev, newTap];
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        if (updated.length >= 5) window.navigator.vibrate([100, 50, 100, 50, 200]);
        else window.navigator.vibrate(30);
      }
      if (updated.length >= 5) {
        setTimeout(() => setHeartMode(true), 500); // Pause briefly, then form heart
        setTimeout(() => setUnlocked(true), 3500); // Unlock after admiring the heart
      }
      return updated;
    });
  };

  const getHeartPos = (i) => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2 - 40;
    const R = 90;
    const pts = [
      { x: cx, y: cy + R * 1.3 },            // 0: Bottom
      { x: cx - R * 1.1, y: cy - R * 0.2 },  // 1: Left mid
      { x: cx - R * 0.5, y: cy - R },        // 2: Top left
      { x: cx + R * 0.5, y: cy - R },        // 3: Top right
      { x: cx + R * 1.1, y: cy - R * 0.2 }   // 4: Right mid
    ];
    return pts[i % 5] || { x: cx, y: cy };
  };

  const memories = [
    { title: "The Sorting", desc: "The moment the universe decided we belonged in the exact same story.", img: "/day_one.jpeg" },
    { title: "Felix Felicis", desc: "Every single second with you feels like liquid luck.", img: "/memory2.jpeg" },
    { title: "The Unbreakable Vow", desc: "To always be your safe place, in this life and every one after.", img: "/vow.jpeg" }
  ];

  return (
    <main className={`min-h-[100svh] text-white overflow-hidden relative selection:bg-[#d4af37] selection:text-black font-sans transition-colors duration-1000 perspective-1000 ${amortentiaActive
      ? 'bg-[#1f0a14]'
      : skyTheme === 'day'
        ? 'bg-[#0f172a]' // Lighter twilight blue during the day
        : 'bg-[#030712]' // Pitch black at night
      }`}>

      {/* Hidden Audio Players */}
      <audio ref={hedwigAudioRef} src="/hedwigs_theme.mp3" loop />
      <audio ref={romanticAudioRef} src="/romantic_song.mp3" loop />

      {/* Pixie Dust Global Effect */}
      {unlocked && <PixieDust />}
      {unlocked && <FloatingCandles />}

      {/* Amortentia Vibe Overlay */}
      {amortentiaActive && (
        <motion.div
          className="fixed inset-0 z-[1] bg-gradient-to-b from-[#4a0b1f]/80 to-[#1f0a14]/90 pointer-events-none mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        />
      )}

      {/* ENTRANCE: The Lumos Spell */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center cursor-pointer"
            onClick={handleTap}
            onTouchStart={handleTap}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, transition: { duration: 1.5, ease: "easeInOut" } }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AnimatePresence>
                {taps.map((tap, i) => (
                  <motion.div
                    key={tap.id}
                    initial={{ x: tap.originX, y: tap.originY, scale: 0, opacity: 0, rotate: 180 }}
                    animate={{
                      x: heartMode ? getHeartPos(i).x : tap.x,
                      y: heartMode ? getHeartPos(i).y : tap.y,
                      scale: 1, opacity: 1, rotate: 0
                    }}
                    transition={{ type: "spring", damping: 14, stiffness: 90, duration: heartMode ? 1.5 : undefined }}
                    className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-4xl drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                    style={{ left: 0, top: 0 }}
                  >
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      ✨
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-[-1]">
                {taps.map((tap, i) => {
                  if (i === 0) return null;
                  const prev = taps[i - 1];
                  return (
                    <motion.line
                      key={`line-${i}`}
                      initial={{
                        pathLength: 0,
                        x1: prev.x, y1: prev.y,
                        x2: tap.x, y2: tap.y
                      }}
                      animate={{
                        x1: heartMode ? getHeartPos(i - 1).x : prev.x,
                        y1: heartMode ? getHeartPos(i - 1).y : prev.y,
                        x2: heartMode ? getHeartPos(i).x : tap.x,
                        y2: heartMode ? getHeartPos(i).y : tap.y,
                        pathLength: 1
                      }}
                      transition={{ duration: heartMode ? 1.5 : 0.5, type: heartMode ? "spring" : "tween", damping: 15 }}
                      stroke="#d4af37" strokeWidth="2" strokeOpacity="0.5"
                    />
                  );
                })}
                {heartMode && taps.length === 5 && (
                  <motion.line
                    initial={{
                      pathLength: 0,
                      x1: getHeartPos(4).x, y1: getHeartPos(4).y,
                      x2: getHeartPos(0).x, y2: getHeartPos(0).y
                    }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    stroke="#d4af37" strokeWidth="2" strokeOpacity="0.5"
                  />
                )}
              </svg>

              {heartMode && taps.length === 5 && (
                <motion.div
                  className="absolute z-10 text-[#d4af37]"
                  style={{ left: '50%', top: 'calc(50% - 40px)', x: '-50%', y: '-50%' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ delay: 1.2, type: "spring", damping: 8, stiffness: 150 }}
                >
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="url(#redGradient)" filter="drop-shadow(0px 0px 25px rgba(255,20,60,0.9))">
                    <defs>
                      <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff8a8a" />
                        <stop offset="50%" stopColor="#ff0033" />
                        <stop offset="100%" stopColor="#99001f" />
                      </linearGradient>
                    </defs>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              )}
            </div>

            <motion.div className="text-center z-10 pointer-events-none px-6" animate={{ opacity: taps.length >= 5 ? 0 : 1 }}>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#d4af37] tracking-[0.2em] uppercase mb-4 opacity-80">I solemnly swear that my love for you... is written in the stars, now and forever.</h1>
              <p className="text-gray-400 text-sm tracking-widest font-light animate-pulse">Tap to illuminate my soul</p>
              <div className="mt-12 flex justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${i < taps.length ? 'bg-[#d4af37] shadow-[0_0_15px_#d4af37] scale-125' : 'bg-gray-800'}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SITE */}
      {unlocked && (
        <motion.div
          className="relative z-10 h-[100svh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth pb-20"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Snitch Game */}
          {!snitchCaught && !letterOpened && (
            <GoldenSnitch onCatch={() => {
              setSnitchCaught(true);
              if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate([200, 100, 200]);
              }
            }} />
          )}

          {/* Falling Candles OR Rose Petals */}
          <div className="fixed inset-0 pointer-events-none z-[-1]">
            {[...Array(amortentiaActive ? 30 : 15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-sm blur-[1px] ${amortentiaActive ? 'w-3 h-4 bg-pink-400/60 rounded-tl-full rounded-br-full' : 'w-1.5 h-6 bg-yellow-100/60'}`}
                initial={{
                  y: amortentiaActive ? "-10vh" : "110vh", x: `${Math.random() * 100}vw`,
                  opacity: 0.2 + Math.random() * 0.4, rotate: amortentiaActive ? Math.random() * 360 : 0
                }}
                animate={{
                  y: amortentiaActive ? "110vh" : "-10vh",
                  x: amortentiaActive ? `${Math.random() * 100 + (Math.random() > 0.5 ? 20 : -20)}vw` : undefined,
                  rotate: amortentiaActive ? Math.random() * 360 + 180 : 0
                }}
                transition={{ duration: (amortentiaActive ? 8 : 20) + Math.random() * 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
              >
                {!amortentiaActive && (
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-orange-300 rounded-full blur-[2px]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 0.1 + Math.random() * 0.2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Hero Section */}
          <section className="min-h-[100svh] snap-start flex flex-col items-center justify-center px-6 relative pt-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 1 }}
              className="text-center w-full relative z-10"
              style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: "preserve-3d" }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 opacity-90 mix-blend-screen relative" style={{ transform: "translateZ(30px)" }}>
                <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-2xl opacity-20 animate-pulse" />
                <img src="/magical_owl.png" alt="Owl" className="w-full h-full object-cover rounded-full border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
              </div>

              <p className={`tracking-[6px] text-[10px] sm:text-xs uppercase mb-4 opacity-80 transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>Our Magical Story</p>

              <h1 className={`text-6xl sm:text-8xl font-serif tracking-tighter text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] py-2 transition-colors duration-1000 ${amortentiaActive ? 'bg-gradient-to-b from-pink-200 to-pink-500' : 'bg-gradient-to-b from-[#fef08a] to-[#d4af37]'}`} style={{ transform: "translateZ(50px)" }}>
                Prakriti
              </h1>

              <p className="mt-6 text-gray-300 max-w-md mx-auto text-base sm:text-lg italic font-serif leading-relaxed px-4">
                "They say it is unwise to dwell on dreams, but how can I not when my reality with you is more magical than any dream I've ever had."
              </p>
            </motion.div>

            {/* Magical Time Together Counter */}
            <motion.div
              className="mt-12 sm:mt-16 grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg px-2 relative z-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
            >
              {Object.entries(timeTogether).map(([unit, value]) => (
                <div key={unit} className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border backdrop-blur-md transition-colors duration-1000 ${amortentiaActive ? 'bg-pink-950/30 border-pink-500/30 shadow-[0_0_15px_rgba(244,114,182,0.15)]' : 'bg-black/30 border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]'}`}>
                  <span className={`text-2xl sm:text-4xl font-serif mb-1 sm:mb-2 drop-shadow-md transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300' : 'text-white'}`}>{value.toString().padStart(2, '0')}</span>
                  <span className={`text-[8px] sm:text-[10px] tracking-widest uppercase transition-colors duration-1000 ${amortentiaActive ? 'text-pink-400' : 'text-[#d4af37]'}`}>{unit}</span>
                </div>
              ))}
            </motion.div>
            <motion.p
              className="mt-6 text-[10px] tracking-[4px] uppercase text-gray-500 font-serif"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            >
              Every second since I first held your hand has been pure enchantment.
            </motion.p>
          </section>

          {/* Daily Prophet Section */}
          <DailyProphet amortentiaActive={amortentiaActive} />

          {/* The Pensieve */}
          <section className="min-h-[100svh] snap-start flex flex-col justify-center px-0 py-20 relative overflow-hidden">
            <div className="text-center mb-10 px-6 relative z-10">
              <h2 className={`text-4xl sm:text-5xl font-serif mb-3 transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]' : 'text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]'}`}>The Pensieve of Our Hearts</h2>
              <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase">A journey through our most beautiful memories</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 hide-scrollbar px-6 sm:px-10 relative z-10 perspective-1000">
              {memories.map((mem, i) => (
                <motion.div
                  key={i}
                  style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: "preserve-3d" }}
                  className={`w-[85vw] sm:w-[400px] h-[55vh] sm:h-[65vh] snap-center shrink-0 relative rounded-[2rem] overflow-hidden border shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-colors duration-1000 ${amortentiaActive ? 'border-pink-500/30' : 'border-[#d4af37]/30'}`}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent z-10" />
                  {i === 1 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent pointer-events-none z-[11] mix-blend-overlay"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {i === 2 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-red-600/10 pointer-events-none z-[11] mix-blend-screen"
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {mem.img.endsWith('.mp4') ? (
                    <video
                      src={mem.img}
                      autoPlay loop muted playsInline
                      className={`w-full h-full object-cover filter transition-all duration-1000 ${amortentiaActive ? 'brightness-100 saturate-150 hue-rotate-[320deg]' : 'brightness-90 sepia-[0.2]'}`}
                    />
                  ) : (
                    <motion.img
                      src={mem.img}
                      alt={mem.title}
                      className={`w-full h-full object-cover filter transition-all duration-1000 ${amortentiaActive ? 'brightness-110 saturate-150 hue-rotate-[320deg]' : i === 1 ? 'brightness-115 contrast-[1.25] saturate-[1.2] sepia-[0.1]' : i === 2 ? 'brightness-105 contrast-[1.3] saturate-[1.1] brightness-[1.08]' : 'brightness-105 contrast-[1.2] saturate-[1.1]'} will-change-transform`}
                      animate={{
                        scale: [1, 1.03, 1],
                        rotate: [0, 0.5, -0.5, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      {/* <div className={`w-6 h-[1px] ${amortentiaActive ? 'bg-pink-400' : 'bg-[#d4af37]'}`} /> */}
                      {/* <p className={`text-[10px] tracking-widest uppercase ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>Memory 0{i + 1}</p> */}
                    </div>
                    <h3 className={`text-3xl sm:text-4xl font-serif mb-4 transition-colors duration-1000 drop-shadow-md ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>{mem.title}</h3>
                    <p className="text-white text-sm sm:text-base leading-relaxed font-medium drop-shadow-lg">{mem.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* The Mirror of Erised */}
              <motion.div
                style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: "preserve-3d" }}
              >
                <MirrorOfErised amortentiaActive={amortentiaActive} />
              </motion.div>
            </div>

            {/* Amortentia Button */}
            {!amortentiaActive && (
              <motion.div className="flex flex-col items-center mt-6 relative z-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <motion.button
                  className="w-14 h-14 rounded-full border border-pink-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.3)] bg-pink-900/30 backdrop-blur-md"
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(244,114,182,0.5)" }} whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: ["0px 0px 15px rgba(244,114,182,0.4)", "0px 0px 35px rgba(244,114,182,0.8)", "0px 0px 15px rgba(244,114,182,0.4)"],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  onClick={() => {
                    setAmortentiaActive(true);
                    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([50, 100, 50]);
                  }}
                >
                  <span className="text-xl drop-shadow-[0_0_10px_#f472b6]">🧪</span>
                </motion.button>
                <p className="mt-3 text-pink-400/80 text-[9px] uppercase tracking-[3px]">Taste the Potion of My Infinite Love</p>
              </motion.div>
            )}
          </section>

          {/* Owl Post Delivery Climax */}
          <section className="min-h-[100svh] snap-start flex flex-col items-center justify-center px-6 relative">
            <div className="text-center mb-40 sm:mb-52 relative z-10">
              <p className={`text-xs tracking-[5px] uppercase mb-4 transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>Our Greatest Secret</p>
              <h2 className="text-4xl sm:text-5xl font-serif text-white mb-2">Owl Post Delivery</h2>
              <p className="text-gray-400 text-sm italic">A message from my soul, carried on wings of love.</p>
            </div>

            <motion.div
              className={`w-full max-w-[320px] h-[220px] bg-[#631212] rounded-lg relative flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#4a0d0d] z-10`}
              whileHover={sealBroken ? { scale: 1.02 } : {}} whileTap={sealBroken ? { scale: 0.98 } : {}}
              style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none rounded-lg mix-blend-overlay" />

              <svg className="absolute top-0 w-full h-full pointer-events-none rounded-lg overflow-hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L50,50 L100,0" fill="#520e0e" stroke="#3a0909" strokeWidth="0.5" />
                <path d="M0,0 L0,100 L50,50 Z" fill="#631212" stroke="#3a0909" strokeWidth="0.5" />
                <path d="M100,0 L100,100 L50,50 Z" fill="#631212" stroke="#3a0909" strokeWidth="0.5" />
                <path d="M0,100 L100,100 L50,50 Z" fill="#751515" stroke="#3a0909" strokeWidth="0.5" />
              </svg>

              {/* The Wax Seal */}
              <AnimatePresence>
                {!sealBroken && (
                  <motion.div
                    className="absolute w-[70px] h-[70px] bg-[#3a0909] rounded-full border-2 border-[#1f0404] flex items-center justify-center z-20 shadow-[0_0_20px_rgba(255,0,0,0.4)] cursor-pointer"
                    animate={{ boxShadow: ["0px 0px 10px rgba(255,50,50,0.5)", "0px 0px 25px rgba(255,50,50,0.8)", "0px 0px 10px rgba(255,50,50,0.5)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => {
                      setSealBroken(true);
                      setLetterOpened(true);
                      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([100, 50, 100, 200]);
                    }}
                    exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-[58px] h-[58px] rounded-full border border-[#8a1a1a] flex items-center justify-center bg-[#520e0e]">
                      <span className="text-[#d4af37] font-serif text-3xl italic drop-shadow-md">H</span>
                    </div>
                    <div className="absolute inset-0 bg-red-600/10 rounded-full animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Broken Seal Remnants */}
              {sealBroken && (
                <motion.div
                  className="absolute w-[70px] h-[70px] flex items-center justify-center z-10 pointer-events-none opacity-40"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
                >
                  <div className="w-[35px] h-[70px] bg-[#3a0909] rounded-l-full border-l-2 border-y-2 border-[#1f0404] -ml-8 rotate-12" />
                  <div className="w-[35px] h-[70px] bg-[#3a0909] rounded-r-full border-r-2 border-y-2 border-[#1f0404] ml-8 -rotate-12" />
                </motion.div>
              )}

              {!sealBroken && (
                <motion.div
                  className="absolute -top-14 sm:-top-16 flex flex-col items-center pointer-events-none"
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className={`border px-5 py-2.5 rounded-full backdrop-blur-md transition-colors duration-1000 ${amortentiaActive ? 'bg-pink-900/40 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-[#111] border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]'}`}>
                    <p className={`text-[10px] sm:text-xs tracking-[3px] uppercase font-bold transition-colors duration-1000 ${amortentiaActive ? 'text-pink-300' : 'text-[#d4af37]'}`}>
                      Tap to Reveal Our Secrets
                    </p>
                  </div>
                  <div className={`w-[1px] h-8 bg-gradient-to-t to-transparent mt-2 opacity-50 transition-colors duration-1000 ${amortentiaActive ? 'from-pink-400' : 'from-[#d4af37]'}`} />
                </motion.div>
              )}
            </motion.div>
          </section>

          {/* Voice Recognition Module */}
          <PatronusCharm />

          {/* Mischief Managed Button & Secret Easter Egg */}
          <section className="snap-start min-h-[40svh] flex flex-col items-center justify-center pb-20 text-center px-6 relative">
            <p className="text-gray-500 text-xs italic font-serif mb-6 max-w-xs">When you are ready to tuck our magic away and hold me in your heart...</p>
            <motion.button
              onClick={() => {
                setMischiefManaged(true);
                if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([100, 100, 100]);
              }}
              className="px-8 py-3 border border-[#d4af37]/30 rounded-full text-[#d4af37]/80 font-serif tracking-[5px] uppercase text-xs hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-500"
              animate={{ boxShadow: ["0px 0px 10px rgba(212,175,55,0.1)", "0px 0px 20px rgba(212,175,55,0.3)", "0px 0px 10px rgba(212,175,55,0.1)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Magic, Forever Safe
            </motion.button>

            {/* Secret Easter Egg Password */}
            <motion.div className="absolute bottom-[calc(3.5rem+env(safe-area-inset-bottom))] flex flex-col items-center gap-2 w-full">
              <motion.p
                className="text-[10px] text-gray-700 uppercase tracking-[4px] cursor-pointer font-serif px-8 py-4 -my-4"
                onClick={() => {
                  setSecretVowRevealed(true);
                  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) window.navigator.vibrate([50, 50, 50]);
                }}
                animate={{
                  color: ["#374151", "#9ca3af", "#374151"],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, opacity: 1, color: "#d4af37" }}
              >
                I solemnly swear that my heart is yours, always, my love.
              </motion.p>
              <motion.p
                className="text-[10px] text-[#d4af37]/70 tracking-[2px] uppercase font-serif drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ( Tap to Reveal Our Final Secret )
              </motion.p>
            </motion.div>
          </section>

        </motion.div>
      )}

      {/* THE FINALE: MISCHIEF MANAGED */}
      <AnimatePresence>
        {mischiefManaged && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (hedwigAudioRef.current) {
                // Fade out audio on exit
                let vol = hedwigAudioRef.current.volume;
                const fade = setInterval(() => { vol -= 0.05; if (vol <= 0) { clearInterval(fade); hedwigAudioRef.current.pause(); } else hedwigAudioRef.current.volume = vol; }, 200);
              }
              if (romanticAudioRef.current) {
                let vol = romanticAudioRef.current.volume;
                const fade = setInterval(() => { vol -= 0.05; if (vol <= 0) { clearInterval(fade); romanticAudioRef.current.pause(); } else romanticAudioRef.current.volume = vol; }, 200);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 3.5, duration: 3, ease: "easeOut" }}
              className="text-center px-6 flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-widest drop-shadow-[0_0_20px_#fff]">I love you more than words or magic can ever express.</h1>
              <p className="mt-8 text-gray-500 font-serif italic text-sm tracking-[8px] uppercase">Now, until the very end, and beyond.</p>

              <motion.button
                onClick={() => {
                  setMischiefManaged(false);
                  // Resume the correct audio track
                  if (amortentiaActive && romanticAudioRef.current) {
                    romanticAudioRef.current.volume = 0.4;
                    romanticAudioRef.current.play().catch(e => console.log(e));
                  } else if (!amortentiaActive && hedwigAudioRef.current) {
                    hedwigAudioRef.current.volume = 0.4;
                    hedwigAudioRef.current.play().catch(e => console.log(e));
                  }
                }}
                className="mt-20 px-8 py-3 border border-gray-800/80 rounded-full text-gray-500 text-[10px] tracking-[4px] uppercase hover:text-white hover:border-gray-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6, duration: 2 }}
              >
                Relive the Magic
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SNITCH CAUGHT MODAL */}
      <AnimatePresence>
        {snitchCaught && (
          <motion.div
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-md w-full bg-[#111] border border-yellow-500/50 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(251,191,36,0.3)]"
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 20 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-500/50 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                <motion.span className="text-4xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🪽</motion.span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-yellow-400 mb-6 tracking-wider drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">150 Points!</h2>
              <div className="w-16 h-[1px] bg-yellow-500/30 mx-auto mb-6" />
              <p className="text-gray-300 leading-relaxed mb-10 font-serif italic text-lg">
                "You've captured the snitch, but I was the lucky one who captured your heart on April 22nd. You are my greatest prize, now and forever, my love."
              </p>
              <motion.button
                onClick={() => setSnitchCaught(false)}
                className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold rounded-full uppercase tracking-[3px] text-[10px] sm:text-xs shadow-[0_0_20px_#fbbf24]"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                Our Forever Love
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Letter Modal */}
      <AnimatePresence>
        {letterOpened && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-5 sm:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#f4ebd0] rounded-sm p-8 sm:p-14 relative text-black shadow-[0_0_60px_rgba(212,175,55,0.25)] scrollbar-hide"
              initial={{ scale: 0.9, y: 50, rotateX: 10 }} animate={{ scale: 1, y: 0, rotateX: 0 }} transition={{ type: "spring", damping: 25, stiffness: 120 }}
              style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/rice-paper.png")`, boxShadow: "inset 0 0 60px rgba(139, 100, 40, 0.4)" }}
            >
              <button onClick={() => setLetterOpened(false)} className="absolute top-4 right-5 text-3xl text-[#5c4a3d] hover:text-black transition">×</button>
              <div className="flex justify-center mb-10 opacity-70">
                <img src="/magical_owl.png" className="w-20 h-20 rounded-full grayscale mix-blend-multiply border border-[#5c4a3d]" alt="Owl Seal" />
              </div>
              <div className="font-serif text-[1.1rem] sm:text-2xl leading-[2.2] sm:leading-[2.2] text-[#2b2b2b] whitespace-pre-line">
                {typedText}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-[#8b7355] font-bold">|</motion.span>
              </div>
              <div className="mt-16 pt-8 border-t border-[#8b7355]/40 text-center font-serif text-xs sm:text-sm text-[#5c4a3d] tracking-widest uppercase">
                <p>Delivered by Owl Post • May 16th, 2026</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECRET VOW MODAL */}
      <AnimatePresence>
        {secretVowRevealed && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-2xl w-full text-center"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1.5 }}
            >
              <h2 className="text-[#d4af37] font-serif text-3xl sm:text-5xl mb-10 tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Our Eternal Unbreakable Vow</h2>
              <div className="text-gray-300 font-serif text-sm sm:text-lg leading-loose italic max-w-lg mx-auto space-y-6">
                <p>On April 22nd, our souls were bound by a promise that transcends time and space.</p>
                <p>I vow to love you with every beat of my heart, to cherish your magic, and to be your sanctuary until the stars themselves fade.</p>
                <p>You are my everything, my soulmate, and my eternal home.</p>
              </div>
              <motion.button
                onClick={() => setSecretVowRevealed(false)}
                className="mt-16 px-6 py-2 border border-gray-700 rounded-full text-gray-500 text-[10px] uppercase tracking-[3px] hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors duration-500"
              >
                Hide Magic
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </main>
  );
}
