import styles from './NavigationComponent.module.css'
import pixema from '../../assets/navigationAssets/pixema.svg'
import pixemaDark from '../../assets/navigationAssets/pixemaDark.svg'
import label from '../../assets/navigationAssets/© All Rights Reserved.svg'
import { useThemeContext } from '../../context/ThemeContext/ThemeContext'
import { NavigationSmall } from '../NavigationSmall/NavigationSmall'

type Props = {
    initState: number;
};

export function NavigationComponent({initState} : Props) {
    const {theme} = useThemeContext();
    
    return (
        <div className={styles.navigation}>
            <div>
                {theme === 'white'? <img src={pixemaDark} alt='pixema' /> : <img src={pixema} alt='pixema' />}
                <NavigationSmall initState={initState}/>
            </div>
            <img src={label} alt="reserved" />
        </div>
    );
}