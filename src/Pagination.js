import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const styles = {
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    pageButton: {
      padding: "10px 20px",
      backgroundColor: "#ff6347",
      border: "none",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "5px",
      margin: "0 5px",
      transition: "background-color 0.3s",
    },
    pageButtonDisabled: {
      backgroundColor: "#888",
      cursor: "not-allowed",
    },
    pageButtonHover: {
      backgroundColor: "#ff4500",
    },
    pageNumber: {
      fontSize: "1rem",
      color: "#f9d3b4",
      margin: "0 5px",
    },
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div style={styles.paginationContainer}>
      <button
        style={{
          ...styles.pageButton,
          ...(currentPage === 1 ? styles.pageButtonDisabled : {}),
        }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.pageButtonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.pageButton.backgroundColor}
      >
        Prev
      </button>

      <span style={styles.pageNumber}>
        {currentPage} / {totalPages}
      </span>

      <button
        style={{
          ...styles.pageButton,
          ...(currentPage === totalPages ? styles.pageButtonDisabled : {}),
        }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.pageButtonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.pageButton.backgroundColor}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
