import styles from './NoFavourites.module.css';
import noFavor from '../../assets/favouritesPageAssets/noFavor.svg'

export function NoFavourites() {
    return (
        <div className={styles.notFoundBlock}>
                <img className={styles.notFound} src={noFavor} alt='not found'/>
                <div className={styles.notFoundText}>You have no favourites yet</div>
        </div>
    );
}