import React, { useState, useEffect, useRef } from 'react';
import './PlayPhase.css';
import KingdomMap from '../gamification/KingdomMap.jsx';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import StreakCounter from '../gamification/StreakCounter.jsx';
import StarRating from '../gamification/StarRating.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { calcStars } from '../../utils/scoring.js';
import {
  playQuestionNarration,
  playCorrectNarration,
  playWrongNarration,
  playHint1Narration,
  playHint2Narration,
  districtCompleteNarration,
} from '../../utils/narration.js';

const DISTRICT_NAMES = [
  'Digit Village','Ones & Tens Orchard','Hundred Grove','Thousands Town',
  'Ten-Thousand Trail','Sliderland Summit','Expansion Estuary',
  'Comparison Cliffs','Pattern Peaks','Place Value Palace',
];

export default function PlayPhase({ state, dispatch }) {
  const { narrate, stopAll, sounds } = useAudio(state.audioEnabled);
  const [showMap, setShowMap]         = useState(state.currentQuestion % 10 === 0 && state.currentQuestion > 0 ? true : state.currentDistrict === 0 && state.currentQuestion === 0 ? true : false);
  const [hintsShown, setHintsShown]   = useState(0);
  const [showHint, setShowHint]       = useState(false);
  const [xpToast, setXpToast]         = useState(null);
  const feedbackTimer = useRef(null);

  const qs = state.questionSet;
  const qIdx = state.currentQuestion;
  const question = qs[qIdx];
  const distIdx = state.currentDistrict;
  const qInDistrict = qIdx % 10;
  const isPlayDone = state.phaseComplete?.play;

  // Narrate question when it changes
  useEffect(() => {
    if (!showMap && question) {
      stopAll(); // Stop any other audio immediately
      const timer = setTimeout(() => {
        // Double check no other audio plays
        narrate(playQuestionNarration(question.questionText));
      }, 400);
      return () => { clearTimeout(timer); stopAll(); };
    }
  }, [qIdx, showMap, stopAll, narrate, question]);

  // Auto-dismiss popup after 1s
  useEffect(() => {
    if (state.showFeedback) {
      feedbackTimer.current = setTimeout(() => {
        if (state.showFeedback === 'correct') {
          dispatch({ type: 'CLEAR_FEEDBACK' });
          advanceQuestion();
        } else {
          handleAfterWrong();
        }
      }, 1000);
    }
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, [state.showFeedback]);

  // Clear feedback timer on unmount
  useEffect(() => {
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); stopAll(); };
  }, []);

  function handleAnswer(answer) {
    stopAll();
    const isCorrect = String(answer).trim() === String(question.correctAnswer).trim();

    if (isCorrect) {
      sounds.correct();
      const xpGained = state.streak >= 5 ? 15 : state.attemptCount === 0 ? 10 : 7;
      dispatch({ type: 'ANSWER_CORRECT' });
      narrate(playCorrectNarration(state.streak + 1));
      // Auto-advance is handled by the 1s useEffect above

    } else {
      sounds.wrong();
      dispatch({ type: 'ANSWER_INCORRECT', payload: question.explanation });
      narrate(playWrongNarration());
      setHintsShown(0);
    }
  }

  function advanceQuestion() {
    setHintsShown(0);
    setShowHint(false);
    const nextIdx = qIdx + 1;

    if (nextIdx % 10 === 0 && nextIdx <= 100) {
      // District complete
      const correct = state.districtCorrect[distIdx] || 0;
      const stars = calcStars(correct + (state.showFeedback === 'correct' ? 1 : 0));
      sounds.levelUp();
      narrate(districtCompleteNarration());
      dispatch({ type: 'NEXT_QUESTION' });
      setShowMap(true); // Always show map when district complete, even for 100!
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }

  function handleShowHint() {
    stopAll();
    dispatch({ type: 'USE_HINT' });
    if (hintsShown === 0) {
      setShowHint(1);
      setHintsShown(1);
      narrate(playHint1Narration());
    } else {
      setShowHint(2);
      setHintsShown(2);
      narrate(playHint2Narration());
    }
  }

  function handleAfterWrong() {
    dispatch({ type: 'CLEAR_FEEDBACK' });
    advanceQuestion(); // skip immediately
  }

  function startDistrict(idx) {
    setShowMap(false);
    setTimeout(() => narrate(playQuestionNarration(qs[idx * 10]?.questionText || '')), 400);
  }

  // Play done screen
  if (isPlayDone || (qIdx >= 100 && !showMap)) {
    const totalCorrect = state.districtCorrect.reduce((s, c) => s + (c || 0), 0);
    const totalStars   = state.districtScores.reduce((s, sc) => {
      if (sc === null) return s;
      if (sc >= 9) return s + 3;
      if (sc >= 7) return s + 2;
      if (sc >= 5) return s + 1;
      return s;
    }, 0);
    return (
      <div className="play-done-wrap">
        <div className="play-done-card glass-card anim-bounce-in">
          <div className="play-done-icon">🏆</div>
          <h2 className="play-done-title headline">Play Phase Complete!</h2>
          <div className="play-done-stats">
            <div className="stat-pill"><span>✅</span><span>{totalCorrect}/100 Correct</span></div>
            <div className="stat-pill"><span>⭐</span><span>{state.xp} XP</span></div>
            <div className="stat-pill"><span>🔥</span><span>Best Streak: {state.maxStreak}</span></div>
          </div>
          <button className="btn-primary play-done-cta" onClick={() => dispatch({ type: 'SET_PHASE', payload: 'reflect' })}>
            🌟 Go to Reflect Phase
          </button>
        </div>
      </div>
    );
  }

  if (showMap) {
    const isAllDone = qIdx >= 100;
    return (
      <div className="play-map-wrap">
        <div className="play-map-card glass-card">
          <h2 className="play-map-title subheadline">🗺️ Place Value Kingdom</h2>
          <p className="body-text" style={{ color: 'var(--text-secondary)', textAlign:'center' }}>
            {isAllDone ? (
              <strong style={{ color: 'var(--gold)' }}>All Districts Complete!</strong>
            ) : (
              <>District {distIdx + 1}: <strong style={{ color: 'var(--gold)' }}>{DISTRICT_NAMES[distIdx]}</strong></>
            )}
          </p>
          <KingdomMap districtScores={state.districtScores} districtCorrect={state.districtCorrect} currentDistrict={isAllDone ? 10 : distIdx} />
          
          {isAllDone ? (
             <button className="btn-primary" onClick={() => setShowMap(false)} style={{ margin: '0 auto', display: 'block' }}>
               📊 View Results
             </button>
          ) : (
             <button className="btn-primary" onClick={() => startDistrict(distIdx)} style={{ margin: '0 auto', display: 'block' }}>
               🚀 Start {DISTRICT_NAMES[distIdx]}!
             </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="play-wrap">
      {/* HUD */}
      <div className="play-hud">
        <div className="hud-center">
          <span className="hud-district label-text">{DISTRICT_NAMES[distIdx]}</span>
          <span className="hud-progress label-text">{qInDistrict + 1}/10</span>
        </div>
        <div className="hud-right">
          <StreakCounter streak={state.streak} />
          <span className="hud-xp label-text">⭐ {state.xp} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="play-progress-bar">
        <div className="play-progress-fill" style={{ width: `${((qInDistrict + 1) / 10) * 100}%` }} />
      </div>

      {/* Question */}
      {question && (
        <div className="play-question-area">
          <QuestionRenderer
            question={question}
            onAnswer={handleAnswer}
            hintsShown={hintsShown}
            showHint={showHint}
            onHint={handleShowHint}
            isLocked={state.showFeedback === 'correct'}
          />
        </div>
      )}

      {/* XP toast */}
      {xpToast && (
        <div className="xp-toast anim-bounce-in" aria-live="polite">{xpToast}</div>
      )}

      {/* Feedback overlay for both right and wrong answers */}
      {state.showFeedback && (
        <FeedbackOverlay
          isCorrect={state.showFeedback === 'correct'}
          explanation={state.showFeedback === 'correct' ? question?.explanation : question?.explanation}
          onContinue={state.showFeedback === 'correct' ? () => { dispatch({ type: 'CLEAR_FEEDBACK' }); advanceQuestion(); } : handleAfterWrong}
        />
      )}
    </div>
  );
}
