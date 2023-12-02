import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDogs, pageChange, filterByTemperament, orderByName, filterByWeight } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';

const HomePage = () => {

    const dispatch = useDispatch();
    const filteredDogs = useSelector((state) => state.filteredDogs);
    const currentPage = useSelector((state) => state.currentPage);
    const dogsPerPage = useSelector((state) => state.dogsPerPage);
    const temperaments = useSelector((state) => state.temperaments);

    const [ selectedTemperament, setSelectedTemperament ] = useState('');
    const [ sortOrden, setSortOrden ] = useState('asc');
    const [ sortCriterial, setSortCriterial ] = useState('name'); 

    const indexOfLastPage = currentPage * dogsPerPage;
    const indexOfFirstPage = indexOfLastPage - dogsPerPage;
    const currentDogs = filteredDogs.slice(indexOfFirstPage, indexOfLastPage);

    const totalDogs = filteredDogs.length;
    const totalPages = Math.ceil(totalDogs / dogsPerPage);

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch]);

    const handlePageChange = (pageNumber) => {
        dispatch(pageChange(pageNumber))
    };

    const handleTemperamentFilter = (temperament) => {
        dispatch(filterByTemperament(temperament))
    };

    const handleSortChange = (criteria) => {
        setSortCriterial(criteria);
        dispatch(orderByName(sortCriterial, sortOrden))
    };

    const handleSortOrdenChange = () => {
        const newOrder = sortOrden === 'asc' ? 'desc' : 'asc';
        setSortOrden(newOrder);
        dispatch(filterByWeight(sortCriterial, newOrder))
    };

    return (
        <div>
            <Link to='/'>
                <button>APP DOG</button>
            </Link>

            <div className='filter-controls'>
                <div>
                    <label>Filter by Temperament:</label>
                    <select onChange={(e) => setSelectedTemperament(e.target.value)}>
                        <option value=''>All</option>
                        {
                            temperaments.map((temperamet) => (
                                <option key={temperamet} value={temperamet}>
                                    {temperamet}
                                </option>
                            ))
                        }
                    </select>
                    <button onClick={() => handleTemperamentFilter(selectedTemperament)}>Apply</button>
                </div>
                <div>
                    <label>Sort by:</label>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value='name'>Name</option>
                        <option value='weight'>Weight</option>
                    </select>
                    <button onClick={handleSortOrdenChange}>Change Order</button>
                </div>
            </div>
            
            <SearchBar />
            
            <div>
                {
                    currentDogs.map((dog) => (
                        <Card key={dog.id} dog={dog} />
                    ))
                }
            </div>

            <div>
                {/* {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button key={page} onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    ))
                } */}
                <Paginado currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
};

export default HomePage;