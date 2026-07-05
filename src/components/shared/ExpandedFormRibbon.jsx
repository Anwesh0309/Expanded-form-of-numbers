import React from 'react';

const TERM_COLORS = ['#7C4DFF', '#4A90D9', '#FF8A50', '#FFD54F', '#66BB6A'];

export default function ExpandedFormRibbon({ terms, standardValue, missingIndex, animated = false, shake = false }) {
  const validTerms = Array.isArray(terms) ? terms : [0, 0, 0, 0, 0];
  const tw = 110;
  const gap = 30;
  const total = validTerms.length * tw + (validTerms.length - 1) * gap;
  const svgW = total + 100;

  return (
    <svg
      viewBox={`0 0 ${svgW} 90`}
      width="100%"
      style={{ maxWidth: Math.min(svgW, 760), display: 'block' }}
      aria-label="Expanded form equation"
      role="img"
      className={shake ? 'anim-shake' : animated ? 'anim-bounce-in' : ''}
    >
      {validTerms.map((term, i) => {
        const isMissing = i === missingIndex;
        const x = i * (tw + gap);
        const color = TERM_COLORS[i % TERM_COLORS.length];
        return (
          <g key={i} transform={`translate(${x}, 10)`}>
            <rect
              x="2" y="0" width={tw - 4} height="52"
              rx="10"
              fill={isMissing ? '#FFF9C4' : color}
              stroke={isMissing ? '#FFB300' : 'rgba(255,255,255,0.2)'}
              strokeWidth={isMissing ? 2.5 : 1}
              strokeDasharray={isMissing ? '6,3' : '0'}
            />
            <text
              x={tw / 2} y="32"
              textAnchor="middle"
              fontSize="17"
              fontWeight="900"
              fill={isMissing ? '#999' : '#fff'}
              fontFamily="Fredoka, sans-serif"
            >
              {isMissing ? '?' : (term || 0).toLocaleString()}
            </text>
            {i < validTerms.length - 1 && (
              <text x={tw + 11} y="32" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFD54F" fontFamily="Fredoka, sans-serif">+</text>
            )}
          </g>
        );
      })}
      {standardValue !== undefined && (
        <text
          x={svgW - 6} y="42"
          textAnchor="end"
          fontSize="20"
          fontWeight="900"
          fill="#FFD54F"
          fontFamily="Fredoka, sans-serif"
        >
          = {standardValue.toLocaleString()}
        </text>
      )}
    </svg>
  );
}
