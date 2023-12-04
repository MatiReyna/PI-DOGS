import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../../redux/actions/actions';

const FormPage = () => {

    const dispatch = useDispatch();

    const temperaments = useSelector((state) => state.temperaments);

    const [formData, setFormData] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperaments: []
    });

    const [isDogCreated, setIsDogCreated] = useState(false);

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleTemperamentChange = (e) => {
        const selectedTemperaments = Array.from(
            e.target.selectedOptions, (option) => option.value
        )
        setFormData((prevData) => ({ ...prevData, temperaments: selectedTemperaments }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createDog(formData))
            setIsDogCreated(true)
        } catch (error) {
            console.error('Error creating dog:', error)
        }
    };

    const handleGoBack = () => {
        window.location.href = '/home';
    };

    return (
        <div>
            <h2>Create a NEW DOG</h2>
            {
                isDogCreated && <p>Dog created successfully!</p>
            }
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <label>Height</label>
                <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                />
                <label>Weight:</label>
                <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                <label>Life Span</label>
                <input
                    type="text"
                    name="life_span"
                    value={formData.life_span}
                    onChange={handleInputChange}
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                />
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
                <button type="submit">Create Dog</button>
            </form>
            <button onClick={handleGoBack}>Go Back to Home</button>
        </div>
    )
};

export default FormPage;