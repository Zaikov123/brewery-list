import { useState } from "react";
import { Brewery } from "@/types/Brewery";
import { Loading } from "../Loading";
import { EmptyState } from "../EmptyState";
import { BreweryGrid } from "../BreweryGrid";
import { Pagination } from "../Pagination";
import styles from "./BreweriesContent.module.css";

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
      <BreweryGrid breweries={paginatedBreweries} />
      <Pagination
        currentPage={currentPage}
        totalItems={breweries.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
