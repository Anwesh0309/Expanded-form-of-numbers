import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';
import Mascot from './shared/Mascot.jsx';

const JOURNEY = [
  { num:'01', icon:'🔍', label:'Wonder',   desc:'Spark your curiosity' },
  { num:'02', icon:'📖', label:'Story',    desc:'Hear the tale' },
  { num:'03', icon:'🧪', label:'Simulate', desc:'Explore & discover' },
  { num:'04', icon:'🎮', label:'Play',     desc:'Test your skills' },
  { num:'05', icon:'📓', label:'Reflect',  desc:'What did you learn?' },
];

const BOTTOM_ACTIONS = [
  { icon:'🎯', label:'100 Questions', desc: '100 Questions', color: '#ff6b6b' },
  { icon:'🧺', label:'Equal Groups', desc: 'Place Values', color: '#feca57' },
  { icon:'✨', label:'Badges & XP', desc: 'Badges & XP', color: '#feca57' },
];

export default function IntroScreen({ state, dispatch }) {
  const hasSaved = state.phaseComplete && Object.values(state.phaseComplete).some(Boolean);

  function startFresh() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  function resumeSession() {
    dispatch({ type: 'SET_PHASE', payload: state.savedPhase || 'wonder' });
  }

  return (
    <div className="intro-wrap">
      
      {/* Top Badge */}
      <div className="intro-top-badge">
        ✨Curriculum · Expanded form Grade 3
      </div>

      {/* Main Title */}
      <h1 className="intro-title">
        <span className="text-orange">Expanded</span> <span className="text-white">Form</span>
      </h1>
      <h2 className="intro-subtitle">PlaceValueQuest · Journey to 100,000</h2>

      {/* Mascot Row */}
      <div className="intro-mascot-row">
        <div className="intro-mascot-circle">🦁</div>
        <div className="intro-speech-bubble">
          Hi! I'm Leo. Ready to<br/>explore big numbers? 🔢
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc">
        Learn to break any big number into its <span className="text-yellow">place-value parts</span>, understand each digit's value, and master expanded form up to 100,000!
      </p>

      {/* Journey Card */}
      <div className="journey-card">
        <div className="journey-card-title">YOUR LEARNING JOURNEY</div>
        
        <div className="journey-steps-container">
          <div className="journey-row top-row">
            {JOURNEY.slice(0, 3).map((j, i) => (
              <React.Fragment key={j.num}>
                <div className="journey-step-item">
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                <span className={`journey-arrow ${i === 2 ? 'fade-arrow' : ''}`}>→</span>
              </React.Fragment>
            ))}
          </div>
          
          <div className="journey-row bottom-row">
            {JOURNEY.slice(3, 5).map((j, i) => (
              <React.Fragment key={j.num}>
                <div className="journey-step-item">
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                {i === 0 && <span className="journey-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="intro-ctas">
        <button className="btn-primary intro-cta-main" onClick={startFresh}>
          🚀 Begin Your Journey!
        </button>
        {hasSaved && (
          <button className="btn-outline" onClick={resumeSession} style={{marginTop: '10px'}}>
            ↩ Resume Session
          </button>
        )}
      </div>

      {/* Bottom Cards */}
      <div className="intro-bottom-cards">
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{color: '#ff6b6b'}}>🎯</div>
          <div>100 Questions</div>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{color: '#feca57'}}>🧺</div>
          <div>Expanded Form</div>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{color: '#feca57'}}>✨</div>
          <div>Badges & XP</div>
        </div>
      </div>

    </div>
  );
}
