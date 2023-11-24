import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={style.LandingPage}>
            <img className={style.img} src='https://demascotas.info/wp-content/uploads/2020/05/imagenes-perros-monos.jpg' alt='' />
    
            <div className={style.container}>
                <Link to='/home'>
                 <button className={style.text}>GO DOGS 🐶</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingPage;