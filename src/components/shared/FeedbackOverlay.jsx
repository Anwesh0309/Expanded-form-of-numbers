import React from 'react';
import './FeedbackOverlay.css';

export default function FeedbackOverlay({ isCorrect, explanation, onContinue, xpGained }) {
  return (
    <div className="feedback-backdrop" role="dialog" aria-modal="true">
      <div className={`feedback-card anim-bounce-in ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
        <div className="feedback-icon" aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '10px' }}>
          {isCorrect ? '🎉' : '🤔'}
        </div>
        <h2 className="feedback-title" style={{ fontSize: '1.8rem', marginBottom: '8px', fontWeight: '800' }}>
          {isCorrect ? 'Correct! 🎉' : 'Not Quite!'}
        </h2>
        
        {explanation && (
          <p className="feedback-explain" style={{ fontSize: '1.1rem', opacity: 0.9 }}>{explanation}</p>
        )}
      </div>
    </div>
  );
}
