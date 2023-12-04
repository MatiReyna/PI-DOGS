import React from 'react';
import { Link } from 'react-router-dom';

import './Card.style.css';

const Card = ({ dog }) => {
    return (
        <div className='Card-container'>
            <img src={dog.image} alt={dog.name} width= "400px" height="300px" />
            <div>
                <h2>Name: {dog.name}</h2>
                <p>Weight: {dog.weight}</p>
                <p>Temperaments: {dog.temperaments.join(', ')}</p>

                <Link to={`/home/detail/${dog.id}`}>
                    <button>Detail 👀</button>
                </Link>
            </div>
        </div>
    )
};

export default Card;