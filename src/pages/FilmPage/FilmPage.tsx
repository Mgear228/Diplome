import { useParams } from 'react-router-dom';
import styles from './FilmPage.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Template } from '../../components/Template/Template';
import ImdbRate from '../../assets/singleFilmAssets/Imdb.svg'
import Favor from '../../assets/singleFilmAssets/Favor.svg'
import Share from '../../assets/singleFilmAssets/Share.svg'

type singleFilm = {
    Title: string;
    Type: string;
    Poster: string;
    Plot: string;
    Year: string;
    Released: string;
    BoxOffice: string;
    Country: string;
    Production: string;
    Actors: string;
    Director: string;
    Writer: string;
    imdbRating: string;
    Runtime: string;
}

export function FilmPage() {
    const [film, setFilm] = useState<singleFilm>();
    const {id} = useParams();
    
    document.documentElement.style.height = 1000 + 'px';
    document.body.style.height = 1000 + 'px';

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&i=${id}`);
            setFilm(response.data);
        })()
    }, [id])

    if(!film) return null;

    const rate = Number(film.imdbRating);
    let rateStyle;

    if (rate > 6) {
        rateStyle = styles.filmGoodRate;
    } else if (rate > 4) {
        rateStyle = styles.filmNotGoodRate;
    } else {
        rateStyle = styles.filmBadRate;
    }

    return (
        <Template>
            <div className={styles.filmMain}>
                <div className={styles.filmPosterPart}>
                    <img className={styles.posterImg} src={film.Poster} alt="poster" />
                    <div className={styles.feedback}>
                        <div className={styles.feedbackBtnFavor}><img src={Favor} alt='favor'/></div>
                        <div className={styles.feedbackBtnShare}><img src={Share} alt='share'/></div>
                    </div>
                </div>
                <div className={styles.filmDescPart}>
                    <div className={styles.filmType}>{film.Type.charAt(0).toUpperCase() + film.Type.slice(1)}</div>
                    <div className={styles.filmTitle}>{film.Title}</div>
                    <div className={styles.filmRateAndTime}>
                        <div className={`${styles.filmRate} ${rateStyle}`}>{film.imdbRating}</div>
                        <div className={styles.filmImdbRate}><img src={ImdbRate} alt='rate'/>{film.imdbRating}</div>
                        <div className={styles.filmRuntime}>{film.Runtime}</div>
                    </div>
                    <div className={styles.filmDesc}>{film.Plot}</div>
                    <div className={styles.miscDescPart}>
                        <ul className={styles.miscDesc}>
                            <li>Year<span>{film.Year}</span></li>
                            <li>Released<span>{film.Released}</span></li>
                            <li>BoxOffice<span>{film.BoxOffice}</span></li>
                            <li>Country<span>{film.Country}</span></li>
                            <li>Production<span>{film.Production}</span></li>
                            <li>Actors<span>{film.Actors}</span></li>
                            <li>Director<span>{film.Director}</span></li>
                            <li>Writers<span>{film.Writer}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Template>
    );
}