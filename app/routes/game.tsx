import { useCallback, useState } from "react";
import { data, Link } from "react-router";
import type { Route } from "./+types/game";
import { games, getGame } from "~/data/games";
import { localeFromPath, translateDynamic, useT } from "~/i18n";
import { plain, seo } from "~/lib/seo";
import { RichText } from "~/components/RichText";
import { Lightbox } from "~/components/Lightbox";
import { GameCard } from "~/components/GameCard";
import { Reveal } from "~/components/Reveal";
import { IconArrowUpRight } from "~/components/Icons";
import styles from "./game.module.css";

export async function loader({ params }: Route.LoaderArgs) {
  if (!getGame(params.slug)) throw data(null, { status: 404 });
  return { slug: params.slug };
}

export function meta({ loaderData, location }: Route.MetaArgs) {
  const game = getGame(loaderData?.slug);
  if (!game) return [{ title: "404 — Occasus Digital" }];
  const locale = localeFromPath(location.pathname);
  const description = plain(translateDynamic(locale, `game.${game.slug}.desc`)).slice(0, 300);
  return seo({
    locale,
    path: `/games/${game.slug}`,
    title: game.title,
    description,
    image: game.cover,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: game.title,
      description,
      genre: ["Indie"],
      gamePlatform: game.platforms,
      publisher: { "@type": "Organization", name: "Occasus Digital" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    },
  });
}

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const t = useT();
  const game = getGame(loaderData.slug)!;
  const [shot, setShot] = useState<number | null>(null);
  const closeShot = useCallback(() => setShot(null), []);

  const stores = [
    game.itchUrl && { name: "itch.io", href: game.itchUrl },
    game.newgroundsUrl && { name: "Newgrounds", href: game.newgroundsUrl },
  ].filter(Boolean) as { name: string; href: string }[];

  const others = games.filter((g) => g.slug !== game.slug);

  return (
    <article style={{ "--accent": game.accent } as React.CSSProperties}>
      {/* ---------- Cinematic header ---------- */}
      <header className={styles.header}>
        <img src={game.cover} alt="" className={styles.cover} width={1920} height={1080} />
        <div className={styles.shade} aria-hidden="true" />
        <div className={`container ${styles.headInner}`}>
          <Link to={t.path("/") + "#games"} className={styles.back}>
            ← {t("game.allGames")}
          </Link>
          <h1 className={styles.title}>{t.dyn(`game.${game.slug}.title`)}</h1>
          <p className={styles.tagline}>{t.dyn(`gameInfo.${game.slug}.desc`)}</p>
        </div>
      </header>

      {/* ---------- Description + sticky play card ---------- */}
      <div className={`container ${styles.body}`}>
        <Reveal>
          <RichText text={t.dyn(`game.${game.slug}.desc`)} className={`prose ${styles.desc}`} />
        </Reveal>
        <aside className={styles.side}>
          <div className={styles.card}>
            <img src={game.cartridge} alt={`${game.title} cartridge`} className={styles.cart} width={400} height={440} loading="lazy" />
            <dl className={styles.facts}>
              <dt>{t("game.platforms")}</dt>
              <dd>{game.platforms.join(" · ")}</dd>
            </dl>
            <p className={styles.playLabel}>{t("game.availableOn")}</p>
            <div className={styles.storeList}>
              {stores.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.store}>
                  {s.name}
                  <IconArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- Gameplay: videos + screenshots ---------- */}
      {(game.videos.length > 0 || game.screenshots.length > 0) && (
        <section className={`container ${styles.block}`}>
          <h2 className="section-title">{t("game.videos")}</h2>
          {game.videos.length > 0 && (
            <div className={styles.videos} data-aspect={game.videoAspect}>
              {game.videos.map((v) => (
                <Reveal key={v}>
                  <video
                    src={`/videos/${v}`}
                    poster={game.cover}
                    controls
                    muted
                    loop
                    playsInline
                    preload="none"
                    className={styles.video}
                    onPointerEnter={(e) => e.pointerType === "mouse" && e.currentTarget.play().catch(() => {})}
                    onPointerLeave={(e) => e.pointerType === "mouse" && e.currentTarget.pause()}
                  />
                </Reveal>
              ))}
            </div>
          )}
          {game.screenshots.length > 0 && (
            <>
              <ul className={styles.shots}>
                {game.screenshots.map((src, i) => (
                  <Reveal as="li" key={src} delay={(i % 3) * 0.06}>
                    <button className={styles.shot} onClick={() => setShot(i)}>
                      <img src={src} alt={`${game.title} ${t("game.screenshot")} ${i + 1}`} loading="lazy" />
                    </button>
                  </Reveal>
                ))}
              </ul>
              <Lightbox images={game.screenshots} index={shot} alt={`${game.title} ${t("game.screenshot")}`} onChange={setShot} onClose={closeShot} />
            </>
          )}
        </section>
      )}

      {/* ---------- More games ---------- */}
      <section className={`container ${styles.block}`}>
        <h2 className="section-title">{t("game.moreGames")}</h2>
        <ul className={styles.more}>
          {others.map((g) => (
            <li key={g.slug}>
              <GameCard game={g} index={games.indexOf(g)} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
