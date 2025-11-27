import { useState, useEffect, useMemo } from "react";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  renderedChunkSize: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [renderedPages, setRenderedPages] = useState(renderedChunkSize);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const pagesPerChunk = Math.ceil(renderedChunkSize / itemsPerPage);
  const chunkStartPage = Math.floor((currentPage - 1) / pagesPerChunk) * pagesPerChunk;
  const chunkStartIndex = chunkStartPage * itemsPerPage;

  useEffect(() => {
    if (currentPage > renderedPages) setRenderedPages(currentPage);
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [items.length, totalPages]);

  const renderedItems = useMemo(() => {
    const startIndex = chunkStartPage * itemsPerPage;
    const endIndex = startIndex + renderedChunkSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage - chunkStartIndex;
    const endIndex = startIndex + itemsPerPage;
    return renderedItems.slice(startIndex, endIndex);
  }, [items, renderedItems, currentPage, itemsPerPage]);

  const loadNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const loadPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return { 
    visibleItems, 
    renderedItems,
    currentPage, 
    totalPages,
    setCurrentPage, 
    loadNextPage, 
    loadPrevPage
  };
}
