import styles from './Username.module.css'
import arrow from '../../assets/usernameAssets/Vector 1 (Stroke).svg'

type props = {
    user: string;
};

export function Username({ user } : props) {
    const words = user.split(' ');
    const initials = words.map(word => word.charAt(0));
    const initialsString = initials.join('');
    return (
        <div className={styles.username}>
            <div className={styles.userGroup}>
                <div className={styles.userShort}>{initialsString}</div>
                <div className={styles.name}>{user}</div>
            </div>
            <div className={styles.arrowGroup}>
                <img className={styles.arrow} src={arrow} />
            </div>
        </div>
    );
}