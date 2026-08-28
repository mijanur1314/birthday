import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { playPaperRustle } from '../utils/sound';

const reasons = [
  { text: "যেইভাবে তুমি আমার যত্ন নাও, রেগে থাকলেও তুমি যতই দেখাও তুমি আমার জন্য care করোনা কিন্তু আমি বুঝতে পারি সব", image: "/IMG20260121162040.jpg" },
  { text: "তুমি যেইভাবে সব জিনিস একসাথে ম্যানেজ করো, সেটা দেখে আমিও অবাক হয়ে যায়, সেটা দেখে আরও তোমার প্রতি সম্মান বেড়ে যায়", image: "/IMG20260125144210.jpg" },
  { text: "তুমি যেইভাবে আমাদের ভবিষ্যত নিয়ে ভাবো, যেইভাবে সেটা সবসময় চাও আল্লাহ কাছে ওটা দেখে আরও তোমার প্রেমে পড়ে যায়", image: "/IMG20260131161049.jpg" },
  { text: "যেইভাবে তুমি সবসময় সব বিষয় নিয়ে বিনা দ্বিধায় আমার সাথে কথা বলো কোনো সংকোচ, কোনো লিমিট ছাড়াই ওটা দেখে আমার খুব ভালো লাগে গো", image: "/IMG20260407185414.jpg" },
  { text: "তোমার সাথে থাকলে সময় কীভাবে মুহূর্তের মধ্যে ফুরিয়ে যায় বুঝতেই পারিনা, তুমি যেকোনো সাধারণ জিনিস কেও আমার জন্য অসাধারণ করে তোলো", image: "/IMG20260808153139.jpg" },
  { text: "শেষে এটাই বলবো গো যে তোমাকে ছাড়া বাঁচবোনা গো, তুমি এখন আমার জীবনের সব, তোমাকেও আমার অর্ধাঙ্গিনী হিসাবে আল্লাহ কাছে চায় সবসময়", image: "/IMG_20250518_210710.jpg" }
];

export default function Reasons({ onNext, onPrev }) {
  const [flipped, setFlipped] = useState(Array(6).fill(false));

  const toggleFlip = (index) => {
    playPaperRustle();
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '1.6rem', width: '100%' }}>
      <div className="section-eyebrow">why you?</div>
      <div className="section-title">Reasons I love you</div>
      
      <div className="cards">
        {reasons.map((reason, i) => (
          <div 
            key={i} 
            className={`flip-card ${flipped[i] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(i)}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <img 
                  src={reason.image} 
                  alt="Reason" 
                  style={{ 
                    width: '100%', 
                    height: '110px', 
                    objectFit: 'contain', 
                    backgroundColor: '#fff',
                    borderRadius: '6px', 
                    marginBottom: '0.5rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }} 
                />
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <div className="label">tap to reveal</div>
              </div>
              <div className="flip-back flex-center">
                <p>{reason.text}</p>
              </div>
              <div className="glare-container">
                <div className="glare"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cake-hint">tap each card to flip it</div>

      <div className="flex-center" style={{ gap: '1rem', marginTop: '3rem' }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid var(--magenta)', color: 'var(--magenta)' }}
        >
          &uarr; back
        </button>
        <button className="next-btn" onClick={onNext}>
          make a wish &darr;
        </button>
      </div>
    </div>
  );
}
