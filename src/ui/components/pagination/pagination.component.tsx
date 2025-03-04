import { FC } from 'react';
import { Button } from '@/ui/components';
import { PaginationResult, PaginationActions } from '@/models/pagination.model';
import styles from './pagination.module.scss';
import { useTranslate } from '@/hooks/use-translate.hook';

interface PaginationProps {
  pagination: PaginationResult | null;
  onPageChange: (action: PaginationActions, page?: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ pagination, onPageChange, className = '' }) => {
  const { t } = useTranslate();

  if (!pagination) return null;

  const { first, prev, next, last, pages, currentPage } = pagination;

  const getPageNumbers = (): number[] => {
    if (!pages) return [currentPage];

    const pageNumbers: number[] = [];
    const maxPagesToShow = 5;

    if (pages <= maxPagesToShow) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(pages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push(-1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < pages) {
        if (endPage < pages - 1) pageNumbers.push(-1);
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`${styles.pagination} ${className}`}>
      <div className={styles.paginationControls}>
        <Button
          intent="secondary"
          disabled={first === null || first === currentPage}
          onClick={() => onPageChange(PaginationActions.FIRST)}
          className={styles.paginationButton}
        >
          {t('pagination.first')}
        </Button>

        <Button
          intent="secondary"
          disabled={prev === null}
          onClick={() => onPageChange(PaginationActions.PREV)}
          className={styles.paginationButton}
        >
          {t('pagination.prev')}
        </Button>

        <div className={styles.paginationPages}>
          {pageNumbers.map((page, index) => (
            page === -1 ? (
              <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>...</span>
            ) : (
              <button
                key={page}
                className={`${styles.paginationPage} ${currentPage === page ? styles.paginationPageActive : ''}`}
                onClick={() => onPageChange(PaginationActions.PAGE, page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <Button
          intent="secondary"
          disabled={next === null}
          onClick={() => onPageChange(PaginationActions.NEXT)}
          className={styles.paginationButton}
        >
          {t('pagination.next')}
        </Button>

        <Button
          intent="secondary"
          disabled={last === null || last === currentPage}
          onClick={() => onPageChange(PaginationActions.LAST)}
          className={styles.paginationButton}
        >
          {t('pagination.last')}
        </Button>
      </div>

      {pages && (
        <div className={styles.paginationInfo}>
          {t('pagination.pageInfo', { current: currentPage.toString(), total: pages.toString() })}
        </div>
      )}
    </div>
  );
};

export default Pagination;
