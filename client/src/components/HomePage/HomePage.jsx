import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getById, getByName, createDog, getTemperaments, filterByTemperament, orderByName } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';

const HomePage = () => {

    const dispatch = useDispatch();

    // VALORES DEL ESTADO LOCAL DE REDUX QUE NECESITO

    const dogs = useSelector((state) => state.dogs);
    const temperamentsState = useSelector((state) => state.temperaments);
    const [orden, serOrden] = useState('');

    // PAGINADO

    const [currentPage, setCurrentPage] = useState(1);  // MI PAGINA ACTUAL QUE COMIENZA EN 1
    const [dogsPerPage, setDogsPerPage] = useState(8);  // LOS PERROS POR PAGINA QUE SON 8

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;

    // CONSTANTE QUE GUARDA LOS PERROS QUE VOY A TENER POR PAGINA

    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    //  ACCIONES A DESPACHAR LUEGO DE MONTAR EL COMPONENTE
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    }, [dispatch]);

    const handleFilterByTemperament = (event) => {
        event.preventDefault();
        dispatch(filterByTemperament(event.target.value))
    };


    return (
        <div>
            <Link to='/'>
                <p>WE ❤️ DOGS</p>
            </Link>
            <Link to='/'>
            </Link>
            <br></br>
            <br></br>
            <SearchBar />
            <div>
                <Link to='/from'>
                    CREATE
                </Link>
            </div>
            <div>
                <Paginado dogsPerPage={dogsPerPage} dogs={dogs.length} paginado={paginado} />
            </div>

            {currentDogs?.map((dog) => {
                return (
                    <Card 
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        waight={dog.waight}
                    />
                )
            })}
        </div>
    )
};

export default HomePage;