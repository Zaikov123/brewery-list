import { Brewery } from "@/types/Brewery";
import styles from "./BreweryCard.module.css";

interface BreweryCardProps {
  brewery: Brewery;
  isSelected: boolean;
  onContextMenu: (breweryId: string) => void;
  onClick: () => void;
}

export function BreweryCard({
  brewery,
  isSelected,
  onContextMenu,
  onClick,
}: BreweryCardProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu(brewery.id);
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onContextMenu={handleContextMenu}
      onClick={onClick}
    >
      {isSelected && <div className={styles.selectedBadge}>✓</div>}
      <h2 className={styles.cardTitle}>{brewery.name}</h2>
      <div className={styles.cardContent}>
        {brewery.brewery_type && (
          <p className={styles.type}>
            <span className={styles.label}>Type:</span> {brewery.brewery_type}
          </p>
        )}
        {brewery.city && (
          <p className={styles.location}>
            <span className={styles.label}>📍 Location:</span> {brewery.city}
            {brewery.state && `, ${brewery.state}`}
          </p>
        )}
        {brewery.website_url && (
          <a
            href={brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visit Website →
          </a>
        )}
      </div>
    </div>
  );
}
