import React from 'react';

const COLS = [
  { key: 'tenThousands', label: 'Ten Thousands', short: 'TTh', color: '#7C4DFF' },
  { key: 'thousands',    label: 'Thousands',     short: 'Th',  color: '#4A90D9' },
  { key: 'hundreds',     label: 'Hundreds',       short: 'H',   color: '#FF8A50' },
  { key: 'tens',         label: 'Tens',           short: 'T',   color: '#FFD54F' },
  { key: 'ones',         label: 'Ones',           short: 'O',   color: '#66BB6A' },
];

export default function PlaceValueChart({ digits = {}, highlightColumn, animated = false, compact = false }) {
  const w = compact ? 360 : 500;
  const colW = w / 5;

  return (
    <svg
      viewBox={`0 0 ${w} ${compact ? 120 : 150}`}
      width="100%"
      style={{ maxWidth: compact ? 360 : 500, display: 'block' }}
      aria-label="Place value chart"
      role="img"
    >
      {COLS.map((col, i) => {
        const isHighlit = highlightColumn === col.key || highlightColumn === col.short;
        const x = i * colW;
        const val = digits[col.key] ?? 0;
        return (
          <g key={col.key} transform={`translate(${x}, 0)`}>
            {/* Header */}
            <rect
              x="3" y="4" width={colW - 6} height={compact ? 32 : 38}
              rx="8" fill={isHighlit ? '#FFF9C4' : col.color} opacity={0.88}
              className={animated && isHighlit ? 'anim-bounce-in' : ''}
            />
            <text
              x={colW / 2} y={compact ? 25 : 28}
              textAnchor="middle"
              fontSize={compact ? '9' : '10.5'}
              fontWeight="800"
              fill={isHighlit ? '#1a1a2e' : '#fff'}
              fontFamily="Nunito, sans-serif"
            >
              {compact ? col.short : col.label}
            </text>
            {/* Divider */}
            <line x1="3" y1={compact ? 40 : 46} x2={colW - 3} y2={compact ? 40 : 46} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {/* Digit */}
            <text
              x={colW / 2}
              y={compact ? 92 : 118}
              textAnchor="middle"
              fontSize={compact ? '38' : '48'}
              fontWeight="900"
              fill={isHighlit ? '#FFD54F' : '#FFFFFF'}
              fontFamily="Fredoka, sans-serif"
            >
              {val === undefined ? ' ' : val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
