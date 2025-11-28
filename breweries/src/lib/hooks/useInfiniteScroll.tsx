/**
 * 
 * sentinelRef — an invisible "trigger" element placed at the bottom of the list.
 * When it enters the viewport, the IntersectionObserver fires and the hook
 * automatically loads the next page (lazy loading).
 *
 * Usage:
 * 1) Place <div ref={sentinelRef}></div> after your collection of items.
 * 2) When the user scrolls down and this element becomes visible, the hook
 *    calls onLoadNextPage() to append more data.
 * 3) sentinelRef must stay at the very end of the rendered content.
 *
 * scrollTargetRef — the DOM element the screen will smoothly scroll to
 * whenever a new lazy-loaded page is appended.
 *
 * Usage:
 * 1) Place <div ref={scrollTargetRef}></div> above your collection.
 * 2) The hook will call scrollIntoView() after loading the next page.
 */

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(onLoadNextPage: () => void, currentPage?: number, totalPages?: number) {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);

  const loadNextPage = () => {
    if (!isLoadingPage) {
      setIsLoadingPage(true);
      onLoadNextPage();
      if (scrollTargetRef.current) {
        scrollTargetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 800);
    }
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isPages = currentPage !== undefined && totalPages !== undefined;
        if (entry.isIntersecting ) {
          if (isPages) {
            if (currentPage < totalPages!) {
            loadNextPage();
            }
          }else {
            loadNextPage();
          }
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
    sentinelRef,
    scrollTargetRef,
  };
}
