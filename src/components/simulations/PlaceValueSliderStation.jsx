import React, { useState, useCallback, useRef } from 'react';
import './Stations.css';
import PlaceValueChart from '../shared/PlaceValueChart.jsx';

const COL_DEFS = [
  { key: 'tt', label: 'Ten Thousands', short: 'TTh', pv: 10000, color: '#7C4DFF' },
  { key: 'th', label: 'Thousands',     short: 'Th',  pv: 1000,  color: '#4A90D9' },
  { key: 'h',  label: 'Hundreds',      short: 'H',   pv: 100,   color: '#FF8A50' },
  { key: 't',  label: 'Tens',          short: 'T',   pv: 10,    color: '#FFD54F' },
  { key: 'o',  label: 'Ones',          short: 'O',   pv: 1,     color: '#66BB6A' },
];

function fmtTerm(d, pv) {
  const v = d * pv;
  return v === 0 ? '0' : v.toLocaleString();
}

export default function PlaceValueSliderStation({ onComplete }) {
  const [digits, setDigits] = useState({ tt: 6, th: 3, h: 4, t: 8, o: 1 });
  const prevDigits = useRef({ ...digits });
  const [changedKey, setChangedKey] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const stdValue = digits.tt * 10000 + digits.th * 1000 + digits.h * 100 + digits.t * 10 + digits.o;
  const expandedStr = COL_DEFS.map(c => fmtTerm(digits[c.key], c.pv)).join(' + ');

  function handleSlider(key, val) {
    const num = Number(val);
    prevDigits.current = { ...digits };
    const pv = COL_DEFS.find(c => c.key === key)?.pv || 1;
    const pvLabel = COL_DEFS.find(c => c.key === key)?.label || key;
    const diff = (num - prevDigits.current[key]) * pv;
    if (diff !== 0) {
      setFeedbackMsg(`⚠️ Changing the ${pvLabel} digit moves the value by ${Math.abs(diff).toLocaleString()}!`);
    }
    setDigits(d => ({ ...d, [key]: num }));
    setChangedKey(key);
    setTimeout(() => setChangedKey(null), 1000);
  }

  function randomise() {
    const newD = { tt: 1 + Math.floor(Math.random()*9), th: Math.floor(Math.random()*10), h: Math.floor(Math.random()*10), t: Math.floor(Math.random()*10), o: Math.floor(Math.random()*10) };
    setDigits(newD);
    setFeedbackMsg('');
    setChangedKey(null);
  }

  const pvChartDigits = { tenThousands: digits.tt, thousands: digits.th, hundreds: digits.h, tens: digits.t, ones: digits.o };

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🎚️ Place Value Slider</h3>
      </div>

      <div className="slider-station">
        {/* Big number */}
        <div className="slider-display-num number-display">{stdValue.toLocaleString()}</div>
        <div className="slider-expanded">{expandedStr}</div>

        {/* Sliders */}
        <div className="sliders-row">
          {COL_DEFS.map(col => (
            <div key={col.key} className={`slider-col ${changedKey === col.key ? 'anim-bounce-in' : ''}`}>
              <span className="slider-col-label" style={{ color: col.color }}>{col.short}</span>
              <span className="slider-col-digit" style={{ color: changedKey === col.key ? col.color : '#fff' }}>
                {digits[col.key]}
              </span>
              <input
                type="range"
                min="0"
                max={col.key === 'tt' ? 9 : 9}
                value={digits[col.key]}
                onChange={e => handleSlider(col.key, e.target.value)}
                className="slider-range"
                style={{ accentColor: col.color }}
                aria-label={`${col.label} digit slider`}
              />
            </div>
          ))}
        </div>

        {/* Place value chart */}
        <PlaceValueChart digits={pvChartDigits} highlightColumn={changedKey} animated compact />

        {/* Feedback banner */}
        {feedbackMsg && (
          <div className="slider-feedback anim-slide-up">{feedbackMsg}</div>
        )}

        <div className="station-actions">
          <button className="btn-outline" onClick={randomise}>🎲 Random Number</button>
          <button className="btn-green" onClick={onComplete}>Complete Station ✅</button>
        </div>
      </div>
    </div>
  );
}
