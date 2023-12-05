import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';

import './SearchBar.style.css';

const SearchBar = () => {

    const dispatch = useDispatch();

    const [searchDog, setSearchDog] = useState('');

    const handleSearch = () => {
        dispatch(getByName(searchDog))
    };

    return (
        <div className='searchbar'>
            <input placeholder='Search by name' type='text' value={searchDog} onChange={(e) => setSearchDog(e.target.value)}></input>
            <button onClick={handleSearch}>🔍</button>
        </div>
    )
};

export default SearchBar;