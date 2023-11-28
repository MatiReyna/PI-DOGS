import React from 'react';

const Paginado = ({ dogsPerPage, dogs, paginado }) => {

    const pageNumber = [];

    for (let i = 0; i <= Math.floor(dogs/dogsPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <nav>
            <div>
                {
                    pageNumber?.map(number => (
                        <div key={number}>
                            <button type='button' onClick={() => paginado(number)}>{number}</button>
                        </div>
                    ))
                }
            </div>
        </nav>  
    )
};

export default Paginado;