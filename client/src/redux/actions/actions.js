import axios from 'axios';
import { GET_ALL_DOGS, GET_BY_ID, GET_BY_NAME, GET_TEMPERAMENTS, CREATE_DOG, FILTER_DOG_BY_TEMPERAMENT, ORDER_BY_NAME, SORT_BY_WEIGHT, PAGINATE, SEARCH_BREED, ORIGIN_DOG } from './actions-types';

export const getAllDogs = () => {  // OBTIENE TODAS LAS RAZAS DE LOS PERROS
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/dogs');
            const dogs = response.data;
            dispatch({
                type: GET_ALL_DOGS,
                payload: dogs  // ACTUALIZA EL ESTADO CON TODOS LOS PERROS
            });
        } catch (error) {
            console.log('Error fetching dogs:', error)
        }
    }
};

export const getById = (id) => {  // ACCION PARA OBTENER UN PERRO POR ID
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            const dog = response.data;
            dispatch({
                type: GET_BY_ID,
                payload: dog  // ACTUALIZA EL ESTADO CON EL PERRO SOLICITADO
            });
        } catch (error) {
            console.log('Error fetching dog by ID:', error)
        }
    }
};

export const getByName = (name) => {  // ACCION PARA OBTENER UN PERRO POR NOMBRE
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            const dogName = response.data;
            dispatch({
                type: GET_BY_NAME,
                payload: dogName  // ACTUALIZA EL ESTADO CON EL PERRO SOLICITADO
            });
        } catch (error) {
            console.log('Error fetching dog by name:', error)
        }
    }
};

export const createDog = (dogData) => {  // ACCION PARA CREAR UN PERRO NUEVO
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', dogData);  // ENVIA LOS DATOS 
            dispatch({
                type: CREATE_DOG,
                payload: response.data
            });
        } catch (error) {
            console.log('Error creating dog:', error)
        }
    }
};

export const getTemperaments = () => {  // ACCION PARA OBTENER LA LISTA DE TEMPERAMENTOS
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/temperaments');
            const dogTemperamet = response.data;
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: dogTemperamet
            });
        } catch (error) {
            console.log('Error fetching temperaments:', error)
        }
    }
};

export const filterByTemperament = (payload) => {  // ACCION PARA FILTRAR PERROS POR TEMPERAMENTOS
    return function (dispatch) {
        dispatch({
            type: FILTER_DOG_BY_TEMPERAMENT,
            payload: payload
        });
    }
};

export const orderByName = (payload) => {  // ACCION PARA ORDENAR LA LISTA DE PERROS POR NOMBRE
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
};

export const filterByWeight = (payload) => {  // ACCION PARA ORDENAR LA LISTA DE PERROS POR PESO
    return {
        type: SORT_BY_WEIGHT,
        payload: payload
    }
};

export const searchBreed = (name) => {  // BUSCA UNA RAZA POR NOMBRE
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            const dogName = response.data;
            dispatch({
                type: SEARCH_BREED,
                payload: dogName
            });
        } catch (error) {
            console.log('Error searching breed by name:', error)
        }
    }
};

export const pageChange = (payload) => {  // ACCION PARA CAMBIAR LA PAGINA DE LA LISTA DE PERROS
    return function (dispatch) {
        dispatch({
            type: PAGINATE,
            payload: payload
        });
    }
};

export const originFrom = (payload) => {  // PARA OBTENER PERROS DE SU ORIGEN
    return {
        type: ORIGIN_DOG,
        payload: payload
    }
};