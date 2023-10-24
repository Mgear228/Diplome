import { useState } from 'react';
import styles from './Password.module.css';
import { Input } from '../Input/Input';
import passwordEye from '../../assets/authorizeAssets/passwordEye.svg'

type Props = {
    placeholder: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    error?: string;
}

export function Password({value, onChange, placeholder, error} : Props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <div className={styles.passwordDiv}>
        <Input
            type={showPassword? "text" : "password"} 
            classname={styles.longInp}
            value={value} 
            onChange={handleChange}
            placeholder={placeholder}
            error={error}
        />
        <img className={`${styles.passwordBtn} ${showPassword? styles.passwordBtnShow : ''}`} src={passwordEye} alt='pswrdEye' onClick={togglePasswordVisibility}/>
    </div>
}