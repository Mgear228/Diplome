import styles from './Dropdown.module.css'
import arrow from '../../assets/usernameAssets/Vector 1 (Stroke).svg'
import { useEffect, useState } from 'react'
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';

type props = {
    placeholder: string;
    classname?: string;
    nameOfElems: string[];
    reset: boolean;
    callback?: React.Dispatch<React.SetStateAction<string>> 
}

export function Dropdown({placeholder, nameOfElems, classname, reset, callback} : props) {
    const [clicked, setClicked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [selected, setSelected] = useState<string>(placeholder);
    const {theme} = useThemeContext();
    const elemArray = nameOfElems;

    const handleClick = () => {
        setClicked(!clicked);
    }

    useEffect(() => {
        setSelected(placeholder);
    }, [reset])

    useEffect(() => {
        if(clicked && !mounted) {
            setMounted(true);
        } else if (!clicked && mounted) {
            let timer = setTimeout(() => {
                setMounted(false);
            }, 400);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [clicked]);

    return (
        <div className={styles.dropDown}>
            <div className={`${styles.dropdownHeader} ${theme === 'white'? styles.dropdownWhite : ''}`} onClick={handleClick}>{selected}<img className={styles.arrow} src={arrow} alt='arrow'/></div>
            {mounted && <div className={`${styles.dropdownMenu} ${classname} ${clicked? styles.active: styles.inactive} ${theme === 'white'? styles.dropdownMenuWhite : ''}`}>
                {elemArray.map((elem) => (<div className={`${styles.dropdownElem} ${theme === 'white'? styles.dropdownElemWhite : ''}`} key={elem} onClick={() => {
                    setSelected(elem); 
                    handleClick(); 
                    if(!callback) return; 
                    callback(elem);
                    }}>{elem}</div>))}
            </div>}
        </div>
    );
}