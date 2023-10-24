import axios from 'axios';
import { Template } from '../../components/Template/Template';
import styles from './TrendsPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film } from '../../api/getFilms';
import FilmItem from '../../components/FilmItem/FilmItem';

export function TrendsPage() {
    const [films, setFilms] = useState<Film[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();

    document.documentElement.style.height = 1024 + 'px';
    document.body.style.height = 1024 + 'px';

    useEffect(() => {
        (async() => {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&s=movie&page=${Math.floor(Math.random() * 50) + 1}`);
            setFilms(response.data.Search);
        })()
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
        <Template firstState={2} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>
            <div className={styles.trendsArea}>
                {films.map((elem) => (
                    <FilmItem trends={true} key={`${elem.Title}-${elem.Poster}`} film={elem} />
                ))}
            </div>
        </Template>
    );
}