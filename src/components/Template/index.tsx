import styles from './index.module.css'
import image from '../../assets/brightness.png'
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../context/ThemeContext';
import profileIcon from '../../assets/profile-svgrepo-com.svg'
import { useState } from "react";
import { Registration } from '../Registration';

interface props {
    children?: ReactNode;
}

export function Template({children} : props) {
    const navigate = useNavigate();
    const {theme, changeTheme} = useThemeContext();
    const [clicked, setClicked] = useState(false);

    const handleChange = () => {
        const newTheme = theme === 'dark'? 'white' : 'dark';
        changeTheme(newTheme);
    }

    const handleClick = () => {
        setClicked(!clicked);
    }
    
    return <div className={`${styles.fon} ${theme === 'dark'? styles.wrapperDark : styles.wrapperWhite}`}>
        <Header change={theme === 'dark'}>
            <button 
                className={styles.theme} 
                onClick={handleChange}>
                    <img className={`${styles.image} ${theme === 'dark'? styles.imageWhite: ''}`} src={image} alt="" />
            </button>
            <Button mode='Primary' text='Next Page' isDisabled={false} onClick={() => {navigate('/nextPage')}}/>
            HEADERRRRRRRRRRRRRRRRRR
            <button 
                className={styles.profile}
                onClick={handleClick}>
                <img className={styles.profileIcon} src={profileIcon} alt='profile' />
            </button>
        </Header>
        {clicked && <Registration callback={handleClick}/>}
        <div className={styles.content}>{children}</div>
        <Footer change={theme === 'dark'}>FOOTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR</Footer>
    </div>
}