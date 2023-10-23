import styles from './NavigationComponent.module.css'
import pixema from '../../assets/navigationAssets/pixema.svg'
import pixemaDark from '../../assets/navigationAssets/pixemaDark.svg'
import home from '../../assets/navigationAssets/Home.svg'
import trends from '../../assets/navigationAssets/Trends.svg'
import favourites from '../../assets/navigationAssets/Favorites.svg'
import settings from '../../assets/navigationAssets/Setting.svg'
import homeActive from '../../assets/navigationAssets/HomeActive.svg'
import trendsActive from '../../assets/navigationAssets/TrendsActive.svg'
import favouritesActive from '../../assets/navigationAssets/FavouritesActive.svg'
import settingsActive from '../../assets/navigationAssets/SettingsActive.svg'
import label from '../../assets/navigationAssets/© All Rights Reserved.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../context/ThemeContext/ThemeContext'
import { useUserContext } from '../../context/UserContext/UserContext'
import { user } from '../../pages/SignUpPage/SignUpPage'
import lockedSettings from '../../assets/navigationAssets/lockedSettings.svg'

type props = {
    initState: number;
};

export function NavigationComponent({initState} : props) {
    const navigate = useNavigate();
    const {theme} = useThemeContext();
    const {user} = useUserContext();
    const [isUser, setIsUser] = useState<boolean>(false);
    const [selected] = useState<number>(initState);

    useEffect(() => {
        for(const key in user) {
            if(user[key as keyof user] !== '') {
                setIsUser(false);
                return;
            }
        }
        setIsUser(true);
    }, [user])
    
    return (
        <div className={styles.navigation}>
            <div>
                {theme === 'white'? <img src={pixemaDark} alt='pixema' /> : <img src={pixema} alt='pixema' />}
                <ul className={styles.navSmall}>
                    <li className={`${styles.listElem} ${selected === 1? styles.listElemActive : ''}`} onClick={() => navigate('/')}><img className={`${styles.listImg}`} src={selected === 1? homeActive : home}/>Home</li>
                    <li className={`${styles.listElem} ${selected === 2? styles.listElemActive : ''}`} onClick={() => navigate('/trends')}><img className={`${styles.listImg}`} src={selected === 2? trendsActive : trends}/>Trends</li>
                    <li className={`${styles.listElem} ${selected === 3? styles.listElemActive : ''}`} onClick={() => navigate('/favourites')}><img className={`${styles.listImg}`} src={selected === 3? favouritesActive : favourites}/>Favourites</li>
                    <li className={`${styles.listElem} ${selected === 4? styles.listElemActive : ''} ${isUser? styles.settingsDeactive : ''}`} onClick={() => navigate('/settings')}><img className={`${styles.listImg}`} src={selected === 4? settingsActive : settings}/>Settings{isUser? <img className={styles.lock} src={lockedSettings} alt='lock'/> : ''}</li>
                </ul>
            </div>
            <img src={label} alt="reserved" />
        </div>
    );
}