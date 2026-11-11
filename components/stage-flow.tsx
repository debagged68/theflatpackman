'use client';

import { useEffect, useState, type ReactNode } from 'react';

export function StageFlow({ children, labels }: { children: ReactNode; labels: string[] }) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPlaying(!preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!playing || hovering || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStage(current => (current + 1) % labels.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [playing, hovering, focused, labels.length]);

  return (
    <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}>
      <div className="flow-controls">
        <button type="button" onClick={() => setPlaying(value => !value)}>{playing ? 'Pause stages' : 'Play stages'}</button>
        <div className="stage-buttons" role="group" aria-label="Choose a stage">
          {labels.map((label, index) => (
            <button type="button" key={label} aria-label={label} aria-pressed={stage === index}
              onClick={() => { setStage(index); setPlaying(false); }}>{index + 1}</button>
          ))}
        </div>
      </div>
      <div className="flow-window">
        <div className="stage-flow" data-stage={stage}>{children}</div>
      </div>
    </div>
  );
}
