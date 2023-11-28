import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';

const HomePage = () => {
    return (
        <div>
            <h1>SOY EL HOME</h1>
            <SearchBar />
        </div>
    )
};

export default HomePage;