import { Template } from '../../components/Template/Template';
import styles from './SettingsPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();

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

    return (
        <Template firstState={4} change={handleSearchInputChange} confirm={handleSearchInputConfirm}>

        </Template>
    );
}