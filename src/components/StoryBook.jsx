import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { playPaperRustle } from '../utils/sound';

const storyPages = [
  { date: "May 10", icon: "☕", title: "The day we first talked", text: "তোমাদের স্কুলে কম্পিটেশনে গিয়ে প্রথমবারের মতো তোমার সাথে লজ্জা পেতে পেতে কথা বলেছিলাম", image: "/DSC05007.jpg" },
  { date: "Our special day", icon: "📍", title: "The first time we met", text: "প্রথম দিন যখন দেখা হয়েছিল তখন ফিলিংস কিরকম ছিল সেটা তো মনে নেই কিন্তু এখন প্রতিটা দিন প্রথম দিন মনে হয়, প্রতিদিন মনে হয় তোমাকে নতুন করে দেখছি, নতুন করে প্রেমে পড়ছি", image: "/IMG-20250716-WA0016.jpg" },
  { date: "Our challenging times", icon: "🌧️", title: "A moment that tested us", text: "যখন আমার মেসেজগুলো তোমার পাপা দেখে নিয়েছিল, যখন মাসের পর মাস দেখা হয়নি করোনা সময়, এত তুমুল ঝগড়ার পরেও আজ আমরা একসাথে আছি এটাই আমার সবচেয়ে বড়ো পাওনা", image: "/IMG20240418145840.jpg" },
  { date: "Our favorite memory", icon: "😂", title: "The inside joke that never gets old", text: "একে অপরকে সবসময় রোস্ট করা, সব সময় রাগানো, এটাই আমাদের সবচেয়ে বড় এন্টারটেইনমেন্টের একটা রাস্তা, এইজন্যই আমরা একে অপরের প্রতি bore হয়না", image: "/IMG20240629152247.jpg" },
  { date: "September 8", icon: "🩷", title: "Right now", text: "এখন শুধু একটা কথাই বলতে পারি তুমি আমার শরীরের একটা অঙ্গের মতো হয়ে গেছো যেটাকে ছাড়া আমি থাকতেই পারবো না, তোমাকে ছাড়া এক মুহূর্ত ভাবতেও পারি না এখন, সব সময় তোমাকে চাই, এইভাবেই সবসময় তোমার সাথে থাকবো, তোমার যত্ন নেবো, তোমাকে হাসাবো, তোমাকে ভালো রাখার চেষ্টা করবো গো সোনা", image: "/IMG20251102170822.jpg" }
];

export default function StoryBook({ onNext, onPrev }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    playPaperRustle();
    if (index < storyPages.length - 1) {
      setIndex(index + 1);
    } else {
      onNext();
    }
  };

  const prev = () => {
    playPaperRustle();
    if (index > 0) {
      setIndex(index - 1);
    } else if (onPrev) {
      onPrev();
    }
  };

  return (
    <div className="flex-col flex-center" style={{ gap: '1rem', width: '100%' }}>
      <div className="section-eyebrow">a few moments</div>
      <div className="section-title">Our story so far</div>
      
      <div className="story-book">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="story-page"
            style={{ transformOrigin: 'left center' }}
          >
            <div className="page-no">page {index + 1} of {storyPages.length}</div>
            
            <div className="polaroid-frame">
              <img 
                src={storyPages[index].image} 
                alt="Our story" 
                className="polaroid-img"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="page-icon">{storyPages[index].icon}</div>
            <div className="story-date" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', marginBottom: '-0.5rem' }}>{storyPages[index].date}</div>
            <div className="page-title">{storyPages[index].title}</div>
            <p>{storyPages[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="story-nav">
        <button className="story-arrow" onClick={prev}>
          <ArrowLeft size={20} />
        </button>
        <div className="story-dots">
          {storyPages.map((_, i) => (
            <div key={i} className={`story-dot ${i === index ? 'active' : ''}`} />
          ))}
        </div>
        <button className="story-arrow" onClick={next}>
          {index === storyPages.length - 1 ? <Check size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}
