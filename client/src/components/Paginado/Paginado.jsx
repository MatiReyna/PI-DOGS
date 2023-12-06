import React from 'react';

import './Paginado.style.css';

const Paginado = ({ currentPage, totalPages, handlePageChange }) => {  // SE LE PASAN TRES PROP COMO ARGUMENTO
  return (
    <div className='paginado'>
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

// CREA UN ARRAY DE LONGITUD Y LO LLENA CON VALOR NULO
// ITERA SOBRE ESE ARRAY PROPORCIONANDOLE EL INDICE ACTUAL COMO INDICE
// EN EL MAPEO HAY UN BOTON POR CADA PAGINA REPRESENTADO POR EL INDICE ACTUAL