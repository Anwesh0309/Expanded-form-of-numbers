import React, { useMemo } from 'react';
import './FloatingNumbers.css';

const SYMBOLS = ['1','2','3','4','5','6','7','8','9','0','+','=','100','1,000','10,000'];

export default function FloatingNumbers() {
  const items = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    sym:  SYMBOLS[i % SYMBOLS.length],
    left: Math.random() * 95,
    dur:  15 + Math.random() * 18,
    delay: Math.random() * 20,
    size: 0.9 + Math.random() * 1.4,
  })), []);

  return (
    <div className="floating-nums" aria-hidden="true">
      {items.map(it => (
        <span
          key={it.id}
          className="fn-item"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
            fontSize: `${it.size}rem`,
          }}
        >
          {it.sym}
        </span>
      ))}
    </div>
  );
}
