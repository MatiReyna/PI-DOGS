const initialState = {
    dogs: [],  // UNA LISTA DE PERROS
    dogsDetail: null,  // DETALLE DE UN PERRO
    filteredDogs: [],  // LISTA FILTRADA DE PERROS
    temperaments: [],  // LISTA DE TEMPERAMENTOS
    searchResults: [],  // RESULTADO DE BUSQUEDA
    ordenBy: '',
    sortBy: '',
    currentPage: 1,  // PAGINA ACTUAL
    dogsPerPage: 8,  // CANTIDAD DE PERROS POR PAGINA
    ordenByWeight: '',
};

const Reduce = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,  // ACTUALIZA LA LISTA DE PERROS CON LOS PERROS OBTENIDOS
                filteredDogs: action.payload
            }
        case 'GET_BY_ID':
            return {
                ...state,
                dogsDetail: action.payload
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                filteredDogs: action.payload  // ACTUALIZA LA LISTA FILTRADA PARA BUSCAR ESE NOMBRE
            }
        case 'CREATE_DOG':
            return {
                ...state,
                dogs: [...state.dogs, action.payload],  // AGREGA EL PERRO CREADO A LA LISTA DE PERROS Y A LOS FILTRADOS
                filteredDogs: [...state.filteredDogs, action.payload]
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_DOG_BY_TEMPERAMENT':
            if (action.payload === 'All') {
                return {
                    ...state,
                    filteredDogs: state.dogs
                }
            }
            const filterBytemperaments = state.dogs.filter((d) =>  // FILTRA LA LISTA DE PERROS
                d.temperaments.includes(action.payload));  // PARA INCLUIR SOLOS LOS QUE TENGA EL TEMP. ESPECIFICADO
            return {
                ...state,
                filteredDogs: filterBytemperaments
            }
        case 'ORDER_BY_NAME':  // ORDENA ALFABETICAMENTE LA LISTA DE PERROS
            const sortedByName = state.filteredDogs.slice().sort((a, b) => {  // CREA UNA LISTA SUPERFICIAL PERO NO MODIFICA LA ORIGINAL
                const order = state.ordenBy === 'asc' ? 1 : -1;  // SI ES ASC EL ORDER ES 1 CASO CONTRARIO -1
                return order * a.name.localeCompare(b.name);  // COMPARA LOS NOMBRES 
            });  // DEVUELVE UN VALOR NEGATIVO SI A VA ANTES QUE B. Y POSITIVO SI ES CASO CONTRARIO
            return {
                ...state,
                filteredDogs: sortedByName,
                ordenBy: state.ordenBy === 'asc' ? 'desc' : 'asc'
            }
        case 'SORT_BY_WEIGHT':
            const sortedByWeight = state.filteredDogs.slice().sort((a, b) => {
                const order = state.ordenByWeight === 'asc' ? 1 : -1;
                return order * (a.weight - b.weight);
            });
            return {
                ...state,
                filteredDogs: sortedByWeight,
                ordenByWeight: state.ordenByWeight === 'asc' ? 'desc' : 'asc'
            }
        case 'SEARCH_BREED':
            return {
                ...state,
                searchResults: action.payload  // ACTUALIZA EL RESULTADO DE LA BUSQUEDA CON LOS DATOS OBTENIDOS
            }
        case 'PAGINATE':
            return {
                ...state,
                currentPage: action.payload  // ACTUALIZA LA PAGINA ACTUAL
            }
        case 'ORIGIN_DOG':
            if (action.payload === 'All') {
                return {
                    ...state,
                    filteredDogs: state.dogs
                }
            }
            const filterOrigin = state.dogs.filter((d) => 
                d.from === action.payload)
            return {
                ...state,
                filteredDogs: filterOrigin,
            }
        default:
            return { ...state }
    }
};

export default Reduce;