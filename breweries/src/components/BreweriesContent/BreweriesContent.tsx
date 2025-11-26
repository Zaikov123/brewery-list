import { Brewery } from "@/types/Brewery";
import { Loading } from "../Loading";
import { EmptyState } from "../EmptyState";
import { BreweryGrid } from "../BreweryGrid";
import styles from "./BreweriesContent.module.css";

interface BreweriesContentProps {
  breweries: Brewery[];
  isLoading: boolean;
}

export function BreweriesContent({
  breweries,
  isLoading,
}: BreweriesContentProps) {
  if (isLoading) {
    return <Loading />;
  }

  if (breweries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.content}>
      <BreweryGrid breweries={breweries} />
    </div>
  );
}
