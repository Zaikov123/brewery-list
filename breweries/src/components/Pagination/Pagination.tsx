import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <>
    <div className={styles.pagination}>      
      <button
        className={styles.button}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.button}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
    <div className={styles.paginationMobile}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={onPrevPage}
      >
        ←
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        →
      </button>
    </div>
    </>
  );
}
