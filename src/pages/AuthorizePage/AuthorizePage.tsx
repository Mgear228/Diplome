import styles from './AuthorizePage.module.css';
import pixema from '../../assets/navigationAssets/pixema.svg';
import allRightsReserved from '../../assets/navigationAssets/© All Rights Reserved.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Password } from '../../components/Password/Password';
import { InputValidation } from '../../components/InputValidation/InputValidation';
import { user } from '../SignUpPage/SignUpPage';
import { useUserContext } from '../../context/UserContext/UserContext';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';

export function AuthorizePage() {
    const {changeUser} = useUserContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const {theme} = useThemeContext();

    const handleValidation = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const data = localStorage.getItem(email);

        if(!email || !emailPattern.test(email)) {
            setIsEmailValid(false);
        } else if(data) {
            setIsEmailValid(true);
            const parsedData: user = JSON.parse(data);
            if((email === parsedData.email) && (password === parsedData.password)) {
                setErrorPassword('');
                changeUser(parsedData);
                navigate('/');
            } else if(!password) {
                setErrorPassword('Введите пароль!');
            } else {
                setErrorPassword('Введите правильный пароль!');
            }
        } else {
            setIsEmailValid(false);
        }
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/support');
    }

    document.documentElement.style.height = 740 + 'px';
    document.body.style.height = 740 + 'px';

    return (
        <div className={styles.authorizeTheme}>
            <img className={styles.pixema} src={pixema} alt="pixema" />
            <div className={`${styles.authorizeMain} ${theme === 'white'? styles.authorizeMainWhite : ''}`}>
                <div className={styles.authorizeWind}>
                    <div className={`${styles.authText} ${theme === 'white'? styles.authTextWhite : ''}`}>Sign In</div>
                    <div className={`${styles.inputBlock} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Email
                        <InputValidation email={email} callback={setEmail} isValid={isEmailValid} placeholder='Your email'/>
                    </div>
                    <div className={`${styles.inputBlock} ${styles.inputBlockLast} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Password
                        <Password value={password} placeholder='Your password' onChange={setPassword} error={errorPassword}/>
                    </div>
                    <div className={styles.forgotPsd} onClick={handleClick}>Forgot password?</div>
                    <div className={styles.signInBtn} onClick={handleValidation}>Sign in</div>
                    <div className={styles.signInText}>Don't have an account?<span className={styles.signUpBtn} onClick={() => navigate('/signUp')}>Sign Up</span></div>
                </div>
            </div>
            <img className={styles.copyright} src={allRightsReserved} alt="ARR" />
        </div>
    );
}