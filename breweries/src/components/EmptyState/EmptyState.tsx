import styles from "./EmptyState.module.css";

export function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <p>No breweries found</p>
    </div>
  );
}
