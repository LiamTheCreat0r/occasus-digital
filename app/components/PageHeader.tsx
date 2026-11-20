import styles from "./PageHeader.module.css";

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className={`container ${styles.head}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
