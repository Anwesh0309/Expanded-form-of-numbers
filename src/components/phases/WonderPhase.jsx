import React, { useEffect, useRef } from 'react';
import './WonderPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { wonderNarration } from '../../utils/narration.js';

const PARTICLES = ['🔢', '➕', '🔟', '💯', '🔑', '⭐', '🏆', '🎯', '💡', '🧩'];

export default function WonderPhase({ state, dispatch }) {
  const { narrate, stopAll, say, ask, encourage } = useAudio(state.audioEnabled);
  useEffect(() => {
    const segs = wonderNarration();
    narrate(segs);
    return () => stopAll();
  }, [narrate, stopAll]);

  function handleInvestigate() {
    stopAll();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'SET_PHASE', payload: 'story' });
  }

  return (
    <div className="wonder-wrap">
      {/* Floating particles */}
      <div className="wonder-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span key={i} className="wonder-particle" style={{
            left: `${5 + (i * 9.5) % 90}%`,
            top: `${5 + (i * 7) % 80}%`,
            animationDelay: `${i * 0.6}s`,
            fontSize: `${1 + (i % 3) * 0.4}rem`,
          }}>{p}</span>
        ))}
      </div>

      <div className="wonder-content anim-slide-up">
        {/* Main hook card */}
        <div className="wonder-card glass-card">
          <div className="wonder-stadium-icon" aria-hidden="true">🏟️</div>
          <h1 className="wonder-title headline">The Big Mystery!</h1>

          <div className="wonder-number-display">
            <span className="number-display wonder-num">84,325</span>
          </div>

          <div className="wonder-question-card">
            <p className="body-text wonder-q">
              If a stadium has <strong className="wonder-em">84,325</strong> seats…
            </p>
            <p className="body-text wonder-q">
              How would you <span className="wonder-highlight">build that number</span> using only ten-thousands, thousands, hundreds, tens and ones?
            </p>
          </div>

          {/* Mascot */}
          <div className="wonder-mascot-row">
            <Mascot mood="curious" message="Let's investigate how every big number is built from smaller parts!" size="sm" />
          </div>

          <button className="btn-primary wonder-cta" onClick={handleInvestigate}>
            🔍 Let's Investigate!
          </button>
        </div>
      </div>
    </div>
  );
}
