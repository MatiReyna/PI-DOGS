// ESTADO INICIAL DEL REDUCER
// DOGSCOPY ES UNA COPIA DE DOGS. SOBRE ESTAN SE HACEN LOS FILTROS (PARA EVITAR PROBLEMAS)

const initialState = {
    dogs: [],
    dogsCopy: [],
    details: [],
    temperaments: [],
    search: '',
    data: [],
    loading: false,
    error: null
};

const Reduce = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        case 'GET_BY_ID':
            return {
                ...state,
                details: action.payload
            }
        case 'CREATE_DOG':
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        // FILTRA UNA LISTA DE PERROS SEGUN EL TEMPERAMENTO DETERMINADO
        case 'FILTER_DOG_BY_TEMPERAMENT':
            const allDogs = state.dogsCopy;  // SE ASIGNA LA LISTA COMPLETA DE PERROS A LA VARIABLE

            //  EN LA VARIABLE SE FILTRA DE ACUERDO AL PAYLOAD RECIBIDO POR LA ACTION.
            //  SI EL VALUE ES "ALL", SE DEVUELVE LA LISTA COMPLETA
            //  DE LO CONTRARIO SE DEVUELVE UN ARREGLO FILTRADO POR EL TEMPERAMENTO RECIBIDO EN LA ACTION

            const filterDogs = (action.payload === "All") ? allDogs : allDogs.filter((dog) => dog.temperament?.includes(action.payload));

            //  SE RECORRE LA LISTA COMPLETA DE PERROS
            //  SE AGREGA AL ARREGLO CADA UNO DE LOS TEMPERAMENTOS QUE COINCIDAN CON EL VALOR DEL PAYLOAD

            const filterDb = [];
            allDogs.forEach((elemento) => {
                if (typeof elemento.id === 'string') {
                    elemento.temperament?.forEach((tempe) => {
                        if (tempe === action.payload) {
                            filterDb.push(tempe)
                        }
                    })
                }
            })

            return {
                ...state,
                dogs: filterDogs.concat(filterDb)
            }
        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc'?
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }
                return 0;
            }) :
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1
                }
                if (a.name < b.name) {
                    return 1
                }
            })
            return {
                ...state,
                dogs:sortedArray 
            }
        case 'SORT_BY_WEIGHT':
            const pesoOrdenado = (action.payload === "min") ?
            state.dogs.sort((a, b) => {
                if (a.weight.includes('NaN')) {
                    return 1000
                } else {
                    if ((parseInt(a.weight.split(' - ')[0])) > parseInt(b.weight.split(' - ')[0])) return 1;
                    if ((parseInt(a.weight.split(' - ')[0])) < parseInt(b.weight.split(' - ')[0])) return -1;
                    return 0
                }
            }) :
            state.dogs.sort((a, b) => {
                if (a.weight.includes('NaN')) {
                    return 1000
                } else {
                    if ((parseInt(a.weight.split(' - ')[0])) > parseInt(b.weight.split(' - ')[0])) return -1;
                    if ((parseInt(a.weight.split(' - ')[0])) < parseInt(b.weight.split(' - ')[0])) return 1;
                    return 0
                }
            })
            return {
                ...state,
                dogs: pesoOrdenado 
            }
        case 'SEARCH_BREED':
            return {
                ...state,
                search: action.payload
            }
        default:
            return { ...state }
    }
};

export default Reduce;