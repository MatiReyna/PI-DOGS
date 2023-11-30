import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getTemperaments, filterByTemperament, orderByName, filterByWeight } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import Paginado from '../Paginado/Paginado';


import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';

const HomePage = () => {
    return (
        <div>
            <p>ESTAS EN EL HOME</p>
            <SearchBar />
            <Cards />
        </div>
    )
}

export default HomePage;