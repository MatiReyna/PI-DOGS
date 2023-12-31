import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../../redux/actions/actions';
import validateForm from './validation';

import './FormPage.style.css';

const FormPage = () => {

    const dispatch = useDispatch();

    const temperaments = useSelector((state) => state.temperaments);

    const [formData, setFormData] = useState({  // ESTADO LOCAL PARA EL FORMULARIO
        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: 'https://i.pinimg.com/736x/2c/56/02/2c5602ba6b8eb508ff37e1d533bd0204.jpg',
        temperaments: []
    });

    const [isDogCreated, setIsDogCreated] = useState(false);  // ESTADO LOCAL PARA CUANDO EL PERRO ES CREADO

    const [formErrors, setFormErrors] = useState({});  // ESTADO LOCAL PARA LOS ERRORES

    useEffect(() => {
        dispatch(getTemperaments())  // ME TRAIGO LOS TEMPERAMENTOS PARA QUE PUEDA SELECCIONARLOS
        setFormErrors(validateForm(formData))
    }, [formData]);  // ACTUALIZA EL ERROR DEL FORM CADA VEZ QUE CAMBIA

    const handleInputChange = (e) => {  // MANEJA CAMBIOS EN LOS CAMPOS DE LOS FORMULARIO Y ACTUALIZA EL ESTADO FORMDATA
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleTemperamentChange = (e) => {  // MANEJA CAMBIOS EN LAS OPCIONES QUE SE SELECCIONAN EN EL FORMULARIO Y ACTUALIZA EL ESTADO
        const selectedTemperaments = Array.from(
            e.target.selectedOptions, (option) => option.value
        )
        setFormData((prevData) => ({ ...prevData, temperaments: selectedTemperaments }))
    };

    const handleSubmit = async (e) => {  // FUNCION QUE SE LLAMA AL ENVIAR EL FORMULARIO
        e.preventDefault()
        console.log('desactivado')

        try {
            await dispatch(createDog(formData))  // DESPACHA LA ACCION PARA CREAR UN PERRO CON LA INFOR D LOS CAMPOS DEL FORM
            setIsDogCreated(true)  // Y ACTUALIZA EL ESTADO EN CASO DE EXITO
        } catch (error) {
            console.error('Error creating dog:', error)
        }
    };

    const handleGoBack = () => {  // VUELVE A LA PAGINA DE INICIO CUANDO SE HACE CLICK
        window.location.href = '/home';
    };

    return (
        <div className='container-form'>
            <h2>Create a NEW DOG</h2>
            {
                isDogCreated && <p>Dog created successfully!</p>
            }
            <div>
                <img className='visualizacion' src={formData.image} width='400px' height='300px' />
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                {formErrors.name && <p className='error-message'>{formErrors.name}</p>}
                <label>Height</label>
                <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                />
                {formErrors.height && <p className='error-message'>{formErrors.height}</p>}
                <label>Weight:</label>
                <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                {formErrors.weight && <p className='error-message'>{formErrors.weight}</p>}
                <label>Life Span</label>
                <input
                    type="text"
                    name="life_span"
                    value={formData.life_span}
                    onChange={handleInputChange}
                />
                {formErrors.life_span && <p className='error-message'>{formErrors.life_span}</p>}
                <label>Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                />
                {formErrors.image && <p className='error-message'>{formErrors.image}</p>}
                <label>Temperaments:</label>
                <select multiple name='temperaments' value={formData.temperaments} onChange={handleTemperamentChange}>
                    {
                        temperaments.map((t) => (
                            <option key={t.id} value={t.name}>
                                {t.name}
                            </option>
                        ))
                    }
                </select>
                {formErrors.temperaments && <p className='error-message'>{formErrors.temperaments}</p>}
                <div className={Object.keys(formErrors).length === 0 ? 'button-create' : 'button-disabled'}>
                    <button type='submit' disabled={Object.keys(formErrors).length === 0 ? false : true}>Create Dog</button>
                </div>
            </form>
            <button onClick={handleGoBack}>Go Back to Home</button>
        </div>
    )
};

export default FormPage;