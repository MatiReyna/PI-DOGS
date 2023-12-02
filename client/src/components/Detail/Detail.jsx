import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Detail = () => {

    const { id } = useParams();

    const allDogs = useSelector((state) => state.dogs);
    const dogDetail = allDogs.find((d) => d.id === id);

    if (!dogDetail) {
        return 'Dog not found';
    }

    const temperaments = Array.isArray(dogDetail.temperament)
        ? dogDetail.temperament.join(', ')
        : dogDetail.temperament;

    return (
        <div>
            <p>ID: {id}</p>
            <p>Name: {dogDetail.name}</p>
            <p>Height: {dogDetail.height}</p>
            <p>Weight: {dogDetail.weight}</p>
            <p>Temperaments: {temperaments}</p>
        </div>
    )
};

export default Detail;