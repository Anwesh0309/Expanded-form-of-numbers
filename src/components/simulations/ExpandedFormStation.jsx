import React, { useState, useCallback } from 'react';
import './Stations.css';
import { shuffleArray } from '../../utils/shuffle.js';
import { generateRandomNumber, toDigits, toExpandedTerms } from '../../utils/placeValue.js';

const CHIP_COLORS = ['#7C4DFF','#4A90D9','#FF8A50','#FFD54F','#66BB6A'];

function makeDistractors(correctTerms) {
  const distractors = [];
  const placeValues = [10000, 1000, 100, 10, 1];
  let attempts = 0;
  while (distractors.length < 3 && attempts < 60) {
    const idx = Math.floor(Math.random() * correctTerms.length);
    const pv = placeValues[idx];
    const digit = Math.floor(correctTerms[idx] / pv);
    const newDigit = Math.max(0, Math.min(9, digit + (Math.random() > 0.5 ? 1 : -1)));
    const newVal = newDigit * pv;
    if (newVal !== correctTerms[idx] && !distractors.includes(newVal) && !correctTerms.includes(newVal)) {
      distractors.push(newVal);
    }
    attempts++;
  }
  return distractors;
}

function makeChips(n) {
  const correctTerms = toExpandedTerms(n).filter(t => t > 0);
  const distractors = makeDistractors(toExpandedTerms(n));
  const all = [...correctTerms, ...distractors].map((val, i) => ({
    id: `chip_${i}_${val}`,
    value: val,
    isCorrect: toExpandedTerms(n).some(t => t === val),
    color: CHIP_COLORS[i % CHIP_COLORS.length],
  }));
  return { chips: shuffleArray(all), correctTerms };
}

export default function ExpandedFormStation({ onComplete }) {
  const [problem, setProblem] = useState(() => {
    const n = generateRandomNumber(11000, 89999);
    return { number: n, digits: toDigits(n), ...makeChips(n) };
  });
  const [tray, setTray] = useState([]);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const ROUNDS = 3;

  function addChip(chip) {
    if (tray.find(c => c.id === chip.id)) return;
    setTray(t => [...t, chip].sort((a, b) => b.value - a.value));
    setResult(null);
  }

  function removeFromTray(chip) {
    setTray(t => t.filter(c => c.id !== chip.id));
    setResult(null);
  }

  function handleCheck() {
    const sorted = [...tray].sort((a, b) => b.value - a.value);
    const trayVals = sorted.map(c => c.value);
    const correctVals = [...problem.correctTerms].sort((a, b) => b - a);
    if (JSON.stringify(trayVals) === JSON.stringify(correctVals)) {
      setResult('correct');
      setScore(s => s + 1);
    } else {
      setResult('wrong');
    }
  }

  function handleNext() {
    if (round >= ROUNDS) { onComplete(); return; }
    const n = generateRandomNumber(11000, 89999);
    setProblem({ number: n, digits: toDigits(n), ...makeChips(n) });
    setTray([]);
    setResult(null);
    setRound(r => r + 1);
  }

  const trayValSet = new Set(tray.map(c => c.id));

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🔢 Build Expanded Form!</h3>
        <span className="station-round label-text">Round {round}/{ROUNDS}</span>
      </div>

      <div className="ef-station">
        <div className="ef-target">
          <span className="label-text" style={{ color: 'var(--text-muted)' }}>Target number:</span>
          <span className="ef-target-num number-display">{problem.number.toLocaleString()}</span>
        </div>

        <p className="label-text" style={{ color: 'var(--text-secondary)' }}>Tap the correct chips to build the expanded form ↓</p>

        {/* Chip pool */}
        <div className="ef-chips-pool">
          {problem.chips.map(chip => (
            <button
              key={chip.id}
              className={`ef-chip ${trayValSet.has(chip.id) ? 'in-tray' : ''} ${result === 'correct' && problem.correctTerms.includes(chip.value) && trayValSet.has(chip.id) ? 'correct' : ''}`}
              style={{ background: chip.color, color: '#fff' }}
              onClick={() => !trayValSet.has(chip.id) && addChip(chip)}
              aria-label={`Chip: ${chip.value.toLocaleString()}`}
            >
              {chip.value.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Tray */}
        <div className="ef-tray">
          {tray.length === 0 && <span className="ef-tray-hint">Drag chips here…</span>}
          {tray.map((chip, i) => (
            <React.Fragment key={chip.id}>
              {i > 0 && <span className="ef-plus">+</span>}
              <button
                className={`ef-chip ${result === 'correct' ? 'correct' : result === 'wrong' && !problem.correctTerms.includes(chip.value) ? 'wrong' : ''}`}
                style={{ background: chip.color, color: '#fff' }}
                onClick={() => removeFromTray(chip)}
                aria-label={`Remove ${chip.value.toLocaleString()}`}
              >
                {chip.value.toLocaleString()}
              </button>
            </React.Fragment>
          ))}
          {tray.length > 0 && <span className="ef-plus">= {tray.reduce((s, c) => s + c.value, 0).toLocaleString()}</span>}
        </div>

        {result === 'correct' && (
          <div className="station-success anim-bounce-in">
            <span className="success-icon">🎉</span>
            <p className="body-text">
              {problem.number.toLocaleString()} = {[...problem.correctTerms].sort((a,b)=>b-a).map(t=>t.toLocaleString()).join(' + ')} ✓
            </p>
            <button className="btn-green" onClick={handleNext}>
              {round >= ROUNDS ? 'Complete Station ✅' : 'Next Number →'}
            </button>
          </div>
        )}
        {result === 'wrong' && (
          <div style={{ color: 'var(--red)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(0.85rem,1vw,1rem)' }}>
            ❌ Check each chip — does the total match {problem.number.toLocaleString()}?
          </div>
        )}

        {result !== 'correct' && (
          <div className="station-actions">
            <button className="btn-outline" onClick={() => { setTray([]); setResult(null); }}>Clear Tray</button>
            <button className="btn-primary" onClick={handleCheck} disabled={tray.length === 0}>Check ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}
