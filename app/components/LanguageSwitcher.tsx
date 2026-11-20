import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { locales, localeNames, localizedPath, stripLocale, STORAGE_KEY, useT } from "~/i18n";
import { IconGlobe } from "./Icons";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher({ placement = "down" }: { placement?: "down" | "up" }) {
  const t = useT();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const base = stripLocale(pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={ref} data-placement={placement}>
      <button
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("lang.changeLanguage")}
        onClick={() => setOpen((o) => !o)}
      >
        <IconGlobe size={16} />
        <span>{t.locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul className={styles.menu} role="list">
          {locales.map((l) => (
            <li key={l}>
              <Link
                to={localizedPath(l, base) + hash}
                hrefLang={l}
                lang={l}
                aria-current={l === t.locale ? "true" : undefined}
                onClick={() => {
                  try {
                    localStorage.setItem(STORAGE_KEY, l);
                  } catch {}
                }}
              >
                <span className={styles.code}>{l.toUpperCase()}</span>
                {localeNames[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
