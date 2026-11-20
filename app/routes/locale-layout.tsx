import { Outlet, useParams } from "react-router";
import { resolveLocale } from "~/i18n";
import { NotFoundView } from "~/components/NotFoundView";

/** Validates the optional `:lang` prefix; "/xx/…" or "/en/…" render the 404. */
export default function LocaleLayout() {
  const { lang } = useParams();
  if (resolveLocale(lang) === null) return <NotFoundView />;
  return <Outlet />;
}
