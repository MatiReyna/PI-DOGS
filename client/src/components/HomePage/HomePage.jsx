import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, pageChange, filterByTemperament, orderByName, filterByWeight, getTemperaments, originFrom } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';

const HomePage = () => {

    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.currentPage);
    const dogsPerPage = useSelector((state) => state.dogsPerPage);
    const temperaments = useSelector((state) => state.temperaments);
    const filteredDogs = useSelector((state) => state.filteredDogs);
    const sortCriteria = useSelector((state) => state.sortCriteria);
    const sortOrder = useSelector((state) => state.sortOrder);

    const [selectedTemperament, setSelectedTemperament] = useState('');

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    }, [dispatch]);

    const handlePageChange = (pageNumber) => {
        dispatch(pageChange(pageNumber))
    };

    const handleTemperamentFilter = () => {
        dispatch(pageChange(1))
        dispatch(filterByTemperament(selectedTemperament))
    };

    const handleSortChange = (value) => {
        dispatch(orderByName(value, sortOrder))
    };

    const handleSortOrderChange = () => {
        dispatch(filterByWeight(sortCriteria, sortOrder === 'asc'? 'desc' : 'asc'))
    };

    const handleOrigin = (event) => {
        dispatch(originFrom(event.target.value))
    };

    const indexOfLastPage = currentPage * dogsPerPage;
    const indexOfFirstPage = indexOfLastPage - dogsPerPage;
    const currentDogs = filteredDogs.slice(indexOfFirstPage, indexOfLastPage);
    const totalDogs = filteredDogs.length;
    const totalPages = Math.ceil(totalDogs / dogsPerPage);

    return (
        <div>
            <NavBar />
            {/* <Link to='/'>
                <button>Back App Dog</button>
            </Link>

            <Link to='/form'>
                <button>Create Dog</button>
            </Link> */}

            <div>
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
                <div>
                    <label>Sort by:</label>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value='name'>Name</option>
                        <option value='weight'>Weight</option>
                    </select>
                    {/* <button onClick={handleSortOrderChange}>Toggle Sort Order</button> */}
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

            {/* <NavBar /> */}

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