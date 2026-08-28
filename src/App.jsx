import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import StoryBook from './components/StoryBook';
import Reasons from './components/Reasons';
import Cake from './components/Cake';
import Closing from './components/Closing';

import TiltWrapper from './components/TiltWrapper';
import Splash from './components/Splash';
import Stardust from './components/Stardust';
import { playChime } from './utils/sound';

const pageOrder = [
  'envelope',
  'letter',
  'story',
  'reasons',
  'cake',
  'closing'
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [cakeBlown, setCakeBlown] = useState(false);
  
  const [currentStep, setCurrentStep] = useState('envelope');
  const audioRef = useRef(null);
  const cakeAudioRef = useRef(null);

  useEffect(() => {
    cakeAudioRef.current = new Audio('/birthday_tune.mp3');
    cakeAudioRef.current.volume = 0.8;
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back 🥺";
      } else {
        document.title = "Happy Birthday, Nur 💖";
      }
    };
    
    document.title = "Happy Birthday, Nur 💖";
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const stepIndex = pageOrder.indexOf(currentStep);

  const goToNextStep = () => {
    if (stepIndex < pageOrder.length - 1) {
      setCurrentStep(pageOrder[stepIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (stepIndex > 0) {
      setCurrentStep(pageOrder[stepIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnvelopeOpen = () => {
    setTimeout(() => {
      goToNextStep();
    }, 2400);
  };

  const restartApp = () => {
    setCurrentStep('envelope');
    setCakeBlown(false);
    if (cakeAudioRef.current) {
      cakeAudioRef.current.pause();
      cakeAudioRef.current.currentTime = 0;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <>
      <FloatingHearts />
      <Stardust />
      
      {/* Secret Easter Egg Trigger */}
      <div 
        className="secret-star" 
        onContextMenu={(e) => {
          e.preventDefault();
          playChime();
          setShowEasterEgg(true);
        }}
        onClick={() => {
          playChime();
          setShowEasterEgg(true);
        }}
      >
        ✨
      </div>

      {/* Progress Dots */}
      <div className="page-progress">
        {pageOrder.map((step, idx) => (
          <div
            key={step}
            className={`pdot ${idx === stepIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <main className="fixed-inset">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="view-container"
            style={{ transformOrigin: "left center", perspective: "1500px" }}
          >
            {currentStep === 'envelope' && <TiltWrapper><Envelope onOpen={handleEnvelopeOpen} /></TiltWrapper>}
            {currentStep === 'letter' && <TiltWrapper maxTilt={10}><Letter onNext={goToNextStep} /></TiltWrapper>}
            {currentStep === 'story' && <TiltWrapper maxTilt={8}><StoryBook onNext={goToNextStep} onPrev={goToPrevStep} /></TiltWrapper>}
            {currentStep === 'reasons' && <TiltWrapper maxTilt={6}><Reasons onNext={goToNextStep} onPrev={goToPrevStep} /></TiltWrapper>}
            {currentStep === 'cake' && <Cake onNext={goToNextStep} onPrev={goToPrevStep} cakeAudioRef={cakeAudioRef} cakeBlown={cakeBlown} onCakeBlown={() => setCakeBlown(true)} />}
            {currentStep === 'closing' && <Closing onPrev={goToPrevStep} onRestart={restartApp} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            className="easter-egg-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="easter-egg-content glass-panel premium-shadow">
              <h2 className="script text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>P.S.</h2>
              <p className="serif-normal" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                You found the secret star! I just wanted to hide this here to remind you that even when you aren't looking, I am thinking of you. I love you more than words could ever say. 
              </p>
              <button className="next-btn" onClick={() => setShowEasterEgg(false)}>close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
