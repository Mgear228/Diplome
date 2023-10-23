import { useNavigate } from 'react-router-dom';
import { Template } from '../../components/Template/Template';
import styles from './FavouritesPage.module.css';
import { useState, useEffect } from 'react';
import { NoFavourites } from '../../components/NoFavourites/NoFavourites';
import { film } from '../../api/getFilms';
import FilmItem from '../../components/FilmItem/FilmItem';

export function FavouritesPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const keys = Object.keys(localStorage);
    const [films, setFilms] = useState<film[]>([]);
    
    document.documentElement.style.height = 1024 + 'px';
    document.body.style.height = 1024 + 'px';
    
    useEffect(() => {
        keys.forEach((key) => {
            if(key.includes('movie')) {
                const value = localStorage.getItem(key);
                if(value) {
                    const parsedValue = JSON.parse(value);
                    setFilms((prevFilms) => [...prevFilms, parsedValue]);
                }
            }
        });
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