import { FiltrationComponent } from '../FiltrationComponent/FiltrationComponent';
import { NavigationComponent } from '../NavigationComponent/NavigationComponent';
import styles from './Template.module.css'
import { ReactNode } from 'react';

type props = {
    children?: ReactNode;
    change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    confirm?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Template({children, change, confirm} : props) {
    return (
        <div className={styles.mainPage}>
            <NavigationComponent />
            <div className={styles.paginationAndSearch}>
                <FiltrationComponent onChange={change} onKeyDown={confirm}/>
                {children}
            </div>
        </div>
    );
}