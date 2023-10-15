import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './FilmPage.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Template } from '../../components/Template/Template';
import ImdbRate from '../../assets/singleFilmAssets/Imdb.svg'
import Favor from '../../assets/singleFilmAssets/Favor.svg'
import Share from '../../assets/singleFilmAssets/Share.svg'
import { Recomendations } from '../../components/Recomendations/Recomendations';
import FIlmItem from '../../components/FilmItem/FIlmItem';
import { film } from '../../api/getFilms';

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
    const [films, setFilms] = useState<film[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {id} = useParams();
    
    document.documentElement.style.height = 1200 + 'px';
    document.body.style.height = 1200 + 'px';

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&i=${id}`);
            setFilm(response.data);
        })()
    }, [id])

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&s=movie&page=${Math.random() * 10}`);
            setFilms(response.data.Search);
        })()
    }, [])

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

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };
    
    const handleSearchInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            navigate(`/?s=${inputValue}&page=1`);
        }
    };

    return (
        <Template firstState={1} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>
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
                    <Recomendations length={films.length}>
                        {films.map((elem) => (
                            <FIlmItem key={`${elem.Title}-${elem.Poster}`} film={elem} />
                        ))}
                    </Recomendations>
                </div>
            </div>
        </Template>
    );
}