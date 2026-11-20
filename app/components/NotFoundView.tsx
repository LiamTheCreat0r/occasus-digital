import { Link } from "react-router";
import { useT } from "~/i18n";
import mascot from "~/assets/img/logos/occasus-digital-no-background-no-text.webp";
import styles from "./NotFoundView.module.css";

export function NotFoundView() {
  const t = useT();
  return (
    <section className={styles.wrap}>
      <img src={mascot} alt="" className={styles.mascot} width={260} height={292} />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t("notFound.title")}</h1>
      <p className={styles.body}>{t("notFound.body")}</p>
      <Link to={t.path("/")} className="btn">
        {t("notFound.home")}
      </Link>
    </section>
  );
}
