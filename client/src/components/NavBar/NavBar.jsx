import React from "react";
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';

import './NavBar.style.css';

const NavBar = () => {
    return (
        <div className='searchbar'>
            <Link to='/'>
                <button>Back App Dog</button>
            </Link>

            <Link to='/form'>
                <button>Create Dog</button>
            </Link>

            <SearchBar />
        </div>
    )
};

export default NavBar;