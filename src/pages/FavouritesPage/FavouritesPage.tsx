import { useNavigate } from 'react-router-dom';
import { Template } from '../../components/Template/Template';
import styles from './FavouritesPage.module.css';
import { useState, useEffect } from 'react';
import { NoFavourites } from '../../components/NoFavourites/NoFavourites';
import { Film } from '../../api/getFilms';
import FilmItem from '../../components/FilmItem/FIlmItem';
import { useUserContext } from '../../context/UserContext/UserContext';
import { User } from '../SignUpPage/SignUpPage';

export function FavouritesPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const [films, setFilms] = useState<Film[]>([]);
    const {user} = useUserContext();
    
    document.documentElement.style.height = 1024 + 'px';
    document.body.style.height = 1024 + 'px';
    
    useEffect(() => {
        if(user) {
            const data = localStorage.getItem(user.email);
            if(data) {
                const parsedData: User = JSON.parse(data);
                setFilms((prevFilms) => [...prevFilms, ...parsedData.films]);
            }
        }
        return;
    }, [])

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
        <Template firstState={3} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>
            <div className={styles.favorArea}>
                {films.length? films.map((film) => (
                        <FilmItem favor={true} key={`${film.Title}-${film.Poster}`} film={film} setFilms={setFilms}/>
                )) : <NoFavourites />}
            </div>
        </Template>
    );
}