import axios from 'axios';
import { GET_ALL_DOGS, GET_BY_ID, GET_BY_NAME, GET_TEMPERAMENTS, CREATE_DOG, FILTER_DOG_BY_TEMPERAMENT, ORDER_BY_NAME, SORT_BY_WEIGHT } from './actions-types';

export const getAllDogs = () => {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data
        });
    }
};

export const getById = (id) => {
    return async function (dispatch) {
        const dogId = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: GET_BY_ID,
            payload: dogId.data
        });
    }
};

export const getByName = (name) => {
    return async function (dispatch) {
        const dogName = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: dogName.data
        });
    }
};

export const createDog = (payload) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload);
        return dispatch({
            type: CREATE_DOG,
            payload: response.data
        });
    }
};

export const getTemperaments = () => {
    return async function (dispatch) {
        const answer = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: [...answer.data?.map((tempera) => tempera.name)]
        });
    }
};

export const filterByTemperament = (payload) => {
    return {
        type: FILTER_DOG_BY_TEMPERAMENT,
        payload: payload
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
};

export const filterByWeight = (payload) => {
    return {
        type: SORT_BY_WEIGHT,
        payload: payload
    }
};