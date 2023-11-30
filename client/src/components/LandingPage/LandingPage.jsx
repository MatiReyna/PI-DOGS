import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.style.css';

const LandingPage = () => {
    return (
        <div className='LandingPage'>
            <img className='img' src='https://demascotas.info/wp-content/uploads/2020/05/imagenes-perros-monos.jpg' alt='' />
    
            <div className='container'>
                <Link to='/home'>
                 <button>GO DOGS 🐶</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingPage;