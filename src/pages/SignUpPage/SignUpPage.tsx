import styles from './SignUpPage.module.css';
import pixema from '../../assets/navigationAssets/pixema.svg';
import allRightsReserved from '../../assets/navigationAssets/© All Rights Reserved.svg';
import { Input } from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputValidation } from '../../components/InputValidation/InputValidation';
import { Password } from '../../components/Password/Password';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import { Film } from '../../api/getFilms';

export type User = {
    name: string;
    email: string;
    password: string;
    films: Film[];
}

export function SignUpPage() {
    const [nameValue, setNameValue] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    const [emailValue, setEmailValue] = useState<string>('');
    const [emailIsValid, setEmailIsValid] = useState<boolean>(true);

    const [passwordValue, setPasswordValue] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const navigate = useNavigate();
    const {theme} = useThemeContext();

    const userObj: User = {
        name: '',
        email: '',
        password: '',
        films: [],
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameValue(value);
    }

    const handleValidation = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!nameValue) {
            setNameError('Введите корректное имя!')
        } else {
            userObj.name = nameValue;
            setNameError('');

            if(!emailValue || !emailPattern.test(emailValue)) {
                setEmailIsValid(false);
            } else {
                userObj.email = emailValue;
                setEmailIsValid(true);

                if(!passwordValue || passwordValue !== confirmPassword) {
                    setPasswordError('Введите корректный пароль!');
                } else {
                    if(passwordValue.length < 6) {
                        setPasswordError('Пароль должен быть от 6 символов!');
                    } else {
                        userObj.password = passwordValue;
                        setPasswordError('');
        
                        const JSONData = JSON.stringify(userObj);
                        localStorage.setItem(emailValue, JSONData);
                        navigate('/authorize');
                    }
                }
            }
        }
    }

    document.documentElement.style.height = 740 + 'px';
    document.body.style.height = 740 + 'px';

    return (
        <div className={styles.authorizeTheme}>
            <img className={styles.pixema} src={pixema} alt="pixema" />
            <div className={`${styles.authorizeMain} ${theme === 'white'? styles.authorizeMainWhite : ''}`}>
                <div className={styles.authorizeWind}>
                    <div className={`${styles.authText} ${theme === 'white'? styles.authTextWhite : ''}`}>Sign Up</div>
                    <div className={`${styles.inputBlock} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Name
                        <Input type='text' error={nameError} value={nameValue} onChange={handleNameChange} classname={styles.longInp} placeholder='Your name'/>
                    </div>
                    <div className={`${styles.inputBlock} ${styles.inputBlockLast} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Email
                        <InputValidation isValid={emailIsValid} callback={setEmailValue} email={emailValue} placeholder='Your email'/>
                    </div>
                    <div className={`${styles.inputBlock} ${styles.inputBlockLast} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Password
                        <Password error={passwordError} value={passwordValue} onChange={setPasswordValue} placeholder='Your password'/>
                    </div>
                    <div className={`${styles.inputBlock} ${styles.inputBlockLast} ${theme === 'white'? styles.inputBlockWhite : ''}`}>Confirm password
                        <Password error={passwordError} value={confirmPassword} onChange={setConfirmPassword} placeholder='Confirm password'/>
                    </div>
                    <div className={styles.signInBtn} onClick={handleValidation}>Sign up</div>
                    <div className={styles.signInText}>Already have an account?<span className={styles.signUpBtn} onClick={() => navigate('/authorize')}>Sign In</span></div>
                </div>
            </div>
            <img className={styles.copyright} src={allRightsReserved} alt="ARR" />
        </div>
    );
}