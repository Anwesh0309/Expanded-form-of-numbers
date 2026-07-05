import React, { useState, useEffect, useRef } from 'react';
import './ReflectPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { BADGES } from '../../utils/badgeEngine.js';
import { calcStars } from '../../utils/scoring.js';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { generateSessionQuestions } from '../../utils/shuffle.js';
import questionBank from '../../data/questionBank.js';

export default function ReflectPhase({ state, dispatch }) {
  const [journal, setJournal]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { narrate, stopAll }      = useAudio(state.audioEnabled);
  const narrated = useRef(false);

  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  const totalStars   = state.districtScores?.reduce((s, sc) => {
    if (sc === null) return s;
    return s + calcStars(sc);
  }, 0) || 0;

  useEffect(() => {
    if (!narrated.current) {
      narrated.current = true;
      narrate(reflectNarration());
    }
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    return () => stopAll();
  }, []);

  function handleSubmit() {
    if (!journal.trim()) return;
    setSubmitted(true);
    stopAll();
    narrate(reflectCompleteNarration());
  }

  function playAgain() {
    dispatch({ type: 'RESET_SESSION' });
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }

  const earnedBadges = BADGES.filter(b => state.badges.includes(b.id));

  if (submitted) {
    return (
      <div className="reflect-wrap">
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title headline">You're a Place Value Master!</h1>
          <p className="trophy-sub subheadline" style={{ color: 'var(--gold)' }}>
            Lesson 1.3 Complete ✅
          </p>

          {/* Stats */}
          <div className="trophy-stats">
            <div className="trophy-stat">
              <span className="stat-value number-display">{totalCorrect}</span>
              <span className="stat-label label-text">/ 100 Correct</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state.xp}</span>
              <span className="stat-label label-text">XP Earned</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state.maxStreak}</span>
              <span className="stat-label label-text">Best Streak 🔥</span>
            </div>
          </div>

          {/* Stars */}
          <div className="trophy-stars">
            {[...Array(Math.min(totalStars, 30))].map((_, i) => (
              <span key={i} style={{ fontSize: '1.1rem', animationDelay: `${i * 0.05}s` }} className="anim-bounce-in">⭐</span>
            ))}
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="trophy-badges">
              <p className="label-text" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Badges Earned</p>
              <div className="badge-list">
                {earnedBadges.map(b => (
                  <div key={b.id} className="badge-pill">
                    <span>{b.label}</span>
                    <span className="badge-desc label-text">{b.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="trophy-actions">
            <button className="btn-primary trophy-cta" onClick={playAgain}>🔄 Play Again</button>
            <button className="btn-outline" onClick={() => dispatch({ type: 'SET_PHASE', payload: 'intro' })}>🏠 Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reflect-wrap">
      <div className="reflect-card glass-card anim-slide-up">
        <div className="reflect-header">
          <span className="reflect-badge">📓 Learning Journal</span>
          <h2 className="reflect-title subheadline">Reflect on Your Learning</h2>
        </div>

        <Mascot mood="curious" message="Tell me one big number you can now expand!" size="sm" />

        <div className="reflect-journal">
          <label className="reflect-label body-text" htmlFor="journal-input">
            Type any number up to 100,000 and write its expanded form:
          </label>
          <textarea
            id="journal-input"
            className="reflect-textarea"
            placeholder="e.g. 45,678 = 40,000 + 5,000 + 600 + 70 + 8"
            value={journal}
            onChange={e => setJournal(e.target.value)}
            rows={3}
            aria-label="Learning journal entry"
          />
        </div>

        {/* Quick XP / stats summary */}
        <div className="reflect-stats">
          <div className="reflect-stat-pill">⭐ {state.xp} XP</div>
          <div className="reflect-stat-pill">✅ {totalCorrect}/100</div>
          <div className="reflect-stat-pill">🔥 Streak: {state.maxStreak}</div>
        </div>

        <div className="reflect-actions">
          <button className="btn-primary" onClick={handleSubmit} disabled={!journal.trim()}>
            🌟 Complete Lesson!
          </button>
        </div>
      </div>
    </div>
  );
}
