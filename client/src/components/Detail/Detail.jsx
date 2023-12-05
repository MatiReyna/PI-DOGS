import React from "react";
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../NavBar/NavBar';

import './Detail.style.css';
import image from '../../../utils/dogdetail.jpeg';

const Detail = () => {

    const { id } = useParams();

    const allDogs = useSelector((state) => state.dogs);

    const dogDetail = allDogs.find((d) => d.id == id);

    if (!dogDetail) {
        return 'Dog not found';
    };

    return (
        <div>
            <NavBar />
            <img className='fondo-detail' src={image} />
            <div className='card-detail'>
                <img src={dogDetail.image} width='400px' height='300px' />
                <p>ID: {id}</p>
                <p>Name: {dogDetail.name}</p>
                <p>Height: {dogDetail.height}</p>
                <p>Weight: {dogDetail.weight}</p>
                <p>Temperaments: {dogDetail.temperaments ? dogDetail.temperaments.join(', ') : 'N/A'}</p>
                <p>from: {dogDetail.from}</p>

                <Link to='/home'>
                    <button>VOLVER AL HOME</button>
                </Link>

            </div>
        </div>
    )
};

export default Detail;