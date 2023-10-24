import styles from './Username.module.css'
import arrow from '../../assets/usernameAssets/Vector 1 (Stroke).svg'
import { useEffect, useState } from 'react';
import profileRegister from '../../assets/usernameAssets/profilePicture.svg'
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import { user } from '../../pages/SignUpPage/SignUpPage';
import { useUserContext } from '../../context/UserContext/UserContext';

type Props = {
    user: User;
};

export function Username({ user } : Props) {
    const {changeUser} = useUserContext();
    const {theme} = useThemeContext();
    const navigate = useNavigate();
    const words = user.name.split(' ');
    const initials = words.map(word => word.charAt(0));
    const initialsString = initials.join('');
    const [clicked, setClicked] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);

    const [focused, setFocused] = useState(false);
    const [mountFocused, setMountFocused] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleFocus = () => {
        setFocused(true);        
    }
    const handleDisfocus = () => {
        setFocused(false);
    }

    const handleExit = () => {
        changeUser({
            name: '',
            email: '',
            password: '',
            films: [],
        });
        navigate('/authorize');
    }

    useEffect(() => {
        for(const key in user) {
            const value = user[key as keyof User];
            if(value !== '' && !(Array.isArray(value) && value.length === 0)) {
                setIsUser(false);
                return;
            }
        }
        setIsUser(true);
    }, [user])
    
    useEffect(() => {
        if(clicked && !mounted) {
            setMounted(true);
        } else if (!clicked && mounted) {
            let timer = setTimeout(() => {
                setMounted(false);
            }, 400);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [clicked]);

    useEffect(() => {
        if(focused && !mountFocused) {
            setMountFocused(true);
        } else if (!focused && mountFocused) {
            let timer = setTimeout(() => {
                setMountFocused(false);
            }, 400);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [focused]);
    
    return (
        <div className={styles.username}>
            {isUser? <div className={styles.userGroup}>
                {mountFocused && <div className={`${styles.enter} ${focused? styles.enterActive : styles.enterInactive} ${theme === 'white'? styles.nameDark : ''}`} onPointerEnter={handleFocus} onPointerLeave={handleDisfocus} onClick={() => navigate('/authorize')}>Enter to the account</div>}
                <div className={`${styles.profileRegister} ${focused? styles.profileRegActive : ''}`} onPointerEnter={handleFocus} onPointerLeave={handleDisfocus}><img className={styles.profilePicture} src={profileRegister} alt='registr'/></div>
            </div> : null}
            {isUser? null : <div className={styles.userGroup}>
                <div className={styles.userShort}>{initialsString}</div>
                <div className={`${styles.name} ${theme === 'white'? styles.nameWhite : ''}`}>{user.name}</div>
            </div>}
            {isUser? null : <div className={styles.arrowGroup} onClick={handleClick}>
                <img className={styles.arrow} src={arrow}/>
                {mounted && <div className={`${styles.userDropDown} ${clicked? styles.active : styles.inactive}`}>
                    <div className={styles.dropDownElem} onClick={handleExit}>Exit</div>
                </div>}
            </div>}
        </div>
    );
}