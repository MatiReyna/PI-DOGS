import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={style.LandingPage}>
            <img className={style.img} src='https://demascotas.info/wp-content/uploads/2020/05/imagenes-perros-monos.jpg' alt='' />
            <h1>BIENVENIDOS AL MUNDO DOGS</h1>
            <div className={style.container}>
                <h2>!GO DOGS App¡</h2>
                <Link to='/home'>
                 <button className={style.text}>GO DOGS 🐶</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingPage;