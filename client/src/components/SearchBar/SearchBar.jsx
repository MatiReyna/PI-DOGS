import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';

const SearchBar = () => {

    const dispatch = useDispatch();

    const [ search, setSearch ] = useState('');

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    };

    const handleSearch = () => {
        const seeker = search.trim().toLowerCase()

        if (!seeker) {
            alert('Dog not found')
        } else if (!search.match(/^[a-zA-Z]+$/)) {
            alert('Please enter alphabetic characters only')
        } else {
            dispatch(getByName(seeker))
        }
    };

    return (
        <div>
            <input type='text' value={search} onChange={handleInputChange}></input>
            <button onClick={handleSearch}>🔍</button>
        </div>
    )
};

export default SearchBar;