'use client';
import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  function handlePageClick(event: { selected: number }) {
    onPageChange(event.selected + 1);
  }
  return (
    <ReactPaginate
      className={css.pagination}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
    />
  );
}
