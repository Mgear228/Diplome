import styles from './Username.module.css'
import arrow from '../../assets/usernameAssets/Vector 1 (Stroke).svg'
import { useEffect, useState } from 'react';

type props = {
    user: string;
};

export function Username({ user } : props) {
    const words = user.split(' ');
    const initials = words.map(word => word.charAt(0));
    const initialsString = initials.join('');
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
        <div className={styles.username}>
            <div className={styles.userGroup}>
                <div className={styles.userShort}>{initialsString}</div>
                <div className={styles.name}>{user}</div>
            </div>
            <div className={styles.arrowGroup}>
                <img className={styles.arrow} src={arrow} onClick={handleClick}/>
                {mounted && <div className={`${styles.userDropDown} ${clicked? styles.active : styles.inactive}`}>
                    <div className={styles.dropDownElem}>Войти</div>
                    <div className={styles.dropDownElem}>Выйти</div>
                </div>}
            </div>
        </div>
    );
}