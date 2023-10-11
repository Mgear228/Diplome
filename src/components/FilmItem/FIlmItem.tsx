import styles from './FilmItem.module.css'
import React from 'react';
import noImage from '../../assets/paginationAssets/noImg.jpg'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { film } from '../../api/getFilms';

const generateRandRate = () => {
    const random = Math.random() * 100;
    const rounded = Math.round(random)
    const result = rounded / 10;
    return result;
};

type props = {
    film: film;
}

const FilmItem = ({ film } : props) => {
    const [imageError, setImageError] = useState(false);
    const randomRate = generateRandRate();
    const navigate = useNavigate();

    const handleImgError = () => {
        setImageError(true);
    }

    let rateStyle;

    if (randomRate > 6) {
        rateStyle = styles.filmGoodRate;
    } else if (randomRate > 4) {
        rateStyle = styles.filmNotGoodRate;
    } else {
        rateStyle = styles.filmBadRate;
    }

    return (
        <div className={styles.filmObj} onClick={() => navigate(`/${film.imdbID}`)}>
            <div className={`${styles.filmRate} ${rateStyle}`}>{randomRate}</div>
            {imageError ? (<img className={styles.failImg} src={noImage} alt='alt'/>) 
            : (<img className={styles.filmImg} onError={handleImgError} src={film.Poster} alt='' />)}
            <div className={styles.filmTitle}>{film.Title}</div>
            <div className={styles.filmType}>{film.Type}</div>
        </div>
    );
};

export default React.memo(FilmItem);