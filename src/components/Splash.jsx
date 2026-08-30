import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Stardust from './Stardust';

export default function Splash({ onComplete }) {
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Zoom heart at 2.5s
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 2500);

    // Tell parent to unmount us at 3.5s
    // Framer motion's AnimatePresence will catch this and play the exit animation perfectly
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 1.2, ease: "easeInOut" } }}
    >
      <Stardust />
      <div className="splash-cinematic-glow"></div>
      <div className={`splash-content ${isZooming ? 'hide-text' : ''}`}>
        <div className={`heart-glow ${isZooming ? 'zoom-in' : ''}`}>♥</div>
        <h1 className="splash-text">For My Bouuuuu...</h1>
      </div>
    </motion.div>
  );
}
