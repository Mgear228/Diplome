import { useSearchParams } from 'react-router-dom';
import styles from './MainPage.module.css';
import { useEffect, useState } from "react";
import { Film, getFilms } from '../../api/getFilms';
import { Template } from '../../components/Template/Template';
import { useMediaQuery } from 'react-responsive';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import FilmItem from '../../components/FilmItem/FilmItem';

export function MainPage() {
    const [films, setFilms] = useState<Film[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState<boolean>(true);
    const [prevParams, setPrevParams] = useState<string>('');
    const [height, setHeight] = useState<number>(1024);
    const [spinner, setSpinner] = useState<boolean>(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const {theme} = useThemeContext()

    const newContentHeight = height;

    useEffect(() => {
        document.addEventListener('scroll', srclHandler);
        document.documentElement.style.height = newContentHeight + 'px';
        document.body.style.height = newContentHeight + 'px';
        return function() {
            document.removeEventListener('scroll', srclHandler);
        }
    }, [height]);

    const srclHandler = (e: Event) => {
        const target = e.target as Document;
        setHeight(target.documentElement.scrollHeight);
    }

    useEffect(() => {
        const stringParams = searchParams.toString();
        
        if(!stringParams.length) {
            setSearchParams(`s=movie&page=1`);
            setPrevParams(`s=movie`);
        } else {
            if(fetching) {
                getFilms({currentPage, searchParams})
                    .then(response => {
                        if(searchParams.toString() !== prevParams.toString()) {
                            isMobile? setFilms(response.Search.slice(0, 9)) : setFilms(response.Search);
                        } else {
                            isMobile? setFilms([...films, ...response.Search.slice(0, 9)]) : setFilms([...films, ...response.Search]);;
                        }
                        setCurrentPage(prevState => prevState + 1);
                    })
                    .finally(() => {
                        setFetching(false);
                        setSpinner(false);
                    })
            }
        }
    }, [searchParams, fetching])

    const handleScroll = () => {
        setPrevParams(searchParams.toString());
        setFetching(true);
        setSpinner(true);
    }
    
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };
    
    const handleSearchInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            
            setSearchParams((prevParams: URLSearchParams) => {
                if (!inputValue) {
                    prevParams.delete("s");
                } else {
                    prevParams.set("s", inputValue);
                    prevParams.set("page", "1");
                }
                return prevParams;
            });
            setFetching(true);
        }
    };

    return (
        <Template firstState={1} change={handleSearchInputChange} confirm={handleSearchInputConfirm} setState={setFetching}>
            <div className={styles.filmArea}>
                {films !== undefined ? films.map((film) => (
                    <FilmItem key={`${film.Title}-${film.Poster}`} film={film} />
                )) : <div className={`${styles.error} ${theme === 'white'? styles.errorWhite : ''}`}>Фильмы не найдены!</div>}
                <button onClick={handleScroll} className={styles.resetBtn}>Show more{spinner && <div className={styles.spinner}></div>}</button>
            </div>
        </Template>
    );
}