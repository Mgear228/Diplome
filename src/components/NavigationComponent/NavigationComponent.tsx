import styles from './NavigationComponent.module.css'
import pixema from '../../assets/navigationAssets/pixema.svg'
import home from '../../assets/navigationAssets/Home.svg'
import trends from '../../assets/navigationAssets/Trends.svg'
import favourites from '../../assets/navigationAssets/Favorites.svg'
import settings from '../../assets/navigationAssets/Setting.svg'
import label from '../../assets/navigationAssets/© All Rights Reserved.svg'
import { useState } from 'react'

type handleSelectType = (index: number) => void;

export function NavigationComponent() {
    const [selected, setSelected] = useState(1);

    const handleSelect: handleSelectType = (index: number) => {
        setSelected(index);
    }
    
    return (
        <div className={styles.navigation}>
            <div>
                <img src={pixema} alt='pixema' />
                <ul className={styles.navSmall}>
                    <li className={`${styles.listElem} ${selected === 1? styles.listElemActive : ''}`} onClick={() => handleSelect(1)}><img className={`${styles.listImg}`} src={home}/>Home</li>
                    <li className={`${styles.listElem} ${selected === 2? styles.listElemActive : ''}`} onClick={() => handleSelect(2)}><img className={`${styles.listImg}`} src={trends}/>Trends</li>
                    <li className={`${styles.listElem} ${selected === 3? styles.listElemActive : ''}`} onClick={() => handleSelect(3)}><img className={`${styles.listImg}`} src={favourites}/>Favourites</li>
                    <li className={`${styles.listElem} ${selected === 4? styles.listElemActive : ''}`} onClick={() => handleSelect(4)}><img className={`${styles.listImg}`} src={settings}/>Settings</li>
                </ul>
            </div>
            <img src={label} alt="reserved" />
        </div>
    );
}