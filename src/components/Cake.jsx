import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Cake({ onNext, onPrev, cakeAudioRef }) {
  const [litCandles, setLitCandles] = useState([true, true, true]);
  const [allOut, setAllOut] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const litCandlesRef = useRef(litCandles);
  const blowOutRef = useRef(null);

  useEffect(() => {
    litCandlesRef.current = litCandles;
  }, [litCandles]);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let animationFrame;

    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 256;
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let blowProgress = 0;

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          // Wind noise from blowing is mostly concentrated in the lower frequencies
          const binsToCheck = 30;
          for (let i = 0; i < binsToCheck; i++) {
            sum += dataArray[i];
          }
          const average = sum / binsToCheck;
          
          if (average > 100) { // Detection threshold for low-frequency blowing
            blowProgress += 1;
            if (blowProgress > 10 && litCandlesRef.current[2] && blowOutRef.current) blowOutRef.current(2);
            if (blowProgress > 20 && litCandlesRef.current[1] && blowOutRef.current) blowOutRef.current(1);
            if (blowProgress > 30 && litCandlesRef.current[0] && blowOutRef.current) blowOutRef.current(0);
          } else {
            blowProgress = Math.max(0, blowProgress - 2); 
          }
          
          animationFrame = requestAnimationFrame(checkVolume);
        };
        checkVolume();
      } catch (err) {
        console.log("Microphone access denied or not available", err);
      }
    };

    if (!allOut) {
      initMic();
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext && audioContext.state !== 'closed') {
         audioContext.close();
      }
    };
  }, [allOut]);

  const blowOut = (index) => {
    if (!litCandles[index]) return;

    // Play music when the first candle is blown out
    if (litCandles.every(c => c) && cakeAudioRef && cakeAudioRef.current) {
      cakeAudioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
    }

    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);
  };

  useEffect(() => {
    blowOutRef.current = blowOut;
  });

  useEffect(() => {
    if (litCandles.every(c => !c) && !allOut) {
      setAllOut(true);

      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E9518F', '#C2185B', '#D8A544', '#FFD9E8', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E9518F', '#C2185B', '#D8A544', '#FFD9E8', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => setShowNext(true), 1500);
    }
  }, [litCandles, allOut]);

  return (
    <div className="flex-col flex-center" style={{ gap: '1.6rem' }}>
      <div className="section-eyebrow">make a wish</div>
      <div className="section-title">Blow out the candles</div>
      
      <div className="cake-wrap">
        <svg id="cakeSvg" width="260" height="235" viewBox="0 0 260 235" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="plateGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdfbfb" />
              <stop offset="80%" stopColor="#e3dada" />
              <stop offset="100%" stopColor="#c5bebd" />
            </radialGradient>
            
            <linearGradient id="tier1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b71b53" />
              <stop offset="15%" stopColor="#e94383" />
              <stop offset="85%" stopColor="#e94383" />
              <stop offset="100%" stopColor="#8d103c" />
            </linearGradient>

            <linearGradient id="tier1TopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7aae" />
              <stop offset="100%" stopColor="#db3170" />
            </linearGradient>

            <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0d5d9" />
              <stop offset="15%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d2c1c7" />
            </linearGradient>

            <linearGradient id="tier2TopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3dae3" />
            </linearGradient>

            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8d8d3" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d1bab3" />
            </linearGradient>
          </defs>

          {/* Plate */}
          <ellipse cx="130" cy="205" rx="115" ry="22" fill="#a89f9e"/>
          <ellipse cx="130" cy="202" rx="115" ry="22" fill="url(#plateGrad)"/>
          
          {/* Shadow of Cake on Plate */}
          <ellipse cx="130" cy="190" rx="98" ry="20" fill="rgba(0,0,0,0.12)"/>

          {/* Bottom Tier (Pink) */}
          <path d="M 40 130 L 40 190 A 90 20 0 0 0 220 190 L 220 130 Z" fill="url(#tier1Grad)"/>
          <ellipse cx="130" cy="130" rx="90" ry="20" fill="url(#tier1TopGrad)"/>

          {/* Bottom Tier Base Piping */}
          <path d="M 40 190 A 90 20 0 0 0 220 190" fill="none" stroke="#fff" strokeWidth="12" strokeDasharray="1 16" strokeLinecap="round" opacity="0.9"/>

          {/* Shadow of Top Tier on Bottom Tier */}
          <ellipse cx="130" cy="130" rx="72" ry="16" fill="rgba(0,0,0,0.12)"/>

          {/* Top Tier (White) */}
          <path d="M 65 80 L 65 130 A 65 15 0 0 0 195 130 L 195 80 Z" fill="url(#tier2Grad)"/>
          <ellipse cx="130" cy="80" rx="65" ry="15" fill="url(#tier2TopGrad)"/>

          {/* Top Tier Base Piping */}
          <path d="M 65 130 A 65 15 0 0 0 195 130" fill="none" stroke="#e94383" strokeWidth="9" strokeDasharray="1 13" strokeLinecap="round" opacity="0.9"/>

          {/* Strawberry Dripping Icing */}
          <path d="M 65 80 
                   C 65 92, 72 92, 75 80
                   C 75 105, 90 105, 95 82
                   C 100 115, 115 115, 120 83
                   C 120 110, 135 110, 140 82
                   C 145 118, 165 118, 170 81
                   C 175 95, 195 95, 195 80
                   Z" 
                fill="url(#tier1Grad)" />
          
          <ellipse cx="130" cy="80" rx="65" ry="15" fill="url(#tier1Grad)"/>

          {/* Sprinkles */}
          <g id="sprinkles">
            <rect x="95" y="75" width="7" height="2.5" rx="1" fill="#fff" transform="rotate(30 95 75)" />
            <rect x="120" y="71" width="7" height="2.5" rx="1" fill="#FFD700" transform="rotate(-45 120 71)" />
            <rect x="145" y="78" width="7" height="2.5" rx="1" fill="#00E5FF" transform="rotate(60 145 78)" />
            <rect x="110" y="85" width="7" height="2.5" rx="1" fill="#fff" transform="rotate(-15 110 85)" />
            <rect x="160" y="73" width="7" height="2.5" rx="1" fill="#FFD700" transform="rotate(80 160 73)" />
            <rect x="85" y="82" width="7" height="2.5" rx="1" fill="#00E5FF" transform="rotate(10 85 82)" />
            <rect x="130" y="86" width="7" height="2.5" rx="1" fill="#fff" transform="rotate(-70 130 86)" />
          </g>

          {/* Candles */}
          <g id="candles">
            {[95, 126, 157].map((x, i) => {
              const isCenter = i === 1;
              const baseY = isCenter ? 76 : 82;
              const height = isCenter ? 36 : 30;
              const topY = baseY - height;
              return (
                <g key={i} className="candle">
                  {/* Shadow */}
                  <ellipse cx={x+4} cy={baseY} rx="6" ry="2.5" fill="rgba(0,0,0,0.2)"/>
                  
                  {/* Stick */}
                  <rect x={x} y={topY} width="8" height={height} fill="url(#candleGrad)" rx="2"/>
                  
                  {/* Stripes */}
                  <path d={`M ${x} ${topY + 6} L ${x+8} ${topY + 2} L ${x+8} ${topY + 6} L ${x} ${topY + 10} Z`} fill="#E9518F" />
                  <path d={`M ${x} ${topY + 16} L ${x+8} ${topY + 12} L ${x+8} ${topY + 16} L ${x} ${topY + 20} Z`} fill="#E9518F" />
                  <path d={`M ${x} ${topY + 26} L ${x+8} ${topY + 22} L ${x+8} ${topY + 26} L ${x} ${topY + 30} Z`} fill="#E9518F" />
                  
                  {/* Wick */}
                  <path d={`M ${x+4} ${topY} Q ${x+6} ${topY - 4} ${x+4} ${topY - 8}`} stroke="#333" strokeWidth="1.5" fill="none" />
                  
                  {/* Flame Group */}
                  <g 
                    onClick={() => blowOut(i)}
                    style={{ 
                      opacity: litCandles[i] ? 1 : 0, 
                      transform: litCandles[i] ? 'scale(1)' : 'scale(0)',
                      transformOrigin: `${x+4}px ${topY}px`,
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <g className={litCandles[i] ? 'flame-anim' : ''} style={{ transformOrigin: `${x+4}px ${topY}px` }}>
                      <ellipse cx={x + 4} cy={topY - 14} rx="6" ry="12" fill="#FF9D00" opacity="0.8"/>
                      <ellipse cx={x + 4} cy={topY - 12} rx="4" ry="8" fill="#FFD700" />
                      <ellipse cx={x + 4} cy={topY - 10} rx="2" ry="4" fill="#FFFFFF" />
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {!allOut && <div className="cake-hint" id="cakeHint">blow into your microphone or tap the flames</div>}
      
      <div id="wish-msg" className={allOut ? 'show' : ''}>
        Happy Birthday, My Princess Nur — may your every wish come true 🩷
      </div>

      <div className="flex-center" style={{ gap: '1rem', marginTop: '1.4rem' }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid var(--magenta)', color: 'var(--magenta)' }}
        >
          &uarr; back
        </button>
        <button 
          className="next-btn" 
          onClick={onNext} 
          style={{ 
            opacity: showNext ? 1 : 0, 
            pointerEvents: showNext ? 'auto' : 'none',
            transition: 'opacity 0.6s ease'
          }}
        >
          continue &rarr;
        </button>
      </div>
    </div>
  );
}
