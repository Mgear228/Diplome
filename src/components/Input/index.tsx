import styles from './index.module.css'

type TypeMode = 'email' | 'password' | 'text';

interface props {
    disabled: boolean;
    type: TypeMode;
    placeholder: string;
    value?: string;
    onChange?: any;
    error?: any;
}

export function Input({disabled, placeholder, type, value, onChange, error} : props) {
    return <div>
        <input className={`${styles.input} ${error && styles.errorInput}`} 
        type={type} 
        placeholder={placeholder} 
        disabled={disabled}
        value={value}
        onChange={onChange} 
        />
        {error && <span className={styles.error}>{error}</span>}
    </div>
}