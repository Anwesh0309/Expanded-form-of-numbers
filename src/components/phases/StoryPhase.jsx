import React, { useEffect, useRef } from 'react';
import './StoryPhase.css';
import Mascot from '../shared/Mascot.jsx';
import PlaceValueChart from '../shared/PlaceValueChart.jsx';
import ExpandedFormRibbon from '../shared/ExpandedFormRibbon.jsx';
import { STORY_PANELS } from '../../data/storyContent.js';
import { useAudio } from '../../hooks/useAudio.js';
import { storyNarration } from '../../utils/narration.js';

const BLOCK_ICONS = { tt:'🟪', th:'🟦', h:'🟧', t:'🟨', o:'🟩' };

function StoryImage({ panel }) {
  // Use the new generated images instead of the custom JSX
  return (
    <div className="story-image-box" style={{ background: panel.imageBg, padding: 0, overflow: 'hidden' }}>
      <img src={`/assets/images/story_${panel.panel}.png`} alt={panel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
    </div>
  );
}

export default function StoryPhase({ state, dispatch }) {
  const panel = STORY_PANELS[state.storyPanel];
  const { narrate, stopAll } = useAudio(state.audioEnabled);
  useEffect(() => {
    stopAll();
    const timer = setTimeout(() => narrate(storyNarration(state.storyPanel)), 300);
    return () => { clearTimeout(timer); stopAll(); };
  }, [state.storyPanel, narrate, stopAll]);

  function handleNext() {
    stopAll();
    dispatch({ type: 'NEXT_STORY_PANEL' });
  }
  function handlePrev() {
    stopAll();
    dispatch({ type: 'PREV_STORY_PANEL' });
  }

  return (
    <div className="story-wrap">
      <div className="story-card glass-card anim-slide-up" key={state.storyPanel}>
        {/* Header */}
        <div className="story-header">
          <span className="story-phase-label">📖 Siya's Toy Factory</span>
          <div className="story-dots">
            {STORY_PANELS.map((_, i) => (
              <span key={i} className={`story-dot ${i === state.storyPanel ? 'active' : ''} ${i < state.storyPanel ? 'done' : ''}`} />
            ))}
          </div>
          <span className="story-counter">{state.storyPanel + 1} / {STORY_PANELS.length}</span>
        </div>

        {/* Content: image + text */}
        <div className="story-body">
          <div className="story-image-col">
            <StoryImage panel={panel} />
          </div>
          <div className="story-text-col">
            <h2 className="story-panel-title subheadline">{panel.title}</h2>
            <p className="story-panel-text body-text">{panel.text}</p>
            <div className="story-mascot-row">
              <Mascot mood={state.storyPanel === 3 ? 'celebrating' : 'happy'} size="sm" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="story-nav">
          <button
            className="btn-outline"
            onClick={handlePrev}
            disabled={state.storyPanel === 0}
            aria-label="Previous panel"
          >
            ← Previous
          </button>
          <button className="btn-primary" onClick={handleNext} aria-label="Next panel">
            {state.storyPanel < STORY_PANELS.length - 1 ? 'Next →' : 'Start Simulating! 🧪'}
          </button>
        </div>
      </div>
    </div>
  );
}
