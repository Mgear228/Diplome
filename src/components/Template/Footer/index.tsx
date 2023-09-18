import { ReactNode } from 'react'
import styles from './index.module.css'

interface props {
    children?: ReactNode;
    change?: boolean;
}

export function Footer({children, change} : props) {
    return <div className={`${styles.footer} ${change? styles.footerDark : styles.footerWhite}`}>
        {children}
    </div>
}