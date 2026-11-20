import { Link } from "react-router";
import type { Route } from "./+types/about";
import { games } from "~/data/games";
import { team } from "~/data/team";
import { seo } from "~/lib/seo";
import { localeFromPath, translate, useT } from "~/i18n";
import { PageHeader } from "~/components/PageHeader";
import { Reveal } from "~/components/Reveal";
import { IconArrow } from "~/components/Icons";
import mascot from "~/assets/img/logos/occasus-digital-no-background-no-text.webp";
import styles from "./about.module.css";

export function meta({ location }: Route.MetaArgs) {
  const locale = localeFromPath(location.pathname);
  return seo({
    locale,
    path: "/about",
    title: translate(locale, "about.title"),
    description: translate(locale, "about.description"),
  });
}

export default function About() {
  const t = useT();
  return (
    <>
      <PageHeader eyebrow={t("nav.theStudio")} title={t("about.title")} lead={t("about.description")} />

      <section className={`container ${styles.statement}`}>
        <Reveal className={styles.quote}>
          <p>“{t("home.tagline")}”</p>
        </Reveal>
        <img src={mascot} alt="" className={styles.mascot} width={420} height={471} loading="lazy" />
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">{t("home.team")}</span>
            <h2 className="section-title">{t("about.teamTitle")}</h2>
          </div>
        </div>
        <ul className={styles.team}>
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.1} className={styles.member}>
              <img src={m.portrait} alt={m.name} width={600} height={600} loading="lazy" />
              <p>{m.name}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">{String(games.length).padStart(2, "0")} {t("home.titles")}</span>
            <h2 className="section-title">{t("home.ourGames")}</h2>
          </div>
        </div>
        <ul className={styles.games}>
          {games.map((g) => (
            <li key={g.slug}>
              <Link to={t.path(`/games/${g.slug}`)} className={styles.gameRow} style={{ "--accent": g.accent } as React.CSSProperties}>
                <img src={g.cartridge} alt="" width={120} height={132} loading="lazy" />
                <span className={styles.gameTitle}>{g.title}</span>
                <span className={styles.gameDesc}>{t.dyn(`gameInfo.${g.slug}.desc`)}</span>
                <IconArrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
