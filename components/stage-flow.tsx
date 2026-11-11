'use client';

import { useEffect, useRef, useState } from 'react';

type Stage = { title: string; detail: string };

export function StageFlow({ stages }: { stages: Stage[] }) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const player = useRef<HTMLDivElement>(null);
  const last = stages.length - 1;
  const current = stages[stage];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPlaying(!preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const target = player.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.4 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStage((stage + 1) % stages.length);
    }, stage === last ? 2400 : stage === 0 ? 1500 : 1000);
    return () => window.clearInterval(timer);
  }, [playing, inView, stage, last, stages.length]);

  function select(index: number) {
    setPlaying(false);
    setStage(index);
  }

  return (
    <div className="transformation-player" ref={player}>
      <div className="wardrobe-motion" role="img" aria-label={current.detail}>
        {stages.map(({ title }, index) => (
          <span key={title} aria-hidden="true" className="wardrobe-frame"
            data-active={index === stage}
            style={{ backgroundPosition: `${(index % 5) * 25}% ${Math.floor(index / 5) * 100}%` }} />
        ))}
      </div>
      <div className="transformation-caption">
        <p className="stage-count">Stage {stage + 1} of {stages.length}</p>
        <h3>{current.title}</h3>
        <p className="stage-detail">{current.detail}</p>
        <label className="sr-only" htmlFor="transformation-position">Transformation stage</label>
        <input id="transformation-position" className="stage-position" type="range" min={1}
          max={stages.length} value={stage + 1} aria-valuetext={`Stage ${stage + 1} of ${stages.length}: ${current.title}`}
          onChange={event => select(event.currentTarget.valueAsNumber - 1)} />
        <div className="flow-controls">
          <button type="button" aria-label="Previous stage" disabled={stage === 0}
            onClick={() => select(stage - 1)}>←</button>
          <button type="button" onClick={() => setPlaying(value => !value)}>
            {playing ? 'Pause transformation' : 'Play transformation'}
          </button>
          <button type="button" aria-label="Next stage" disabled={stage === last}
            onClick={() => select(stage + 1)}>→</button>
        </div>
      </div>
    </div>
  );
}
