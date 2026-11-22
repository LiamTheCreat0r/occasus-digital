import styles from "./PageHeader.module.css";

export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <header className={`container ${styles.head}`}>
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
