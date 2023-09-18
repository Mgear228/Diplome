import { useEffect, useState } from 'react';
import styles from './index.module.css'
import { Username } from '../Username';

interface props {
    className? : string;
}

export function HamburgerBtn({ className } : props) {
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

    return <>
    <div className={styles.hamburgMenu} onClick={handleClick}>
        <div className={`${styles.burgerLine} ${clicked? styles.open : ''}`}></div>
        <div className={`${styles.burgerLine} ${clicked? styles.open : ''}`}></div>
        <div className={`${styles.burgerLine} ${clicked? styles.open : ''}`}></div>
    </div>
    {mounted && <Username className={`${styles.newUser} ${className} ${clicked? styles.active : styles.inactive}`} user='Artem Malkin'/>}
    </>;
}