import styles from './BurgerMenu.module.css'

export function BurgerMenu() {
    return (
        <div className={styles.burgerMenu}>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine}></div>
            <div className={styles.burgerLine}></div>
        </div>
    );
}