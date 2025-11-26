import { Brewery } from "@/types/Brewery";
import { BreweryCard } from "../BreweryCard";
import styles from "./BreweryGrid.module.css";

interface BreweryGridProps {
  breweries: Brewery[];
}

export function BreweryGrid({ breweries }: BreweryGridProps) {
  return (
    <div className={styles.grid}>
      {breweries.map((brewery) => (
        <BreweryCard key={brewery.id} brewery={brewery} />
      ))}
    </div>
  );
}
