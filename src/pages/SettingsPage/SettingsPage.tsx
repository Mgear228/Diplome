import { Input } from '../../components/Input/Input';
import { Template } from '../../components/Template/Template';
import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './SettingsPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext';
import { Password } from '../../components/Password/Password';
import { User } from '../SignUpPage/SignUpPage';
import { InputValidation } from '../../components/InputValidation/InputValidation';
import lock from '../../assets/navigationAssets/lockedSettings.svg'

export function SettingsPage() {
    const {theme, changeTheme} = useThemeContext();
    const [inputValue, setInputValue] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const {user, changeUser} = useUserContext(); 

    const [nameValue, setNameValue] = useState<string>(user.name);
    const [nameValueError, setNameValueError] = useState<string>('');

    const [emailValue, setEmailValue] = useState<string>(user.email);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const [passwordValue, setPasswordValue] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const [passwordReset, setPasswordReset] = useState<string>('');
    const [passwordResetError, setPasswordResetError] = useState<string>('');

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');

    const navigate = useNavigate();

    document.documentElement.style.height = 1024 + 'px';
    document.body.style.height = 1024 + 'px';

    const [isUser, setIsUser] = useState<boolean>(false);
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
        if(theme === 'white') {
            setActive(true);
        }
    }, [])

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameValue(value);
    }

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };
    
    const handleSearchInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            navigate(`/?s=${inputValue}&page=1`);
        }
    };

    const handleClick = () => {
        const newTheme = theme === 'dark'? 'white' : 'dark';
        setActive(!active);
        changeTheme(newTheme);
    }

    const handleCancel = () => {
        setNameValue(user.name);
        setEmailValue(user.email);
        setPasswordValue('');
        setPasswordError('');
        setPasswordReset('');
        setPasswordResetError('');
        setPasswordConfirm('');
        setPasswordConfirmError('');
    }
    const handleSubmit = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const data = localStorage.getItem(user.email);
        const userObj = {
            name: nameValue,
            email: emailValue,
            password: passwordReset,
            films: user.films,
        }
        if(!nameValue || nameValue.length < 2) {
            setNameValueError('Введите корректное имя!');
        } else {
            setNameValueError('');
            if(!emailValue || !emailPattern.test(emailValue)) {
                setIsEmailValid(false);
            } else if(data) {
                setIsEmailValid(true);
                if(!passwordValue || passwordValue !== user.password) {
                    setPasswordError('Введите корректный пароль!');
                } else {
                    setPasswordError('');
                    if(!passwordReset) {
                        setPasswordResetError('Введите пароль!');
                    } else {
                        setPasswordResetError('');
                        if(!passwordConfirm || passwordConfirm != passwordReset) {
                            setPasswordConfirmError('Введите корректный пароль!');
                        } else {
                            setPasswordConfirmError('');
                            const parsedData: User = JSON.parse(data);
                            if(JSON.stringify(parsedData) === JSON.stringify(user)) {
                                parsedData.name = nameValue;
                                parsedData.email = emailValue;
                                parsedData.password = passwordReset;
                                parsedData.films = user.films;
                            }
                            const stringData = JSON.stringify(parsedData);
                            localStorage.setItem(emailValue, stringData);
                            localStorage.removeItem(user.email);
                            changeUser(userObj);
                        }
                    }
                }
            }
        }
    }

    return (
        <Template firstState={4} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>
            <div className={`${styles.settingsBlocks} ${theme === 'white'? styles.settingsBlocksWhite : ''}`}>Profile
                <div className={`${styles.profileBlock} ${theme === 'white'? styles.profileBlockWhite : ''} ${isUser? styles.blockedProfileBlocks : ''}`}>
                    <div className={styles.inputBlock}>Name
                        <Input error={nameValueError} onChange={handleName} value={nameValue} type='text' classname={styles.longInput} placeholder='Enter name'/>
                    </div>
                    <div className={styles.inputBlock}>Email
                        <InputValidation email={emailValue} callback={setEmailValue} isValid={isEmailValid} placeholder='Enter email'/>
                    </div>
                    {isUser? <div className={styles.locked}><img className={`${styles.lock} ${theme === 'white'? styles.lockWhite : ''}`} src={lock} alt='lock'/><div className={`${styles.lockText} ${theme === 'white'? styles.lockTextWhite : ''}`}>Authorize to use</div></div> : ''}
                </div>
            </div>
            <div className={`${styles.settingsBlocks} ${theme === 'white'? styles.settingsBlocksWhite : ''}`}>Password
                <div className={`${styles.passwordBlock} ${theme === 'white'? styles.passwordBlockWhite : ''} ${isUser? styles.blockedProfileBlocks : ''}`}>
                    <div className={styles.passwordLine}>
                        <div className={styles.inputBlock}>Password
                            <Password error={passwordError} value={passwordValue} onChange={setPasswordValue} placeholder='Enter password'/>
                        </div>
                    </div>
                    <div className={styles.passwordLine}>
                        <div className={styles.inputBlock}>Reset password
                            <Password error={passwordResetError} value={passwordReset} onChange={setPasswordReset} placeholder='Reset placeholder'/>
                        </div>
                        <div className={styles.inputBlock}>Confirm password
                            <Password error={passwordConfirmError} value={passwordConfirm} onChange={setPasswordConfirm} placeholder='Confirm password'/>
                        </div>
                    </div>
                    {isUser? <div className={styles.locked}><img className={`${styles.lock} ${theme === 'white'? styles.lockWhite : ''}`} src={lock} alt='lock'/><div className={`${styles.lockText} ${theme === 'white'? styles.lockTextWhite : ''}`}>Authorize to use</div></div> : ''}
                </div>
            </div>
            <div className={`${styles.settingsBlocks} ${theme === 'white'? styles.settingsBlocksWhite : ''}`}>Color mode
                <div className={`${styles.colorBlock} ${theme === 'white'? styles.colorBlockWhite : ''}`}>
                    <div className={styles.colorLine}>
                        <div className={styles.colorText}>Dark</div>
                        <div className={`${styles.colorDesc} ${theme === 'white'? styles.colorDescWhite : ''}`}>Use dark thema</div>
                    </div>
                    <div className={styles.colorLine}>
                        <div className={`${styles.colorButton} ${active? styles.colorButtonDeactive : styles.colorButtonActive}`} onClick={handleClick}>
                            <div className={`${styles.btnCircle} ${active? styles.btnCircleDeactive : styles.btnCircleActive}`}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.settingsBlocks}>
                <div className={styles.settingsBtns} onClick={handleCancel}>Cancel</div>
                <div className={styles.settingsBtns} onClick={handleSubmit}>Save</div>
            </div>
        </Template>
    );
}