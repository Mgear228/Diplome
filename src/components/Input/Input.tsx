import styles from './Input.module.css'

type props = {
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    classname?: string;
}

export function Input({onKeyDown, onChange, placeholder, classname} : props) {
    return (
        <input onKeyDown={onKeyDown} onChange={onChange} className={`${styles.searchInput} ${classname}`} type="text" placeholder={placeholder}/>
    );
}