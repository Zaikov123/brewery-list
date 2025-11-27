"use client";
import { useSelection } from "@/lib/hooks/useSelection";
import { Brewery } from "@/types/Brewery";
import { Loading } from "../Loading";
import { EmptyState } from "../EmptyState";
import { BreweryGrid } from "../BreweryGrid";
import styles from "./BreweriesContent.module.css";
import { useBreweriesStore } from "@/store/useBreweriesStore";
import { useEffect, useRef } from "react";
import { useInfiniteScrollPagination } from "@/lib/hooks/useInfiniteScrollPagination";


interface BreweriesContentProps {
  breweries: Brewery[];
  isLoading: boolean;
}

const ITEMS_PER_PAGE = 5;
const CHUNK_SIZE = 15;

export function BreweriesContent({
  breweries,
  isLoading,
}: BreweriesContentProps) {
  const { selected, toggle, clear } = useSelection();
  const { visibleItems, currentPage, totalPages, loadNextPage, sentinelRef } = useInfiniteScrollPagination(breweries, ITEMS_PER_PAGE, CHUNK_SIZE);
  
  const removeBreweries = useBreweriesStore((state) => state.removeBreweries);

  const handleDeleteSelected = () => {
    const breweryIdsToDelete = Array.from(selected);
    removeBreweries(breweryIdsToDelete);
    clear();
    console.log("Deleted breweries:", breweryIdsToDelete);
  };

  if (isLoading) return <Loading />;
  if (breweries.length === 0) return <EmptyState />;

  return (
    <div className={styles.content}>
      {selected.size > 0 && (
        <div className={styles.selectedInfo}>
          <span className={styles.badge}>{selected.size}</span>
          <span className={styles.text}>
            {selected.size === 1 ? "brewery" : "breweries"} selected
          </span>
          <div className={styles.buttonGroup}>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteSelected}
            >
              Delete
            </button>
            <button className={styles.clearButton} onClick={() => clear()}>
              Clear
            </button>
          </div>
        </div>
      )}

      <div className={styles.gridWrapper}>
        <BreweryGrid
          breweries={visibleItems}
          selectedBreweries={selected}
          onSelectBrewery={toggle}
        />
      </div>
      <div ref={sentinelRef} style={{ height: "20px" }} />
    </div>
  );
}
