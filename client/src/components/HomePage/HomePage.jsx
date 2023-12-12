import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, pageChange, filterByTemperament, orderByName, filterByWeight, getTemperaments, originFrom } from '../../redux/actions/actions';

import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';

import './HomePage.style.css';

const HomePage = () => {

    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.currentPage);
    const dogsPerPage = useSelector((state) => state.dogsPerPage);
    const temperaments = useSelector((state) => state.temperaments);
    const filteredDogs = useSelector((state) => state.filteredDogs);
    const sortOrder = useSelector((state) => state.sortOrder);

    const [selectedTemperament, setSelectedTemperament] = useState('');  // ESTADO LOCAL DE LOS TEMPERAMENTOS

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    }, [dispatch]);

    const handlePageChange = (pageNumber) => {  // PARA CAMBIAR LA PAGINA DE PERROS
        dispatch(pageChange(pageNumber))
    };

    const handleTemperamentFilter = () => {
        dispatch(pageChange(1))  // QUE ME VUELVA A LA PAGINA 1 ASI NO SE PONE EN BLANCO
        dispatch(filterByTemperament(selectedTemperament))  // DESPACHA LA ACCION DE LOS TEMPERAMENTOS FILTRADOS
    };

    // const handleSortChange = (value) => {  // LA FORMA EN LA QUE SE ORDENA LOS PERROS POR NOMBRE O POR PESO
    //     if (value === 'weight') {
    //         dispatch(filterByWeight(value, sortOrder))
    //     } else {
    //         dispatch(orderByName(value, sortOrder))
    //     }
    // };

    const handleSortByName = (value) => {
        dispatch(pageChange(1))
        dispatch(orderByName(value, sortOrder))
    };

    const handleSortByWeight = (value) => {
        dispatch(pageChange(1))
        dispatch(filterByWeight(value, sortOrder))
    };

    const handleOrigin = (event) => {  // SEGUN DE DONDE SON
        dispatch(pageChange(1))
        dispatch(originFrom(event.target.value))
    };

    // CALCULA LOS INDECES DE LOS PERROS QUE SE MOSTRARAN EN LA PAGINA Y LA CANTIDAD TOTAL DE PAGINAS
    const indexOfLastPage = currentPage * dogsPerPage;
    const indexOfFirstPage = indexOfLastPage - dogsPerPage;
    const currentDogs = filteredDogs.slice(indexOfFirstPage, indexOfLastPage);
    const totalDogs = filteredDogs.length;
    const totalPages = Math.ceil(totalDogs / dogsPerPage);

    return (
        <div>
            <NavBar />
            <div className='container-home'>
                <div>
                    <label>Filter by Temperament:</label>
                    <select onChange={(e) => setSelectedTemperament(e.target.value)}>
                        <option value='All'>All</option>
                        {
                            temperaments.map((temperament) => (
                                <option key={temperament.id} value={temperament.name}>
                                    {temperament.name}
                                </option>
                            ))
                        }
                    </select>
                    <button onClick={handleTemperamentFilter}>Apply Temperament Filter</button>
                </div>
                {/* <div>
                    <label>Sort by:</label>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value='name'>Name</option>
                        <option value='weight'>Weight</option>
                    </select>
                </div> */}
                <div>
                    <label>Sort by Name</label>
                    <select onChange={(e) => handleSortByName(e.target.value)}>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>
                </div>
                <div>
                    <label>Sort by Weight</label>
                    <select onChange={(e) => handleSortByWeight(e.target.value)}>
                        <option value='asc'>Min-Max</option>
                        <option value='desc'>Max-Min</option>
                    </select>
                </div>
                <div>
                    <label>Origin:</label>
                    <select onChange={handleOrigin}>
                        <option value='All'>All</option>
                        <option value='API'>API</option>
                        <option value='DB'>DB</option>
                    </select>
                </div>
            </div>
            <div>
                {
                    currentDogs.map((dog) => (
                        <Card key={dog.id} dog={dog} />
                    ))
                }
            </div>
            <div>
                <Paginado currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
};

export default HomePage;