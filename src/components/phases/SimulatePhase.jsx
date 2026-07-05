import React, { useEffect, useRef } from 'react';
import './SimulatePhase.css';
import BlockBuilderStation  from '../simulations/BlockBuilderStation.jsx';
import ExpandedFormStation  from '../simulations/ExpandedFormStation.jsx';
import PlaceValueSliderStation from '../simulations/PlaceValueSliderStation.jsx';
import SpotErrorStation     from '../simulations/SpotErrorStation.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { simStationIntro } from '../../utils/narration.js';

const STATIONS = [
  { id: 0, label: 'A', name: 'Block Builder',   icon: '🧱', desc: 'Drag blocks to build numbers' },
  { id: 1, label: 'B', name: 'Expanded Builder', icon: '🔢', desc: 'Assemble the addition sentence' },
  { id: 2, label: 'C', name: 'Place Value Slider', icon: '🎚️', desc: 'Live slider exploration' },
  { id: 3, label: 'D', name: 'Spot the Error',  icon: '🔍', desc: 'Find the incorrect term' },
];

export default function SimulatePhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state.audioEnabled);
  const prevStation = useRef(-1);

  useEffect(() => {
    if (prevStation.current !== state.currentSimStation) {
      prevStation.current = state.currentSimStation;
      stopAll();
      setTimeout(() => narrate(simStationIntro(state.currentSimStation)), 400);
    }
    return () => {};
  }, [state.currentSimStation]);

  useEffect(() => {
    return () => stopAll();
  }, []);

  function handleStationComplete(stationIdx) {
    stopAll();
    dispatch({ type: 'COMPLETE_SIM_STATION', payload: stationIdx });
    if (stationIdx < 3) {
      setTimeout(() => dispatch({ type: 'ADVANCE_SIM_STATION' }), 600);
    } else {
      setTimeout(() => dispatch({ type: 'SET_PHASE', payload: 'play' }), 900);
    }
  }

  function goToPrev() {
    stopAll();
    dispatch({ type: 'PREV_SIM_STATION' });
  }
  function goToNext() {
    stopAll();
    dispatch({ type: 'ADVANCE_SIM_STATION' });
  }

  const s = state.currentSimStation;

  return (
    <div className="sim-wrap">
      <div className="sim-card glass-card">
        {/* Tabs */}
        <div className="sim-tabs" role="tablist">
          {STATIONS.map(st => (
            <button
              key={st.id}
              role="tab"
              aria-selected={s === st.id}
              className={`sim-tab ${s === st.id ? 'active' : ''} ${state.simStationsComplete[st.id] ? 'done' : ''}`}
              onClick={() => { 
                if (st.id > s && !state.simStationsComplete[s]) return; // locked
                stopAll(); 
                dispatch({ type: 'SET_PHASE', payload: state.phase }); 
                // Using SET_PHASE to trigger re-render? That's weird but ok.
                // We'll just dispatch ADVANCE/PREV to accurately jump to the tab if we want?
                // Actually to jump to a specific tab, we would need a SET_SIM_STATION. 
                // Let's just allow clicking if it's already completed.
                // Wait, the original code had a weird logic for clicking tabs. Let's fix that.
                if (st.id > s) {
                  for(let i=0; i<st.id-s; i++) dispatch({ type: 'ADVANCE_SIM_STATION' });
                } else if (st.id < s) {
                  for(let i=0; i<s-st.id; i++) dispatch({ type: 'PREV_SIM_STATION' });
                }
              }}
              aria-label={`Station ${st.label}: ${st.name}`}
              disabled={st.id > s && !state.simStationsComplete[s]}
            >
              <span className="tab-icon">{state.simStationsComplete[st.id] ? '✅' : st.icon}</span>
              <span className="tab-name">{st.name}</span>
            </button>
          ))}
        </div>

        {/* Station content */}
        <div className="sim-station-area" role="tabpanel" key={s}>
          {s === 0 && <BlockBuilderStation  onComplete={() => handleStationComplete(0)} audioEnabled={state.audioEnabled} />}
          {s === 1 && <ExpandedFormStation  onComplete={() => handleStationComplete(1)} audioEnabled={state.audioEnabled} />}
          {s === 2 && <PlaceValueSliderStation onComplete={() => handleStationComplete(2)} audioEnabled={state.audioEnabled} />}
          {s === 3 && <SpotErrorStation     onComplete={() => handleStationComplete(3)} audioEnabled={state.audioEnabled} />}
        </div>

        {/* Footer nav */}
        <div className="sim-footer">
          <button className="btn-outline" onClick={goToPrev} disabled={s === 0}>← Previous Station</button>
          <div className="sim-progress-dots">
            {STATIONS.map(st => (
              <span key={st.id} className={`sim-dot ${s === st.id ? 'active' : ''} ${state.simStationsComplete[st.id] ? 'done' : ''}`} />
            ))}
          </div>
          {s < 3
            ? <button className="btn-outline" onClick={goToNext} disabled={!state.simStationsComplete[s]}>Next Station →</button>
            : (state.simStationsComplete[3] ? <button className="btn-primary" onClick={() => { stopAll(); dispatch({ type: 'SET_PHASE', payload: 'play' }); }}>Start Playing! 🎮</button> : null)
          }
        </div>
      </div>
    </div>
  );
}
