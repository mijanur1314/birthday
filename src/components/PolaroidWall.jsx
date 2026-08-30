import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const polaroids = [
  { id: 1, image: "/IMG-20220226-WA0036.jpeg", caption: "Loving eyes", longCaption: "The way you look in this picture still makes my heart soft. Some photos are not just photos, they become a place I want to return to.", rotate: -5, x: -60, y: -40 },
  { id: 2, image: "/DSC07689.jpeg", caption: "Beautiful you", longCaption: "You looked so beautiful here, but honestly, what I love most is the peace I feel when I see you.", rotate: 4, x: 40, y: -80 },
  { id: 3, image: "/DSC06207.jpeg", caption: "Always laughing", longCaption: "Your smile is one of my safest places. I hope I get to be the reason behind it again and again.", rotate: -3, x: -30, y: 50 },
  { id: 4, image: "/IMG-20251025-WA0023.jpeg", caption: "My everything", longCaption: "This one reminds me that loving you has become one of the most natural parts of my life.", rotate: 6, x: 50, y: 60 },
  { id: 5, image: "/IMG-20220224-WA0002.jpeg", caption: "Unbreakable", longCaption: "We have had hard days, misunderstandings, distance, and still somehow we stayed. That means everything to me.", rotate: -2, x: 0, y: -10 },
  { id: 6, image: "/IMG20250928131346.jpeg", caption: "Colgate Ad", longCaption: "This smile deserves its own billboard. I am still your biggest fan, even when I tease you.", rotate: 5, x: -100, y: -100 }
];

export default function PolaroidWall({ onNext, onPrev }) {
  const containerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="polaroid-wall-container" ref={containerRef}>
      <h2 className="section-title text-center" style={{ marginBottom: '0.5rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Memories</h2>
      <p className="section-eyebrow text-center" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>(Drag the photos around!)</p>
      
      <div className="polaroids-area">
        {polaroids.map((p, idx) => (
          <motion.div
            key={p.id}
            layoutId={`polaroid-${p.id}`}
            drag={!selectedId}
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            initial={{ opacity: 0, scale: 0.5, rotate: p.rotate + (idx % 2 === 0 ? -20 : 20) }}
            animate={{ 
              opacity: selectedId === p.id ? 0 : 1, // Hide original when expanded
              scale: 1, 
              rotate: p.rotate, 
              x: p.x, 
              y: p.y,
              zIndex: idx 
            }}
            transition={{ duration: 0.6, delay: idx * 0.15, type: "spring" }}
            className="interactive-polaroid"
            onClick={() => {
              if (!selectedId) setSelectedId(p.id);
            }}
          >
            <div className="interactive-polaroid-inner">
              <img src={p.image} alt={p.caption} draggable="false" loading="lazy" decoding="async" />
              <p className="script">{p.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="polaroid-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {polaroids.filter(p => p.id === selectedId).map(p => (
              <motion.div
                key={p.id}
                layoutId={`polaroid-${p.id}`}
                className="interactive-polaroid expanded"
                initial={{ rotate: p.rotate }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
              >
                <div className="interactive-polaroid-inner expanded-inner">
                  <img src={p.image} alt={p.caption} draggable="false" />
                  <p className="script" style={{ fontSize: '1.5rem', marginTop: '10px' }}>{p.caption}</p>
                  <p className="serif-italic" style={{ marginTop: '15px', color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
                    "{p.longCaption}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-center" style={{ gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 110 }}>
        <button 
          className="next-btn" 
          onClick={onPrev} 
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.6)', color: '#fff', boxShadow: 'none' }}
        >
          &uarr; back
        </button>
        <button className="next-btn" onClick={onNext}>
          next &darr;
        </button>
      </div>
    </div>
  );
}
