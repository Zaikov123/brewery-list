"use client";
import { Brewery } from "@/types/Brewery";
import { BreweryCard } from "../BreweryCard";
import { useRouter } from "next/navigation";
import styles from "./BreweryGrid.module.css";

interface BreweryGridProps {
  breweries: Brewery[];
  selectedBreweries: Set<string>;
  onSelectBrewery: (breweryId: string) => void;
}

export function BreweryGrid({
  breweries,
  selectedBreweries,
  onSelectBrewery,
}: BreweryGridProps) {
  const router = useRouter();

  return (
    <div className={styles.grid}>
      {breweries.map((brewery) => (
        <BreweryCard
          key={brewery.id}
          brewery={brewery}
          isSelected={selectedBreweries.has(brewery.id)}
          onContextMenu={onSelectBrewery}
          onClick={() => router.push(`/brewery/${brewery.id}`)}
        />
      ))}
    </div>
  );
}
