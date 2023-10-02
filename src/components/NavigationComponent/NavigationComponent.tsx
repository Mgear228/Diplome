import styles from './NavigationComponent.module.css'
import pixema from '../../assets/navigationAssets/pixema.svg'
import home from '../../assets/navigationAssets/Home.svg'
import trends from '../../assets/navigationAssets/Trends.svg'
import favourites from '../../assets/navigationAssets/Favorites.svg'
import settings from '../../assets/navigationAssets/Setting.svg'
import label from '../../assets/navigationAssets/© All Rights Reserved.svg'

export function NavigationComponent() {
    return (
        <div className={styles.navigation}>
            <div>
                <img src={pixema} alt='pixema' />
                <ul className={styles.navSmall}>
                    <li className={styles.listElem}><img className={styles.listImg} src={home} />Home</li>
                    <li className={styles.listElem}><img className={styles.listImg} src={trends} />Trends</li>
                    <li className={styles.listElem}><img className={styles.listImg} src={favourites} />Favourites</li>
                    <li className={styles.listElem}><img className={styles.listImg} src={settings} />Settings</li>
                </ul>
            </div>
            <img src={label} alt="reserved" />
        </div>
    );
}