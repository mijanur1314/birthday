import { useState, useEffect } from 'react';

const paragraphs = [
  "Happy birthday to the bravest girl I have ever seen who makes ordinary days feel like something worth celebrating. Today is all about you, and I wanted to make something just for you to say it properly, since words alone never quite feel like enough.",
  "You have this way of turning up in my thoughts at the best moments, of making me smile at my phone like an idiot, of making me feel completely at home even from far away. I don't take that for granted.",
  "So here's to another year of you, growing, laughing, dreaming big, and letting me be part of your journey. I hope this year gives you everything you've been quietly hoping for."
];

export default function Letter({ onNext }) {
  const [typedText, setTypedText] = useState(['', '', '']);
  const [currentPara, setCurrentPara] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentPara >= paragraphs.length) {
      setTimeout(() => setShowButton(true), 1000);
      return;
    }

    const fullText = paragraphs[currentPara];
    const currentLength = typedText[currentPara].length;

    if (currentLength < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => {
          const newText = [...prev];
          newText[currentPara] = fullText.substring(0, currentLength + 1);
          return newText;
        });
      }, 40); // typing speed
      return () => clearTimeout(timer);
    } else {
      // Move to next paragraph after a short pause
      const timer = setTimeout(() => {
        setCurrentPara(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typedText, currentPara]);

  // Click to skip typing
  const skipTyping = () => {
    if (currentPara < paragraphs.length) {
      setTypedText([...paragraphs]);
      setCurrentPara(paragraphs.length);
      setShowButton(true);
    }
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '2rem', maxWidth: '640px' }}>
      <div className="letter-card" onClick={skipTyping} style={{ cursor: currentPara < paragraphs.length ? 'pointer' : 'default' }}>
        <div className="to-line">My dearest Nur,</div>
        <div className="letter-body">
          {typedText.map((text, idx) => (
            <p key={idx}>
              {text}
              {currentPara === idx && text.length < paragraphs[idx].length && (
                <span className="cursor-blink">|</span>
              )}
            </p>
          ))}
        </div>
        <div 
          className="signoff" 
          style={{ opacity: currentPara >= paragraphs.length ? 1 : 0, transition: 'opacity 1s ease' }}
        >
          — always yours
        </div>
      </div>
      <button 
        className="next-btn" 
        onClick={onNext}
        style={{ 
          opacity: showButton ? 1 : 0,
          pointerEvents: showButton ? 'auto' : 'none',
          transition: 'opacity 0.8s ease'
        }}
      >
        our story &darr;
      </button>
    </div>
  );
}
