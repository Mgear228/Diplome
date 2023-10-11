import styles from './Dropdown.module.css'
import arrow from '../../assets/usernameAssets/Vector 1 (Stroke).svg'
import { useEffect, useState } from 'react'

type props = {
    placeholder: string;
    classname?: string;
    nameOfElems: string[];
}

export function Dropdown({placeholder, nameOfElems, classname} : props) {
    const [clicked, setClicked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const elemArray = nameOfElems;

    const handleClick = () => {
        setClicked(!clicked);
    }

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
            <div className={styles.dropdownHeader} onClick={handleClick}>{placeholder}<img className={styles.arrow} src={arrow} alt='arrow'/></div>
            {mounted && <div className={`${styles.dropdownMenu} ${classname} ${clicked? styles.active: styles.inactive}`}>
                {elemArray.map((elem) => (<div className={styles.dropdownElem} key={elem}>{elem}</div>))}
            </div>}
        </div>
    );
}