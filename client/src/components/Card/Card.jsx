import React from 'react';
import { Link } from 'react-router-dom';

import './Card.style.css';

const Card = ({ dog }) => {

    return (
        <div className='Card-container'>
            <img src={dog.image} alt={dog.name} width= "450px" height="350px" />
            <div>
                <h2>Name: {dog.name}</h2>
                <p>Weight: {dog.weight}</p>
                <p>Temperaments: {dog.temperament}</p>
                {/* <p>Temperaments: {dog.temperaments.map(temperament => temperament.name).join(', ')}</p>  // DE ESTA FORMA ME ROMPE */}
                <Link to={`detail/${dog.id}`}>
                    <button>Detail 👀</button>
                </Link>
            </div>
        </div>
    )
};

export default Card;