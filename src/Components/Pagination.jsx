import React from "react";
import "./styles/pagination.css";

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Genera un array con el número total de páginas
  const pages = [...Array(totalPage).keys()].map((i) => i + 1);

  return (
    <div className="pagination">
      <div>
        <button onClick={handlePrev}>Prev</button>
        <span>{`${currentPage}/${totalPage}`}</span>
        <button onClick={handleNext}>Next</button>
      </div>
      <div>
        {pages.map((page) => (
          <span
            key={page}
            className={`page-dot ${page === currentPage ? "current-page" : ""}`}
          >
            •
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
