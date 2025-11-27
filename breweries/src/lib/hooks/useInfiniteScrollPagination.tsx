import { useEffect, useMemo, useRef, useState } from "react";

export function useInfiniteScrollPagination<T>(
  items: T[],
  itemsPerPage: number,
  renderedChunkSize: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const pagesPerChunk = Math.ceil(renderedChunkSize / itemsPerPage);
  const chunkStartPage =
    Math.floor((currentPage - 1) / pagesPerChunk) * pagesPerChunk;
  const chunkStartIndex = chunkStartPage * itemsPerPage;

  const renderedItems = useMemo(() => {
    const startIndex = chunkStartIndex;
    const endIndex = startIndex + renderedChunkSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage, renderedChunkSize]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage - chunkStartIndex;
    const endIndex = startIndex + itemsPerPage;
    return renderedItems.slice(startIndex, endIndex);
  }, [renderedItems, currentPage, itemsPerPage, chunkStartIndex]);

  const loadNextPage = () => {
    if (currentPage < totalPages && !isLoadingPage) {
      setIsLoadingPage(true);
      setCurrentPage(currentPage + 1);
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 400);
    }
  };
  const loadPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loadNextPage]);

  return {
    visibleItems,
    renderedItems,
    currentPage,
    totalPages,
    setCurrentPage,
    loadNextPage,
    loadPrevPage,
    sentinelRef,
  };
}
