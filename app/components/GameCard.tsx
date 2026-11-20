import { useRef } from "react";
import { Link } from "react-router";
import type { Game } from "~/data/games";
import { useT } from "~/i18n";
import { IconArrow } from "./Icons";
import styles from "./GameCard.module.css";

export function GameCard({ game, index }: { game: Game; index: number }) {
  const t = useT();
  const card = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!v.src) v.src = `/videos/${game.videos[0]}`;
    v.play().catch(() => {});
  };
  const stop = () => {
    video.current?.pause();
    const el = card.current;
    el?.style.setProperty("--rx", "0deg");
    el?.style.setProperty("--ry", "0deg");
  };
  const tilt = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 6}deg`);
    el.style.setProperty("--rx", `${-y * 6}deg`);
  };

  return (
    <Link
      ref={card}
      to={t.path(`/games/${game.slug}`)}
      className={styles.card}
      style={{ "--accent": game.accent } as React.CSSProperties}
      onPointerEnter={play}
      onPointerLeave={stop}
      onPointerMove={tilt}
      onFocus={play}
      onBlur={stop}
    >
      <div className={styles.media}>
        <img src={game.cover} alt="" loading={index < 2 ? "eager" : "lazy"} width={1920} height={1080} />
        <video ref={video} muted loop playsInline preload="none" aria-hidden="true" />
        <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <h3 className={styles.title}>{game.title}</h3>
          <span className={styles.go} aria-hidden="true">
            <IconArrow />
          </span>
        </div>
        <p className={styles.desc}>{t.dyn(`gameInfo.${game.slug}.desc`)}</p>
        <ul className={styles.tags} aria-label={t("game.platforms")}>
          {game.platforms.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
