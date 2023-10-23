import { useNavigate, useParams } from 'react-router-dom';
import styles from './FilmPage.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Template } from '../../components/Template/Template';
import ImdbRate from '../../assets/singleFilmAssets/Imdb.svg'
import Favor from '../../assets/singleFilmAssets/Favor.svg'
import Share from '../../assets/singleFilmAssets/Share.svg'
import { Recomendations } from '../../components/Recomendations/Recomendations';
import { film } from '../../api/getFilms';
import FilmItem from '../../components/FilmItem/FilmItem';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import { useUserContext } from '../../context/UserContext/UserContext';
import { user } from '../SignUpPage/SignUpPage';

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
    imdbID: string;
    Runtime: string;
}

const userObj = {
    name: '',
    email: '',
    password: '',
    films: [],
}

export function FilmPage() {
    const [film, setFilm] = useState<singleFilm>();
    const [films, setFilms] = useState<film[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [active, setActive] = useState<boolean>();
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useUserContext();
    const {theme} = useThemeContext();
    const [isUser, setIsUser] = useState<boolean>(false);
    
    document.documentElement.style.height = 1200 + 'px';
    document.body.style.height = 1200 + 'px';

    useEffect(() => {
        for(const key in user) {
            const value = user[key as keyof user];
            if(value !== '' && !(Array.isArray(value) && value.length === 0)) {
                setIsUser(false);
                return;
            }
        }
        setIsUser(true);
    }, [user])

    useEffect(() => {
        const data = localStorage.getItem(`${film?.Title}`);
        if(data) { 
            const parsedData: film = JSON.parse(data);
            if(parsedData.Title === film?.Title) setActive(true);
        }
    }, [film])

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&i=${id}`);
            setFilm(response.data);
        })()
    }, [id])

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&s=movie&page=${Math.floor(Math.random() * 50) + 1}`);
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

    const handleClick = () => {
        setActive(true);
        if(!active) {
            const data = {
                Title: film.Title,
                Type: film.Type,
                Poster: film.Poster,
                imdbID: film.imdbID,
            };
            user.films.push(data);        
            const stringData = JSON.stringify(user);
            localStorage.setItem(user.email, stringData);
        }
    }

    return (
        <Template firstState={1} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>
            <div className={styles.filmMain}>
                <div className={styles.filmPosterPart}>
                    <img className={styles.posterImg} src={film.Poster} alt="poster" />
                    <div className={styles.feedback}>
                        <div className={`${styles.feedbackBtnFavor} ${active? styles.feedbackBtnFavorActive : ''} ${theme === 'white'? styles.feedbackBtnFavorWhite : ''}`} onClick={() => isUser? alert('You need to be registrated to favor films!') : handleClick()}><img src={Favor} alt='favor'/></div>
                        <div className={`${styles.feedbackBtnShare} ${theme === 'white'? styles.feedbackBtnShareWhite : ''}`} onClick={() => alert('Oops! This feature is coming soon.')}><img src={Share} alt='share'/></div>
                    </div>
                </div>
                <div className={styles.filmDescPart}>
                    <div className={styles.filmType}>{film.Type.charAt(0).toUpperCase() + film.Type.slice(1)}</div>
                    <div className={`${styles.filmTitle} ${theme === 'white'? styles.filmTitleWhite : ''}`}>{film.Title}</div>
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
                            <FilmItem key={`${elem.Title}-${elem.Poster}`} film={elem} />
                        ))}
                    </Recomendations>
                </div>
            </div>
        </Template>
    );
}