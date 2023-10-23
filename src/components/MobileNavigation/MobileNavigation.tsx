import { useUserContext } from '../../context/UserContext/UserContext';
import styles from './MobileNavigation.module.css';
import { NavigationSmall } from '../NavigationSmall/NavigationSmall';
import { useEffect, useState } from 'react';
import { user } from '../../pages/SignUpPage/SignUpPage';
import { useNavigate } from 'react-router-dom';

type props = {
    state: boolean;
    initState: number;
}

export function MobileNavigation({state, initState} : props) {
    const navigate = useNavigate();
    const {user, changeUser} = useUserContext();
    const words = user.name.split(' ');
    const initials = words.map(word => word.charAt(0));
    const initialsString = initials.join('');
    const [isUser, setIsUser] = useState<boolean>(false);

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

    const handleExit = () => {
        changeUser({
            name: '',
            email: '',
            password: '',
            films: [],
        });
        navigate('/authorize');
    }

    return (
        <div className={`${styles.navMenu} ${state && styles.navMenuActive}`}>
            <div className={styles.navContent}>
                <div className={styles.user}>
                    <div className={styles.currUserText}>Current user
                        <div className={`${styles.leaveBtn} ${isUser? styles.leaveBtnDeactive : ''}`} onClick={handleExit}>Leave</div>
                    </div>
                    {isUser? <div className={styles.enter} onClick={() => navigate('/authorize')}>Enter to the account</div> : <div className={styles.userBlock}>
                        <div className={styles.usernameShort}>{initialsString}</div>
                        <div>
                            <div>Name: {user.name}</div>
                            <div>Email: {user.email}</div>
                        </div>
                    </div>}
                    <NavigationSmall classname={styles.short} classname2={styles.navShort} initState={initState}/>
                </div>
            </div>
        </div>
    );
}