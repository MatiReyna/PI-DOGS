const initialState = {
    dogs: [],
    dogsDetail: null,
    filteredDogs: [],
    temperaments: [],
    ordenBy: '',
    sortBy: '',
    currentPage: 1,
    dogsPerPage: 8
};

const Reduce = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
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
                filteredDogs: action.payload
            }
        case 'CREATE_DOG':
            return {
                ...state,
                dogs: [...state.dogs, action.payload],
                filteredDogs: [...state.filteredDogs, action.payload]
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_DOG_BY_TEMPERAMENT':
            const filterBytemperaments = state.dogs.filter((d) =>
                d.temperaments);
            return {
                ...state,
                filteredDogs: filterBytemperaments
            }
        case 'ORDER_BY_NAME':
            const sortedByName = state.filteredDogs.slice().sort((a, b) => {
                const order = state.ordenBy === 'asc' ? 1 : -1;
                return order * a.name.localeCompare(b.name);
            });
            return {
                ...state,
                filteredDogs: sortedByName,
                ordenBy: state.ordenBy === 'asc' ? 'desc' : 'asc'
            }
        case 'SORT_BY_WEIGHT':
            const sortedByWeight = state.filteredDogs.slice().sort((a, b) => {
                const order = state.ordenBy === 'asc' ? 1 : -1;
                return order * (a.weight - b.weight);
            });
            return {
                ...state,
                filteredDogs: sortedByWeight,
                ordenBy: state.ordenBy === 'asc' ? 'desc' : 'asc'
            }
        
        case 'PAGINATE':
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return { ...state }
    }     
};

export default Reduce;