const validateForm = (formData) => {
    
    const errors = {};

    if (!formData.name) {  // VALIDACION DEL CAMPO NAME
        errors.name = 'Name is required'
    };

    // VALIDACION DEL CAMPO HEIGHT

    const height = /^\d+(\.\d{1,2})?-\d+(\.\d{1,2})?$/;
    if (!formData.height || !height.test(formData.height)) {
        errors.height = 'Enter a valid height (min-max)'
    };

    // VALIDACION DEL CAMPO WEIGHT

    const weight = /^\d+(\.\d{1,2})?-\d+(\.\d{1,2})?$/;
    if (!formData.weight || !weight.test(formData.weight)) {
        errors.weight = 'Enter a valid weight (min-max)'
    };

    if (formData.life_span > 20) {  // VALIDACION DEL CAMPO LIFE SPAN
        errors.life_span = 'Life span should not be greater than 20'
    };

    if (formData.life_span.trim() === '') {
        errors.life_span = 'life span should not be empty'
    }

    // VALIDACION DEL CAMPO IMAGEN

    const imageURL = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!formData.image || !imageURL.test(formData.image)) {
        errors.image = 'Enter a valid image URL'
    }

    if (formData.image === 'https://i.pinimg.com/736x/2c/56/02/2c5602ba6b8eb508ff37e1d533bd0204.jpg') {
        errors.image = 'Put a picture'
    }

    // VALIDACION DE CAMPOS DE TEMPERAMENTOS

    if (!formData.temperaments || formData.temperaments.length === 0) {
        errors.temperaments = 'Select at least one temperament'
    };
    return errors
};

export default validateForm;