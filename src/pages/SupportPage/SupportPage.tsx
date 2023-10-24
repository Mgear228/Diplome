import styles from './SupportPage.module.css';
import pixema from '../../assets/navigationAssets/pixema.svg'
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import allRightsReserved from '../../assets/navigationAssets/© All Rights Reserved.svg'
import { InputValidation } from '../../components/InputValidation/InputValidation';
import { useState } from 'react';
import { User } from '../SignUpPage/SignUpPage';
import { useNavigate } from 'react-router-dom';

export function SupportPage() {
    const [email, setEmail] = useState<string>('');
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const {theme} = useThemeContext();
    const navigate = useNavigate();

    document.documentElement.style.height = 740 + 'px';
    document.body.style.height = 740 + 'px';

    const handleSubmit = () => {
        const data = localStorage.getItem(email);
        if(data) {
            const parsedData: User = JSON.parse(data);
            if(!email || email !== parsedData.email) {
                setIsEmailValid(false);
            } else {
                setIsEmailValid(true);
                setConfirm(true);
                const timer = setTimeout(() => {
                    navigate('/authorize');
                    clearTimeout(timer);
                }, 2500);
            }
        }
    }

    return (
        <div className={styles.authorizeTheme}>
            <img className={styles.pixema} src={pixema} alt="pixema" />
            <div className={`${styles.authorizeMain} ${theme === 'white'? styles.authorizeMainWhite : ''}`}>
                <div className={styles.authorizeWind}>
                    <div className={`${styles.authText} ${theme === 'white'? styles.authTextWhite : ''}`}>Reset password</div>
                    <div className={styles.resetSuccess}>{confirm? `You will receive an email ${email} with a link to reset your password!` : ''}</div>
                    <div className={`${styles.inputBlock} ${styles.inputBlockLast} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Email
                        <InputValidation isValid={isEmailValid} callback={setEmail} email={email} placeholder='Your email'/>
                    </div>
                    <div className={styles.signInBtn} onClick={handleSubmit}>Reset</div>
                </div>
            </div>
            <img className={styles.copyright} src={allRightsReserved} alt="ARR" />
        </div>
    );
}