import { Link } from "react-router";
import { useT } from "~/i18n";
import { games } from "~/data/games";
import { KOFI_ID, socials } from "~/lib/site";
import { socialIcons, IconArrowUpRight } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import title from "~/assets/img/logos/occasus-digital-only-title.webp";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useT();
  return (
    <footer className={styles.footer}>
      <div className={styles.horizon} aria-hidden="true" />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.cta}>
            <p className={styles.ctaText}>{t("home.tagline")}</p>
            <a className="btn btn--hot" href={`https://ko-fi.com/${KOFI_ID}`} target="_blank" rel="noopener noreferrer" aria-label={t("home.supportUsAria")}>
              {t("home.supportUs")} <IconArrowUpRight />
            </a>
          </div>

          <nav className={styles.cols} aria-label="Footer">
            <div>
              <h2 className={styles.colTitle}>{t("nav.ourGames")}</h2>
              <ul>
                {games.map((g) => (
                  <li key={g.slug}>
                    <Link to={t.path(`/games/${g.slug}`)}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.colTitle}>Occasus</h2>
              <ul>
                <li>
                  <Link to={t.path("/about")}>{t("nav.theStudio")}</Link>
                </li>
                <li>
                  <Link to={t.path("/blog")}>{t("nav.blog")}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.colTitle}>Social</h2>
              <ul>
                {socials.map((s) => {
                  const Icon = socialIcons[s.id];
                  return (
                    <li key={s.id}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                        <Icon size={16} /> {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <img src={title} alt="Occasus Digital" className={styles.giant} width={1200} height={520} loading="lazy" />

        <div className={styles.bottom}>
          <p>{t("footer.copyright")}</p>
          <LanguageSwitcher placement="up" />
        </div>
      </div>
    </footer>
  );
}
