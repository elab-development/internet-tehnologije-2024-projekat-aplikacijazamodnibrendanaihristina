import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="pagination">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Prethodna
      </button>

      <span className="pagination-info">
        Stranica {currentPage} od {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Sledeća
      </button>
    </div>
  );
};

export default Pagination;
