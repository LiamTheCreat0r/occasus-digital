import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { games } from "~/data/games";
import { getPosts } from "~/lib/content.server";
import { seo } from "~/lib/seo";
import { localeFromPath, translate, useT } from "~/i18n";
import { VideoReel, type Clip } from "~/components/VideoReel";
import { GameCard } from "~/components/GameCard";
import { PostList } from "~/components/PostList";
import { Reveal } from "~/components/Reveal";
import { IconArrow, IconChevron } from "~/components/Icons";
import title from "~/assets/img/logos/occasus-digital-only-title.webp";
import mascot from "~/assets/img/logos/occasus-digital-no-background-no-text.webp";
import styles from "./home.module.css";

export async function loader() {
  return { posts: getPosts().slice(0, 3) };
}

export function meta({ location }: Route.MetaArgs) {
  const locale = localeFromPath(location.pathname);
  return seo({
    locale,
    path: "/",
    description: translate(locale, "home.description"),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Occasus Digital",
      url: "https://occasus-digital.com",
    },
  });
}

// One clip per game for the hero reel (first video of each).
const clips: (Clip & { slug: string })[] = games.map((g) => ({
  slug: g.slug,
  src: `/videos/${g.videos[0]}`,
  poster: g.cover,
  label: g.title,
}));

export default function Home({ loaderData }: Route.ComponentProps) {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const onChange = useCallback((i: number) => setCurrent(i), []);
  const shelf = useRef<HTMLUListElement>(null);

  const scrollShelf = (dir: 1 | -1) => {
    const el = shelf.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };

  const nowPlaying = clips[current];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className={styles.hero}>
        <VideoReel clips={clips} onChange={onChange} />
        <div className={styles.heroShade} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <img src={mascot} alt="" className={styles.heroMascot} width={420} height={471} />
          <h1 className={styles.heroTitle}>
            <img src={title} alt={t("home.title")} width={1200} height={520} />
          </h1>
          <p className={styles.tagline}>{t("home.tagline")}</p>
          <div className={styles.heroCtas}>
            <a href="#games" className="btn">
              {t("home.ourGames")} <IconArrow />
            </a>
            <Link to={t.path("/about")} className="btn btn--ghost">
              {t("nav.theStudio")}
            </Link>
          </div>
        </div>

        <div className={`container ${styles.heroFoot}`}>
          <Link to={t.path(`/games/${nowPlaying.slug}`)} className={styles.nowPlaying}>
            <span className={styles.recDot} aria-hidden="true" />
            <span className={styles.nowLabel}>{t("home.nowPlaying")}</span>
            <span className={styles.nowTitle}>{nowPlaying.label}</span>
          </Link>
        </div>
        <div className={styles.horizon} aria-hidden="true" />
      </section>

      {/* ---------------- Games shelf ---------------- */}
      <section id="games" className={`section ${styles.games}`}>
        <div className="container section-head">
          <div>
            <span className="eyebrow">{String(games.length).padStart(2, "0")} {t("home.titles")}</span>
            <h2 className="section-title">{t("home.ourGames")}</h2>
          </div>
          <div className={styles.shelfNav}>
            <button onClick={() => scrollShelf(-1)} aria-label={t("lightbox.prev")}>
              <IconChevron dir="left" />
            </button>
            <button onClick={() => scrollShelf(1)} aria-label={t("lightbox.next")}>
              <IconChevron />
            </button>
          </div>
        </div>
        <ul className={styles.shelf} ref={shelf}>
          {games.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={i * 0.08} className={styles.shelfItem}>
              <GameCard game={g} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------- Blog ---------------- */}
      <section className={`section ${styles.blog}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.blog")}</span>
              <h2 className="section-title">{t("home.latest")}</h2>
            </div>
            <Link to={t.path("/blog")} className="btn btn--ghost">
              {t("home.allPosts")} <IconArrow />
            </Link>
          </div>
          <PostList posts={loaderData.posts} />
        </div>
      </section>

    </>
  );
}
