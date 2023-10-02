import styles from './ModalFilter.module.css'
import close from '../../assets/modalFilterAssets/Close.svg'

type props = {
    onClick: () => void;
    state: boolean;
}

export function ModalFilter({onClick, state} : props) {
    return (<>
            <div className={styles.bgFilter}></div>
            <div className={`${styles.main} ${state? styles.mainOpen : styles.mainClose}`}>
                <div className={styles.name}>Filters<img className={styles.close} onClick={onClick} src={close}/></div>
                <div className={styles.sortBy}>Sort by
                    <div className={styles.sorting}>
                        <div>Rating</div>
                        <div>Year</div>
                    </div>
                </div>
            </div>
        </>
    );
}