import { useNavigate } from 'react-router-dom';
import styles from './NavigationSmall.module.css'
import { useState } from 'react'
import home from '../../assets/navigationAssets/Home.svg'
import trends from '../../assets/navigationAssets/Trends.svg'
import favourites from '../../assets/navigationAssets/Favorites.svg'
import settings from '../../assets/navigationAssets/Setting.svg'
import homeActive from '../../assets/navigationAssets/HomeActive.svg'
import trendsActive from '../../assets/navigationAssets/TrendsActive.svg'
import favouritesActive from '../../assets/navigationAssets/FavouritesActive.svg'
import settingsActive from '../../assets/navigationAssets/SettingsActive.svg'

type Props = {
    initState: number;
    classname?: string;
    classname2?: string;
}

export function NavigationSmall({initState, classname, classname2} : Props) {
    const [selected] = useState<number>(initState);
    const navigate = useNavigate();

    return (
        <ul className={`${styles.navSmall} ${classname2}`}>
            <li className={`${styles.listElem} ${selected === 1? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/')}><img className={`${styles.listImg}`} src={selected === 1? homeActive : home}/>Home</li>
            <li className={`${styles.listElem} ${selected === 2? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/trends')}><img className={`${styles.listImg}`} src={selected === 2? trendsActive : trends}/>Trends</li>
            <li className={`${styles.listElem} ${selected === 3? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/favourites')}><img className={`${styles.listImg}`} src={selected === 3? favouritesActive : favourites}/>Favourites</li>
            <li className={`${styles.listElem} ${selected === 4? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/settings')}><img className={`${styles.listImg}`} src={selected === 4? settingsActive : settings}/>Settings</li>
        </ul>
    );
}