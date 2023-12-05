import React from 'react';
import { Link } from 'react-router-dom';

import imagen from '../../../utils/dog-landingpage.png';
import './LandingPage.style.css';

const LandingPage = () => {
    return (
        <div className='container'>
            <img className='imagen' src={imagen} alt='Dog Landing Page' />

            <div>
                <Link to='/home'>
                    <button>GO DOGS 🐶</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingPage;