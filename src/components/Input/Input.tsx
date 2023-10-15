import styles from './Input.module.css';

type props = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    classname?: string;
    value?: string;
}

export function Input({onKeyDown, onChange, placeholder, classname, value} : props) {
    return (
        <input value={value} onKeyDown={onKeyDown} onChange={onChange} className={`${styles.searchInput} ${classname}`} type="text" placeholder={placeholder}/>
    );
}