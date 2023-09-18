import { useState } from "react"
import { Input } from "../Input";
import styles from './index.module.css'

interface props {
    value: string;
    onChange: any;
}

export function Password({value, onChange} : props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e : any) => {
        onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <div className={styles.passwordDiv}>
        <Input
            type={showPassword? "text" : "password"} 
            value={value} 
            onChange={handleChange}
            disabled={false}
            placeholder="placeholder"
        />
        <button className={styles.passwrdbtn} onClick={togglePasswordVisibility}>
            {showPassword? 'Скрыть пароль' : 'Показать пароль'}
        </button>
    </div>
}