import { useThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './Input.module.css';

type props = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    classname?: string;
    value?: string;
    error?: string;
    type: 'text' | 'password';
}

export function Input({onKeyDown, onChange, placeholder, classname, value, error, type} : props) {
    const {theme} = useThemeContext();

    return (<div className={`${styles.inputBlock} ${classname}`}>
        <input value={value} onKeyDown={onKeyDown} type={type} onChange={onChange} className={`${styles.searchInput} ${error && styles.errorInput} ${theme === 'white'? styles.whiteInput : ''}`} placeholder={placeholder}/>
        {error && <span className={styles.error}>{error}</span>}
    </div>
    );
}