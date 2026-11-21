import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useT } from "~/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import mascot from "~/assets/img/logos/occasus-digital-no-background-no-text.webp";
import styles from "./Nav.module.css";

export function Nav() {
  const t = useT();
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: t.path("/") + "#games", label: t("nav.ourGames"), end: true },
    { to: t.path("/about"), label: t("nav.theStudio"), end: false },
    { to: t.path("/blog"), label: t("nav.blog"), end: false },
  ];

  return (
    <header className={styles.nav} data-visible={scrolled || open} data-open={open}>
      <div className={styles.bar} aria-hidden="true" />
      <Link to={t.path("/")} className={styles.corner} aria-label="Occasus Digital — home">
        <img src={mascot} alt="" width={120} height={136} className={styles.mascot} />
      </Link>

      <div className={styles.inner}>
        <nav aria-label="Main" className={styles.desktop}>
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive && !l.to.includes("#") ? styles.active : undefined)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <LanguageSwitcher />
          <button
            className={styles.burger}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" className={styles.mobile} hidden={!open}>
        <ul>
          <li>
            <Link to={t.path("/")}>{t("nav.home")}</Link>
          </li>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
