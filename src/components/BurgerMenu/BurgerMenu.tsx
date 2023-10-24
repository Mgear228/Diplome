import { MobileNavigation } from '../MobileNavigation/MobileNavigation';
import styles from './BurgerMenu.module.css';
import { useState } from 'react';

type Props = {
    initState: number;
}

export function BurgerMenu({initState} : Props) {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (<>
        <div className={styles.burgerMenu} onClick={handleClick}>
            <div className={`${styles.burgerLine} ${clicked && styles.open}`}></div>
            <div className={`${styles.burgerLine} ${clicked && styles.open}`}></div>
            <div className={`${styles.burgerLine} ${clicked && styles.open}`}></div>
        </div>
       {clicked && <MobileNavigation initState={initState} state={clicked}/>}
    </>
    );
}