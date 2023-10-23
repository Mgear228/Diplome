import styles from './FilmItem.module.css'
import React from 'react';
import noImage from '../../assets/paginationAssets/noImg.png'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { film } from '../../api/getFilms';
import favorButton from '../../assets/favouritesPageAssets/favorButton.svg';
import trendsImg from '../../assets/trendsAssets/trendsFlame.svg';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import { useUserContext } from '../../context/UserContext/UserContext';
import { user } from '../../pages/SignUpPage/SignUpPage';

const generateRandRate = () => {
    const random = Math.random() * 100;
    const rounded = Math.round(random)
    const result = rounded / 10;
    return result;
};

type props = {
    film: film;
    favor?: boolean;
    setFilms?: React.Dispatch<React.SetStateAction<film[]>>;
    trends?: boolean;
}

const FilmItem = ({ film, favor, setFilms, trends } : props) => {
    const {user} = useUserContext();
    const {theme} = useThemeContext();
    const [appear, setAppear] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);
    const randomRate = generateRandRate();
    const randomTrendsRate = (Math.random() * 3 + 7).toFixed(1);
    const navigate = useNavigate();

    const handleImgError = () => {
        setImageError(true);
    }

    const handleClick = () => {
        const data = localStorage.getItem(user.email);
        if(data) {
            const parsedData: user = JSON.parse(data);
            const removedFilm = parsedData.films.findIndex((elem) => elem.imdbID === film.imdbID)
            if(removedFilm !== -1) {
                parsedData.films.splice(removedFilm, 1);
                localStorage.setItem(user.email, JSON.stringify(parsedData));
            }
            if(setFilms) setFilms((prevFilms) => prevFilms.filter((favorFilm) => favorFilm.Title !== film.Title));
        }
    }

    let rateStyle;

    if (randomRate > 6) {
        rateStyle = styles.filmGoodRate;
    } else if (randomRate > 4) {
        rateStyle = styles.filmNotGoodRate;
    } else {
        rateStyle = styles.filmBadRate;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppear(true);
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [appear])
    
    return (
        <div className={`${styles.filmObj} ${appear && styles.filmObjAppear}`}>
            {trends? <div className={styles.trendsRate}><img src={trendsImg} alt='flame'/>{randomTrendsRate}</div> : <div className={`${styles.filmRate} ${rateStyle}`}>{randomRate}</div>}
            {favor? <img className={styles.favorBtn} src={favorButton} alt='favorBtn' onClick={handleClick}/> : ''}
            {imageError ? (<img className={styles.failImg} src={noImage} alt='alt' onClick={() => navigate(`/${film.imdbID}`)}/>) 
            : (<img className={styles.filmImg} onError={handleImgError} src={film.Poster} alt='' onClick={() => navigate(`/${film.imdbID}`)}/>)}
            <div className={`${styles.filmTitle} ${theme === 'white'? styles.filmTitleDark : ''}`}>{film.Title}</div>
            <div className={styles.filmType}>{film.Type}</div>
        </div>
    );
};

export default React.memo(FilmItem);