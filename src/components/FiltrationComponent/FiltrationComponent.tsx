import { Username } from '../Username/Username';
import styles from './FiltrationComponent.module.css'
import filter from '../../assets/usernameAssets/Filter.svg'
import { useState, useEffect } from 'react';
import { ModalFilter } from '../ModalFilter/ModalFilter';

type props = {
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FiltrationComponent({onKeyDown, onChange} : props) {
    const [clicked, setClicked] = useState(false);
    const [mounted, setMounted] = useState(false);

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
        <div className={styles.filtrationGroup}>
            <input onKeyDown={onKeyDown} onChange={onChange} className={styles.searchInput} type="text" placeholder='Search'/>
            <button onClick={handleClick}><img className={styles.filter} src={filter}/></button>
            {mounted && <ModalFilter onClick={handleClick} state={clicked}/>}
            <Username user='Valera Pavlunin ; )'/>
        </div>
    );
}