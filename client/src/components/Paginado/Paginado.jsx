import React from 'react';

const Paginado = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div>
            {
                Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} disabled={currentPage === page}>
                        {page}
                    </button>
                )) 
            }
        </div>
    )
};

export default Paginado;