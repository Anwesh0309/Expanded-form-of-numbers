import React, { useState, useCallback } from 'react';
import './Stations.css';
import { generateRandomNumber, toDigits, toExpandedTerms } from '../../utils/placeValue.js';

const PV_LABELS = ['Ten-Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
const PV_VALUES = [10000, 1000, 100, 10, 1];

function generateProblem() {
  const n = generateRandomNumber(11111, 88888);
  const correctTerms = toExpandedTerms(n);
  // Pick a random non-zero term to corrupt
  const nonZero = correctTerms.map((t, i) => i).filter(i => correctTerms[i] > 0);
  const errorIdx = nonZero[Math.floor(Math.random() * nonZero.length)];
  const pv = PV_VALUES[errorIdx];
  const digit = Math.floor(correctTerms[errorIdx] / pv);
  // Replace with adjacent digit value
  const wrongDigit = digit === 9 ? digit - 1 : digit + 1;
  const displayedTerms = [...correctTerms];
  displayedTerms[errorIdx] = wrongDigit * pv;
  return { number: n, correctTerms, displayedTerms, errorIdx };
}

export default function SpotErrorStation({ onComplete }) {
  const [problem, setProblem] = useState(generateProblem);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const ROUNDS = 3;

  function handleTap(idx) {
    if (result) return;
    setSelected(idx);
    if (idx === problem.errorIdx) {
      setResult('correct');
      setScore(s => s + 1);
    } else {
      setResult('wrong');
    }
  }

  function handleNext() {
    if (round >= ROUNDS) { onComplete(); return; }
    setProblem(generateProblem());
    setSelected(null);
    setResult(null);
    setRound(r => r + 1);
  }

  function handleRetry() {
    setSelected(null);
    setResult(null);
  }

  const correctedStr = problem.correctTerms.map(t => t.toLocaleString()).join(' + ');

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🔍 Spot the Error!</h3>
        <div className="station-target-box">
          <span className="station-target-label">Number:</span>
          <span className="station-target-num number-display">{problem.number.toLocaleString()}</span>
        </div>
        <span className="label-text" style={{ color: 'var(--text-muted)' }}>Round {round}/{ROUNDS}</span>
      </div>

      <p className="body-text" style={{ color: 'var(--text-secondary)' }}>
        One term is <strong style={{ color: 'var(--red)' }}>wrong</strong>. Tap it!
      </p>

      <div className="spot-equation">
        {problem.displayedTerms.map((term, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="spot-op">+</span>}
            <button
              className={`spot-term
                ${selected === i && result === 'correct' && i === problem.errorIdx ? 'selected-correct' : ''}
                ${selected === i && result === 'wrong' ? 'selected-wrong' : ''}
              `}
              onClick={() => handleTap(i)}
              aria-label={`Term: ${term.toLocaleString()}`}
            >
              {term.toLocaleString()}
            </button>
          </React.Fragment>
        ))}
        <span className="spot-op">=</span>
        <span className="spot-term" style={{ cursor: 'default', background: 'rgba(255,193,7,0.1)' }}>
          {problem.number.toLocaleString()}
        </span>
      </div>

      {result === 'correct' && (
        <div className="station-success anim-bounce-in">
          <span className="success-icon">🎯</span>
          <p className="body-text">Correct! The wrong term was fixed:</p>
          <p className="spot-corrected">✅ {problem.number.toLocaleString()} = {correctedStr}</p>
          <button className="btn-green" onClick={handleNext}>
            {round >= ROUNDS ? 'Complete Station ✅' : 'Next Problem →'}
          </button>
        </div>
      )}

      {result === 'wrong' && (
        <div style={{ color: 'var(--red)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(0.85rem,1vw,1rem)' }}>
          ❌ Not that one! Look again — check each place value carefully.
          <div className="station-actions" style={{ marginTop: 8 }}>
            <button className="btn-outline" onClick={handleRetry}>Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}
