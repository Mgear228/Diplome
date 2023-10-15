import { Username } from '../Username/Username';
import styles from './FiltrationComponent.module.css'
import filter from '../../assets/usernameAssets/Filter.svg'
import { useState, useEffect } from 'react';
import { ModalFilter } from '../ModalFilter/ModalFilter';
import { Input } from '../Input/Input';
import pixema from '../../assets/navigationAssets/pixema.svg';
import { useMediaQuery } from 'react-responsive';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

type props = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setState?: (bool: boolean) => void;
}

export function FiltrationComponent({onKeyDown, onChange, setState} : props) {
    const [clicked, setClicked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isPhone = useMediaQuery({ maxWidth: 420 });

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
            <img className={styles.logo} src={pixema} alt='pixema' />
            <Input classname={styles.shorterInput} onKeyDown={onKeyDown} onChange={onChange} placeholder='Search'/>
            <button onClick={handleClick}><img className={styles.filter} src={filter}/></button>
            {mounted && <ModalFilter onClick={handleClick} state={clicked} setState={setState}/>}
            {isMobile? <BurgerMenu /> : <Username user='Valera Pavlunin ; )'/>}
            {isPhone? <Input classname={styles.phoneInput} onKeyDown={onKeyDown} onChange={onChange} placeholder='Search'/> : null}
        </div>
    );
}