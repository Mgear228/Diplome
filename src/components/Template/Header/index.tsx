import { ReactNode } from 'react'
import styles from './index.module.css'

interface props {
    children?: ReactNode;
    change?: boolean;
}

export function Header({children, change} : props) {
    return <div className={`${styles.header} ${change? styles.headerDark : styles.headerWhite}`}>
        {children}
    </div>
}