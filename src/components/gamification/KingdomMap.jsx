import React from 'react';
import './KingdomMap.css';
import StarRating from './StarRating.jsx';
import { calcStars } from '../../utils/scoring.js';

const NAMES = [
  'Digit Village','Ones & Tens Orchard','Hundred Grove','Thousands Town',
  'Ten-Thousand Trail','Sliderland Summit','Expansion Estuary',
  'Comparison Cliffs','Pattern Peaks','Place Value Palace',
];
const ICONS = ['🏘️','🌾','🌲','🏙️','🛤️','🏔️','🌊','⛰️','🗻','🏰'];
const DIFFS = ['Easy','Easy','Easy','Medium','Medium','Medium','Medium','Hard','Hard','Hard'];

export default function KingdomMap({ districtScores, districtCorrect, currentDistrict }) {
  return (
    <div className="kingdom-map">
      {NAMES.map((name, i) => {
        const score   = districtScores?.[i] ?? null;
        const correct = districtCorrect?.[i] ?? 0;
        const stars   = score !== null ? calcStars(score) : null;
        const isDone  = score !== null;
        const isActive = i === currentDistrict;
        const isLocked = !isDone && i > currentDistrict;
        return (
          <div
            key={i}
            className={`district-card ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}`}
          >
            <span className="district-icon">{ICONS[i]}</span>
            <div className="district-info">
              <span className="district-num label-text">District {i + 1}</span>
              <span className="district-name label-text">{name}</span>
              <span className="district-diff label-text" style={{ color: DIFFS[i] === 'Easy' ? 'var(--green)' : DIFFS[i] === 'Medium' ? 'var(--gold)' : 'var(--red)' }}>
                {DIFFS[i]}
              </span>
            </div>
            <div className="district-status">
              {isDone
                ? <StarRating stars={stars} size="sm" />
                : isActive
                  ? <span className="district-badge active-badge">▶ Current</span>
                  : <span className="district-badge locked-badge">🔒</span>
              }
              {isDone && <span className="district-score label-text">{correct}/10</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
