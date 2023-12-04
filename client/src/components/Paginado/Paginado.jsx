import React from 'react';

// import './Paginado.style.css';

const Paginado = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      {
        Array(totalPages).fill(null).map((_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))
      }
    </div>
  )
};

export default Paginado;