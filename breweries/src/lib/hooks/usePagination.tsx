import { useState, useEffect, useMemo } from "react";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  initialRenderedPages: number = 1
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [renderedPages, setRenderedPages] = useState(initialRenderedPages);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > renderedPages) {setRenderedPages(currentPage);}
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [items.length, totalPages]);

  const renderedItems = useMemo(() => {
    const endIndex = renderedPages * itemsPerPage;
    return items.slice(0, endIndex);
  }, [items, itemsPerPage, renderedPages]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return renderedItems.slice(startIndex, endIndex);
  }, [renderedItems, currentPage, itemsPerPage]);

  const loadNextPage = () => {
    console.debug("Current Page:", currentPage, "Total Pages:", totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return { visibleItems, currentPage, setCurrentPage, loadNextPage };
}
