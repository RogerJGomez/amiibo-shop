import "./index.scss";

import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  totalPages: number;
  pageSize?: number;
  initialPage: number;
  onChange?: (pageNumber: number, pageSize: number) => void;
}

interface PageData {
  selected: number;
}

const Pagination: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  totalPages,
  pageSize = 20,
  initialPage,
  onChange,
}: React.PropsWithChildren<Props>) => {
  const onPageChange = ({ selected }: PageData) => {
    const selectedPage = selected + 1;
    if (onChange) onChange(selectedPage, pageSize);
  };

  return (
    <>
      {children}
      {totalPages > 1 && (
        <ReactPaginate
          initialPage={initialPage - 1}
          disableInitialCallback
          breakLabel={"..."}
          pageCount={totalPages}
          pageLinkClassName={"page-link"}
          pageClassName={"page"}
          nextClassName={"nav"}
          previousClassName={"nav"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName={"container-pagination"}
          activeClassName={"active-tab"}
          disabledClassName={"disabled-link"}
        />
      )}
    </>
  );
};

export default Pagination;
