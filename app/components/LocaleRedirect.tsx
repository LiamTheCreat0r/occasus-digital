import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { defaultLocale, isLocale, localizedPath, STORAGE_KEY } from "~/i18n";

/**
 * On a fresh visit to the English home page, send people back to the
 * language they picked last time (stored by the language switcher).
 */
export function LocaleRedirect() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") return;
    try {
      if (sessionStorage.getItem("od-redirected")) return;
      sessionStorage.setItem("od-redirected", "1");
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved) && saved !== defaultLocale) {
        navigate(localizedPath(saved, "/"), { replace: true });
      }
    } catch {}
    // Only on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
