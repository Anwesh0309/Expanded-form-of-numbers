import React, { useState, useCallback } from 'react';
import './Stations.css';
import PlaceValueChart from '../shared/PlaceValueChart.jsx';
import { generateRandomNumber, toDigits, toExpandedTerms } from '../../utils/placeValue.js';

const PV_LABELS = [
  { key: 'tt', label: 'Ten-Thousand', icon: '⬛', color: '#7C4DFF', value: 10000 },
  { key: 'th', label: 'Thousand',     icon: '🟦', color: '#4A90D9', value: 1000  },
  { key: 'h',  label: 'Hundred',      icon: '🟧', color: '#FF8A50', value: 100   },
  { key: 't',  label: 'Ten',          icon: '🟨', color: '#FFD54F', value: 10    },
  { key: 'o',  label: 'One',          icon: '🟩', color: '#66BB6A', value: 1     },
];

function getNewTarget() {
  const n = generateRandomNumber(10000, 54999);
  const d = toDigits(n);
  // Keep counts manageable (max 9 each)
  const fixed = { tt: d.tenThousands, th: d.thousands, h: d.hundreds, t: d.tens, o: d.ones };
  const total = fixed.tt * 10000 + fixed.th * 1000 + fixed.h * 100 + fixed.t * 10 + fixed.o;
  return { number: total, digits: { tenThousands: fixed.tt, thousands: fixed.th, hundreds: fixed.h, tens: fixed.t, ones: fixed.o } };
}

export default function BlockBuilderStation({ onComplete }) {
  const [target, setTarget]   = useState(() => getNewTarget());
  const [placed, setPlaced]   = useState({ tt: 0, th: 0, h: 0, t: 0, o: 0 });
  const [success, setSuccess] = useState(false);
  const [shake, setShake]     = useState(false);

  const currentTotal = placed.tt * 10000 + placed.th * 1000 + placed.h * 100 + placed.t * 10 + placed.o;
  const currentDigits = { tenThousands: placed.tt, thousands: placed.th, hundreds: placed.h, tens: placed.t, ones: placed.o };

  const terms = toExpandedTerms(currentTotal).filter(t => t > 0);

  function addBlock(key) {
    const maxVals = { tt: target.digits.tenThousands, th: target.digits.thousands, h: target.digits.hundreds, t: target.digits.tens, o: target.digits.ones };
    if (placed[key] >= maxVals[key]) return;
    const newPlaced = { ...placed, [key]: placed[key] + 1 };
    setPlaced(newPlaced);
    const newTotal = newPlaced.tt * 10000 + newPlaced.th * 1000 + newPlaced.h * 100 + newPlaced.t * 10 + newPlaced.o;
    if (newTotal === target.number) {
      setSuccess(true);
    }
  }

  function removeBlock(key) {
    if (placed[key] <= 0) return;
    setPlaced(p => ({ ...p, [key]: p[key] - 1 }));
    setSuccess(false);
  }

  function newProblem() {
    setTarget(getNewTarget());
    setPlaced({ tt: 0, th: 0, h: 0, t: 0, o: 0 });
    setSuccess(false);
  }

  function handleCheck() {
    if (currentTotal === target.number) {
      setSuccess(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🧱 Build the Number!</h3>
        <div className={`station-target-box ${shake ? 'anim-shake' : ''}`}>
          <span className="station-target-label">Target:</span>
          <span className="station-target-num number-display">{target.number.toLocaleString()}</span>
        </div>
      </div>

      <div className="station-body">
        {/* Block supply bins */}
        <div className="block-supply">
          {PV_LABELS.map(pv => (
            <div key={pv.key} className="block-supply-item">
              <button
                className="block-btn"
                style={{ background: pv.color }}
                onClick={() => addBlock(pv.key)}
                aria-label={`Add ${pv.label}`}
                disabled={success}
              >
                <span className="block-icon">{pv.icon}</span>
                <span className="block-label">{pv.label}</span>
                <span className="block-count">{placed[pv.key]}/{target.digits[{ tt:'tenThousands', th:'thousands', h:'hundreds', t:'tens', o:'ones' }[pv.key]]}</span>
              </button>
              <button className="block-minus" onClick={() => removeBlock(pv.key)} aria-label={`Remove ${pv.label}`} disabled={placed[pv.key] === 0}>−</button>
            </div>
          ))}
        </div>

        {/* Running total */}
        <div className="block-total-area">
          <PlaceValueChart digits={currentDigits} animated compact />
          <div className="block-running-total">
            <span className="running-label body-text">Current:</span>
            <span className={`running-num number-display ${currentTotal === target.number ? 'match' : ''}`}>
              {currentTotal.toLocaleString()}
            </span>
            {terms.length > 0 && (
              <span className="running-expanded body-text">= {terms.map(t => t.toLocaleString()).join(' + ')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Result */}
      {success ? (
        <div className="station-success anim-bounce-in">
          <span className="success-icon">🎉</span>
          <p className="body-text">You built {target.number.toLocaleString()} correctly!</p>
          <div className="station-success-btns">
            <button className="btn-primary" onClick={newProblem}>Try Another</button>
            <button className="btn-green" onClick={onComplete}>Complete Station ✅</button>
          </div>
        </div>
      ) : (
        <div className="station-actions">
          <button className="btn-outline" onClick={() => { setPlaced({ tt:0,th:0,h:0,t:0,o:0 }); setSuccess(false); }}>Reset</button>
          <button className="btn-primary" onClick={handleCheck}>Check Answer</button>
          <button className="btn-outline" onClick={newProblem}>New Number</button>
        </div>
      )}
    </div>
  );
}
