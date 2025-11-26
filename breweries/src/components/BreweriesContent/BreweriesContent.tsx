import { useState } from "react";
import { Brewery } from "@/types/Brewery";
import { Loading } from "../Loading";
import { EmptyState } from "../EmptyState";
import { BreweryGrid } from "../BreweryGrid";
import { Pagination } from "../Pagination";
import styles from "./BreweriesContent.module.css";
import { useBreweriesStore } from "@/store/useBreweriesStore";

interface BreweriesContentProps {
  breweries: Brewery[];
  isLoading: boolean;
}

const ITEMS_PER_PAGE = 15;

export function BreweriesContent({
  breweries,
  isLoading,
}: BreweriesContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBreweries, setSelectedBreweries] = useState<Set<string>>(
    new Set()
  );

  const removeBreweries = useBreweriesStore((state) => state.removeBreweries);

  const handleSelectBrewery = (breweryId: string) => {
    setSelectedBreweries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(breweryId)) {
        newSet.delete(breweryId);
      } else {
        newSet.add(breweryId);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    const breweryIdsToDelete = Array.from(selectedBreweries);
    removeBreweries(breweryIdsToDelete);
    setSelectedBreweries(new Set());
    console.log("Deleted breweries:", breweryIdsToDelete);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (breweries.length === 0) {
    return <EmptyState />;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBreweries = breweries.slice(startIndex, endIndex);

  return (
    <div className={styles.content}>
      {selectedBreweries.size > 0 && (
        <div className={styles.selectedInfo}>
          <span className={styles.badge}>{selectedBreweries.size}</span>
          <span className={styles.text}>
            {selectedBreweries.size === 1 ? "brewery" : "breweries"} selected
          </span>
          <div className={styles.buttonGroup}>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteSelected}
              title="Delete selected breweries"
            >
              🗑️ Delete
            </button>
            <button
              className={styles.clearButton}
              onClick={() => setSelectedBreweries(new Set())}
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <BreweryGrid
        breweries={paginatedBreweries}
        selectedBreweries={selectedBreweries}
        onSelectBrewery={handleSelectBrewery}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={breweries.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
