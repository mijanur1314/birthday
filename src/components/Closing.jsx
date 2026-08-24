import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Closing({ onPrev, onRestart }) {
  const [showButton, setShowButton] = useState(false);
  const [interactionStep, setInteractionStep] = useState('initial'); // 'initial', 'question', 'yes'
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const handleNoHover = (e) => {
    if (e) e.preventDefault();
    // move the button randomly within a constrained bound
    const maxX = 130;
    const maxY = 100;
    const newX = (Math.random() * maxX * 2) - maxX;
    const newY = (Math.random() * maxY * 2) - maxY;
    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setInteractionStep('yes');
    // fire confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E9518F', '#C2185B', '#D8A544', '#FFD9E8', '#ffffff']
    });
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '1.2rem', minHeight: '60vh', position: 'relative' }}>
      
      {interactionStep === 'initial' && (
        <>
          <div className="closing-title">Happy Birthday, Nur</div>
          <p className="closing-sub serif-italic">
            September 8th belongs to you. I hope today is as lovely and as loved as you make everyone around you feel.
          </p>
          <div className="footer-note" style={{ marginBottom: '2rem' }}>made with Love, just for You</div>
          
          <div className="flex-center" style={{ gap: '1rem' }}>
            <button 
              className="next-btn" 
              onClick={onPrev} 
              style={{ background: 'transparent', border: '1px solid var(--magenta)', color: 'var(--magenta)' }}
            >
              &uarr; back to cake
            </button>
            <button 
              className="next-btn" 
              onClick={() => setInteractionStep('question')} 
              style={{ 
                opacity: showButton ? 1 : 0, 
                pointerEvents: showButton ? 'auto' : 'none',
                transition: 'opacity 0.6s ease'
              }}
            >
              I have a question
            </button>
          </div>
        </>
      )}

      {interactionStep === 'question' && (
        <>
          <div className="closing-title" style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>Do you love me?</div>
          
          <div className="flex-center" style={{ position: 'relative', width: '280px', height: '100px' }}>
            <button 
              className="next-btn" 
              onClick={handleYesClick}
              style={{ width: '100px', zIndex: 10, position: 'absolute', left: '10px' }}
            >
              Yes
            </button>
            
            <button 
              className="next-btn" 
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              style={{ 
                width: '100px', 
                position: 'absolute',
                right: '10px',
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                zIndex: 5
              }}
            >
              No
            </button>
          </div>
        </>
      )}

      {interactionStep === 'yes' && (
        <>
          <div className="closing-title" style={{ fontSize: '3.2rem', marginBottom: '0.5rem' }}>I knew it! ❤️</div>
          <p className="closing-sub serif-italic" style={{ marginBottom: '2.5rem', fontSize: '1.5rem' }}>
            I love you too. Forever.
          </p>
          <button 
            className="next-btn" 
            onClick={onRestart} 
          >
            Done
          </button>
        </>
      )}

    </div>
  );
}
