import styles from './index.module.css'

interface props {
    disabled?: boolean;
}

export function Tabs({disabled} : props) {
    return <div className={styles.tabs}>
        <button className={styles.tabsItem}>All</button>
        <button className={styles.tabsItem}>My favourites</button>
        <button disabled={disabled} className={styles.tabsItem}>Popular</button>
    </div>
}