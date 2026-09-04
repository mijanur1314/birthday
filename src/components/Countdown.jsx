import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';

export default function Countdown({ onComplete }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(config.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (!newTimeLeft) {
        clearInterval(timer);
        if (onComplete) onComplete();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!timeLeft) return null;

  return (
    <motion.div 
      className="countdown-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="countdown-content glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
          borderRadius: '24px',
          textAlign: 'center',
          maxWidth: '90vw',
          width: '500px'
        }}
      >
        <div className="section-eyebrow">Just a little longer...</div>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>Your Surprise Unlocks In</h2>
        
        <div className="countdown-timer" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {timeLeft.days > 0 && (
            <div className="time-box">
              <span className="time-value">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
          )}
          <div className="time-box">
            <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-box">
            <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-box">
            <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

