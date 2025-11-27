'use client';
import { useState, useEffect } from "react";
import { useSelection } from "@/lib/hooks/useSelection";
import { usePagination } from "@/lib/hooks/usePagination";
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

const ITEMS_PER_PAGE = 5;
const RENDERED_PAGES = 3;

export function BreweriesContent({ breweries, isLoading }: BreweriesContentProps) {
  const { selected, toggle, clear } = useSelection();
  const { visibleItems, currentPage, setCurrentPage, loadNextPage } = usePagination(breweries, ITEMS_PER_PAGE, RENDERED_PAGES);
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
            <button className={styles.deleteButton} onClick={handleDeleteSelected}>
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

      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalItems={breweries.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
