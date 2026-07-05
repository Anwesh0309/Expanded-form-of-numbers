import React from 'react';
import './QuestionRenderer.css';
import PlaceValueChart from '../shared/PlaceValueChart.jsx';
import ExpandedFormRibbon from '../shared/ExpandedFormRibbon.jsx';

export default function QuestionRenderer({ question, onAnswer, hintsShown, showHint, onHint, isLocked }) {
  if (!question) return null;

  const { type, questionText, options, correctAnswer, visual, hint1, hint2,
          expandedTerms, digits, value, missingTermIndex } = question;

  const pvDigits = digits ? {
    tenThousands: digits.tenThousands,
    thousands:    digits.thousands,
    hundreds:     digits.hundreds,
    tens:         digits.tens,
    ones:         digits.ones,
  } : null;

  return (
    <div className="qr-wrap glass-card">
      {/* Visual aid */}
      {pvDigits && (visual === 'chart' || visual === 'compare') && (
        <div className="qr-visual">
          <PlaceValueChart digits={pvDigits} compact />
        </div>
      )}
      {visual === 'ribbon' && expandedTerms && (
        <div className="qr-visual">
          <ExpandedFormRibbon terms={expandedTerms} standardValue={value} missingIndex={missingTermIndex} />
        </div>
      )}
      {visual === 'pattern' && (
        <div className="qr-pattern-preview">
          {question.questionText.match(/[\d,]+/g)?.slice(0, 4).map((n, i) => (
            <React.Fragment key={i}>
              <span className="pattern-num">{n}</span>
              {i < 3 && <span className="pattern-arrow">→</span>}
            </React.Fragment>
          ))}
          <span className="pattern-arrow">→</span>
          <span className="pattern-blank">?</span>
        </div>
      )}

      {/* Question text */}
      <p className="qr-question body-text">{questionText}</p>

      {/* Options — 2×2 grid for 4 options, 1×2 for 2 options */}
      <div className={`qr-options ${options?.length === 2 ? 'two-cols' : 'four-cols'}`}>
        {options?.map((opt, i) => (
          <button
            key={i}
            className="qr-option"
            onClick={() => !isLocked && onAnswer(opt)}
            disabled={isLocked}
            aria-label={`Option: ${opt}`}
          >
            <span className="qr-opt-letter">{String.fromCharCode(65 + i)}</span>
            <span className="qr-opt-text">{opt}</span>
          </button>
        ))}
      </div>

      {/* Hint area */}
      <div className="qr-hint-area">
        {showHint === 1 && (
          <div className="qr-hint anim-slide-up">
            <span className="hint-icon">💡</span>
            <span>{hint1}</span>
          </div>
        )}
        {showHint === 2 && (
          <div className="qr-hint anim-slide-up">
            <span className="hint-icon">🔑</span>
            <span>{hint2}</span>
          </div>
        )}
        {hintsShown < 2 && (
          <button className="hint-btn" onClick={onHint} aria-label="Show hint">
            💡 Hint {hintsShown + 1}
          </button>
        )}
      </div>
    </div>
  );
}
