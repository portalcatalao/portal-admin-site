'use client'

import React, { useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { components } from '../../styles/tailwind';

export const Pagination = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const getPageNumbers = () => {
    const visiblePages = [];
    const delta = 1;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    for (let page = left; page <= right; page++) {
      visiblePages.push(page);
    }

    return visiblePages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-2 my-4">
      {!isFirstPage && (
        <button
          onClick={() => router.push(pathname + '?' + createQueryString('page', `${currentPage - 1}`))}
          className={components.button.icon_small}
        >
          <FiChevronLeft />
        </button>
      )}

      <button
        onClick={() => router.push(pathname + '?' + createQueryString('page', '1'))}
        className={currentPage === 1 ? components.button.icon_small_active : components.button.icon_small}
      >
        1
      </button>

      {pageNumbers.map((page, index) => {
        const isCurrentPage = currentPage === page;
        const showEllipsisBefore = index === 0 && page !== 1;
        const showEllipsisAfter = index === pageNumbers.length - 1 && page !== totalPages;
        if (page !== 1 && page !== totalPages) {
          return (
            <React.Fragment key={page}>
              {showEllipsisBefore && (
                <span className={components.button.icon_small}>...</span>
              )}

              <button
                onClick={() => router.push(pathname + '?' + createQueryString('page', `${page}`))}
                className={isCurrentPage ? components.button.icon_small_active : components.button.icon_small}
              >
                {page}
              </button>

              {showEllipsisAfter && (
                <span className={components.button.icon_small}>...</span>
              )}
            </React.Fragment>
          );
        }
      })}

      <button
        onClick={() => router.push(pathname + '?' + createQueryString('page', totalPages))}
        className={currentPage === totalPages ? components.button.icon_small_active : components.button.icon_small}
      >
        {totalPages}
      </button>

      {!isLastPage && (
        <button
          onClick={() => router.push(pathname + '?' + createQueryString('page', `${currentPage + 1}`))}
          className={components.button.icon_small}
        >
          <FiChevronRight />
        </button>
      )}
    </nav>
  );
};