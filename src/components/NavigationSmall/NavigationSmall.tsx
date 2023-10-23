import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext';
import { user } from '../../pages/SignUpPage/SignUpPage';
import styles from './NavigationSmall.module.css'
import { useState, useEffect } from 'react'
import lockedSettings from '../../assets/navigationAssets/lockedSettings.svg'
import home from '../../assets/navigationAssets/Home.svg'
import trends from '../../assets/navigationAssets/Trends.svg'
import favourites from '../../assets/navigationAssets/Favorites.svg'
import settings from '../../assets/navigationAssets/Setting.svg'
import homeActive from '../../assets/navigationAssets/HomeActive.svg'
import trendsActive from '../../assets/navigationAssets/TrendsActive.svg'
import favouritesActive from '../../assets/navigationAssets/FavouritesActive.svg'
import settingsActive from '../../assets/navigationAssets/SettingsActive.svg'

type props = {
    initState: number;
    classname?: string;
    classname2?: string;
}

export function NavigationSmall({initState, classname, classname2} : props) {
    const [selected] = useState<number>(initState);
    const [alert, setAlert] = useState<boolean>(false);
    const {user} = useUserContext();
    const [isUser, setIsUser] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        for(const key in user) {
            const value = user[key as keyof user];
            if(value !== '' && !(Array.isArray(value) && value.length === 0)) {
                setIsUser(false);
                return;
            }
        }
        setIsUser(true);
    }, [user])

    return (
        <ul className={`${styles.navSmall} ${classname2}`}>
            <li className={`${styles.listElem} ${selected === 1? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/')}><img className={`${styles.listImg}`} src={selected === 1? homeActive : home}/>Home</li>
            <li className={`${styles.listElem} ${selected === 2? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/trends')}><img className={`${styles.listImg}`} src={selected === 2? trendsActive : trends}/>Trends</li>
            <li className={`${styles.listElem} ${selected === 3? styles.listElemActive : ''} ${classname}`} onClick={() => navigate('/favourites')}><img className={`${styles.listImg}`} src={selected === 3? favouritesActive : favourites}/>Favourites</li>
            <li className={`${styles.listElem} ${selected === 4? styles.listElemActive : ''} ${classname} ${isUser? styles.settingsDeactive : ''}`} onClick={() => isUser? setAlert(true) : navigate('/settings')}><img className={`${styles.listImg}`} src={selected === 4? settingsActive : settings}/>Settings{isUser? <img className={styles.lock} src={lockedSettings} alt='lock'/> : ''}</li>
            {alert && <div className={styles.settingsDeactiveAlert}>First, registrate!</div>}
        </ul>
    );
}