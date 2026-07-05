import React from 'react';
import './ProgressMap.css';

const PHASES = [
  { key: 'wonder',   num: '01', icon: '🧞‍♂️', label: 'Wonder'   },
  { key: 'story',    num: '02', icon: '📖', label: 'Story'    },
  { key: 'simulate', num: '03', icon: '✏️', label: 'Simulate' },
  { key: 'play',     num: '04', icon: '🎮', label: 'Play'     },
  { key: 'reflect',  num: '05', icon: '📓', label: 'Reflect'  },
];

export default function ProgressMap({ currentPhase, phaseComplete }) {
  const currentIdx = PHASES.findIndex(p => p.key === currentPhase);

  return (
    <nav className="progress-bar-nav" role="navigation" aria-label="Learning journey phases">
      <div className="progress-bar-pill">
        {PHASES.map((p, i) => {
          const isActive    = p.key === currentPhase;
          const isCompleted = phaseComplete?.[p.key];
          
          return (
            <React.Fragment key={p.key}>
              <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <span className={`step-circle ${isCompleted ? 'circle-done' : isActive ? 'circle-active' : 'circle-idle'}`}>
                  {isCompleted ? '✓' : p.num}
                </span>
                <span className="step-label">
                  <span className="step-label-icon">{p.icon}</span> {p.label}
                </span>
              </div>
              {i < PHASES.length - 1 && <span className="step-divider">—</span>}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
