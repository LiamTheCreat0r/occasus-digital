import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./VideoReel.module.css";

export interface Clip {
  src: string;
  poster: string;
  label: string;
}

/**
 * Full-bleed background reel that crossfades through gameplay clips.
 * Only the current and next clip are mounted, so we never download all ~90MB.
 */
export function VideoReel({
  clips,
  onChange,
  maxClipSeconds = 9,
}: {
  clips: Clip[];
  onChange?: (index: number) => void;
  maxClipSeconds?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => setHydrated(true), []);
  useEffect(() => onChange?.(index), [index, onChange]);

  const next = (index + 1) % clips.length;

  useEffect(() => {
    if (!hydrated || reduced) return;
    const v = videoRefs.current[index];
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    const advance = () => setIndex((i) => (i + 1) % clips.length);
    const timer = window.setTimeout(advance, maxClipSeconds * 1000);
    v.addEventListener("ended", advance);
    return () => {
      window.clearTimeout(timer);
      v.removeEventListener("ended", advance);
    };
  }, [index, hydrated, reduced, clips.length, maxClipSeconds]);

  return (
    <div className={styles.reel} aria-hidden="true">
      {clips.map((clip, i) => {
        const active = i === index;
        const mounted = hydrated && !reduced && (active || i === next);
        return (
          <div key={clip.src} className={styles.layer} data-active={active}>
            <img src={clip.poster} alt="" className={styles.media} />
            {mounted && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className={styles.media}
                src={clip.src}
                muted
                playsInline
                preload={active ? "auto" : "metadata"}
              />
            )}
          </div>
        );
      })}
      <div className={styles.scan} />
    </div>
  );
}
