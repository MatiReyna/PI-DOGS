import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName, pageChange } from '../../redux/actions/actions';

import './SearchBar.style.css';

const SearchBar = () => {

    const dispatch = useDispatch();  // PARA OBTENER EL OBJETO DISPATCH

    const [searchDog, setSearchDog] = useState('');

    const handleSearch = () => {
        dispatch(pageChange(1))
        dispatch(getByName(searchDog))  // DESPACHA UNA ACCION CON EL VALOR ACTUAL DEL ESTADO
        setSearchDog('');  // LIMPIA EL INPUT DESPUES DE LA BUSQUEDA
    };

    return (
        <div className='searchbar'>
            <input placeholder='Search by name' type='text' value={searchDog} onChange={(e) => setSearchDog(e.target.value)}></input>
            <button onClick={handleSearch}>🔍</button>
        </div>
    )
};

export default SearchBar;