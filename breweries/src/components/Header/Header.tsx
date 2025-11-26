import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Brewery List</h1>
        <p className={styles.subtitle}>
          Discover craft breweries around the world
        </p>
      </div>
    </header>
  );
}
