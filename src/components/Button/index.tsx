import styles from './index.module.css'

type ButtonMode = 'Primary' | 'Secondary' | 'Tretiary'

interface props {
    text: string;
    mode: ButtonMode;
    isDisabled: boolean;
    onClick?: any;
}

export function Button({text, isDisabled, mode, onClick} : props) {
    return <>
        <button onClick={onClick} className={`${styles.Button} ${styles[mode]}`} disabled={isDisabled}>{text}</button>
    </>
}