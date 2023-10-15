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
    return (
        <div className={styles.mainPage}>
            <NavigationComponent initState={firstState}/>
            <div className={styles.paginationAndSearch}>
                <FiltrationComponent onChange={change} onKeyDown={confirm} setState={setState}/>
                {children}
            </div>
        </div>
    );
}