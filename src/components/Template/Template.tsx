import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import { FiltrationComponent } from '../FiltrationComponent/FiltrationComponent';
import { NavigationComponent } from '../NavigationComponent/NavigationComponent';
import styles from './Template.module.css'
import { ReactNode } from 'react';

type props = {
    children?: ReactNode;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    confirm?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    firstState: number;
    setState?: (bool: boolean) => void
}

export function Template({children, change, confirm, firstState, setState} : props) {
    const {theme} = useThemeContext();

    return (
        <div className={`${styles.mainPage} ${theme === 'white'? styles.whiteTheme : styles.darkTheme}`}>
            <NavigationComponent initState={firstState}/>
            <div className={styles.paginationAndSearch}>
                <FiltrationComponent onChange={change} onKeyDown={confirm} setState={setState}/>
                {children}
            </div>
        </div>
    );
}