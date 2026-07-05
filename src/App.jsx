import React, { useReducer, useEffect, useCallback } from 'react';
import './App.css';
import IntroScreen      from './components/IntroScreen.jsx';
import ProgressMap      from './components/ProgressMap.jsx';
import FloatingNumbers  from './components/shared/FloatingNumbers.jsx';
import WonderPhase      from './components/phases/WonderPhase.jsx';
import StoryPhase       from './components/phases/StoryPhase.jsx';
import SimulatePhase    from './components/phases/SimulatePhase.jsx';
import PlayPhase        from './components/phases/PlayPhase.jsx';
import ReflectPhase     from './components/phases/ReflectPhase.jsx';
import { generateSessionQuestions } from './utils/shuffle.js';
import { checkBadges }  from './utils/badgeEngine.js';
import { calcXP, calcStars } from './utils/scoring.js';
import questionBank     from './data/questionBank.js';

const SESSION_KEY = 'intellia_g3_expanded_form_v1';

const initialState = {
  phase: 'intro',
  storyPanel: 0,
  currentSimStation: 0,
  simStationsComplete: [false, false, false, false],
  questionSet: [],
  currentQuestion: 0,
  currentDistrict: 0,
  districtScores: Array(10).fill(null),
  districtCorrect: Array(10).fill(0),
  hintsUsed: 0,
  attemptCount: 0,
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  newBadge: null,
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },
  sessionId: crypto.randomUUID(),
  audioEnabled: true,
  musicEnabled: false,
  showFeedback: null, // null | 'correct' | 'incorrect'
  feedbackMsg: '',
  showBadgeToast: null,
  xpToast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE': return { ...state, phase: action.payload };
    case 'NEXT_STORY_PANEL':
      if (state.storyPanel >= 3) return { ...state, phase: 'simulate', phaseComplete: { ...state.phaseComplete, story: true } };
      return { ...state, storyPanel: state.storyPanel + 1 };
    case 'PREV_STORY_PANEL':
      if (state.storyPanel === 0) return state;
      return { ...state, storyPanel: state.storyPanel - 1 };
    case 'ADVANCE_SIM_STATION':
      return { ...state, currentSimStation: Math.min(state.currentSimStation + 1, 3) };
    case 'PREV_SIM_STATION':
      return { ...state, currentSimStation: Math.max(state.currentSimStation - 1, 0) };
    case 'COMPLETE_SIM_STATION': {
      const sc = [...state.simStationsComplete];
      sc[action.payload] = true;
      const allDone = sc.every(Boolean);
      return {
        ...state,
        simStationsComplete: sc,
        ...(allDone ? { phaseComplete: { ...state.phaseComplete, simulate: true } } : {}),
      };
    }
    case 'LOAD_QUESTIONS':
      return { ...state, questionSet: action.payload, currentQuestion: 0, currentDistrict: 0, districtCorrect: Array(10).fill(0), districtScores: Array(10).fill(null), streak: 0 };
    case 'ANSWER_CORRECT': {
      const newStreak = state.streak + 1;
      const maxStreak = Math.max(state.maxStreak, newStreak);
      const xpGained = calcXP(state.attemptCount + 1, state.hintsUsed, newStreak);
      const newXP = state.xp + xpGained;
      const districtCorrect = [...state.districtCorrect];
      districtCorrect[state.currentDistrict] = (districtCorrect[state.currentDistrict] || 0) + 1;
      return {
        ...state,
        xp: newXP,
        streak: newStreak,
        maxStreak,
        districtCorrect,
        hintsUsed: 0,
        attemptCount: 0,
        showFeedback: 'correct',
        xpToast: `+${xpGained} XP`,
      };
    }
    case 'ANSWER_INCORRECT': {
      return {
        ...state,
        streak: 0,
        attemptCount: state.attemptCount + 1,
        showFeedback: 'incorrect',
        feedbackMsg: action.payload || '',
      };
    }
    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    case 'CLEAR_FEEDBACK':
      return { ...state, showFeedback: null, feedbackMsg: '', xpToast: null };
    case 'NEXT_QUESTION': {
      const nextQ = state.currentQuestion + 1;
      const distIdx = Math.floor(nextQ / 10);
      const isNewDistrict = nextQ % 10 === 0 && nextQ < 100;
      const districtScores = [...state.districtScores];
      // Score completed district
      if (isNewDistrict || nextQ >= 100) {
        const justDone = state.currentDistrict;
        districtScores[justDone] = state.districtCorrect[justDone] || 0;
      }
      const newDistrict = Math.min(distIdx, 9);
      if (nextQ >= 100) {
        const totalStars = districtScores.reduce((s, sc) => {
          if (sc === null) return s;
          if (sc >= 9) return s + 3;
          if (sc >= 7) return s + 2;
          if (sc >= 5) return s + 1;
          return s;
        }, 0);
        return { ...state, currentQuestion: nextQ, districtScores, phaseComplete: { ...state.phaseComplete, play: true }, totalStars };
      }
      return {
        ...state,
        currentQuestion: nextQ,
        currentDistrict: newDistrict,
        districtScores,
        attemptCount: 0,
        hintsUsed: 0,
      };
    }
    case 'UNLOCK_BADGE': {
      if (state.badges.includes(action.payload)) return state;
      return { ...state, badges: [...state.badges, action.payload], showBadgeToast: action.payload };
    }
    case 'CLEAR_BADGE_TOAST': return { ...state, showBadgeToast: null };
    case 'COMPLETE_PHASE':
      return { ...state, phaseComplete: { ...state.phaseComplete, [action.payload]: true } };
    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };
    case 'TOGGLE_MUSIC':
      return { ...state, musicEnabled: !state.musicEnabled };
    case 'RESTORE_SESSION':
      return { ...state, ...action.payload, phase: 'intro', savedPhase: action.payload.phase };
    case 'RESET_SESSION':
      return { ...initialState, sessionId: crypto.randomUUID(), questionSet: generateSessionQuestions(questionBank), audioEnabled: state.audioEnabled };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Always start a fresh session on load
  useEffect(() => {
    localStorage.removeItem(SESSION_KEY); // Clear any old sessions
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
  }, []);

  // Intentionally skipped persisting session to Ensure Fresh Start for users

  // Badge check
  useEffect(() => {
    const newBadges = checkBadges(state);
    newBadges.forEach(id => dispatch({ type: 'UNLOCK_BADGE', payload: id }));
  }, [state.phaseComplete, state.simStationsComplete, state.districtScores, state.maxStreak]);

  const goHome = useCallback(() => {
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }, []);

  const phases = ['wonder', 'story', 'simulate', 'play', 'reflect'];
  const phaseIndex = phases.indexOf(state.phase);

  return (
    <div className="app-shell">
      <FloatingNumbers />
      {state.phase !== 'intro' && (
        <header className="app-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 30px',
          background: 'transparent',
          width: '100%',
          position: 'fixed',
          top: 0, left: 0, zIndex: 150
        }}>
          <button className="home-btn" onClick={goHome} aria-label="Home">🏠 Home</button>
          
          <div className="header-progress" style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
            <ProgressMap currentPhase={state.phase} phaseComplete={state.phaseComplete} />
          </div>

          <button className="audio-btn" onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })} aria-label="Toggle audio">
            {state.audioEnabled ? '🔊' : '🔇'}
          </button>
        </header>
      )}

      <main className="phase-content" style={{marginTop: state.phase !== 'intro' ? '60px' : '0'}}>        {state.phase === 'intro'    && <IntroScreen   state={state} dispatch={dispatch} />}
        {state.phase === 'wonder'   && <WonderPhase   state={state} dispatch={dispatch} />}
        {state.phase === 'story'    && <StoryPhase    state={state} dispatch={dispatch} />}
        {state.phase === 'simulate' && <SimulatePhase state={state} dispatch={dispatch} />}
        {state.phase === 'play'     && <PlayPhase     state={state} dispatch={dispatch} />}
        {state.phase === 'reflect'  && <ReflectPhase  state={state} dispatch={dispatch} />}
      </main>
    </div>
  );
}
