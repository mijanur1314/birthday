import { useEffect, useState } from 'react';

export default function Splash({ onComplete }) {
  const [isZooming, setIsZooming] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Start zooming the heart at 2.5s
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 2500);

    // 2. Start fading out the background at 3.2s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    // 3. Complete and unmount splash at 4s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`splash-content ${isZooming ? 'hide-text' : ''}`}>
        <div className={`heart-glow ${isZooming ? 'zoom-in' : ''}`}>♥</div>
        <h1 className="splash-text">For My Bouuuuu...</h1>
      </div>
    </div>
  );
}
