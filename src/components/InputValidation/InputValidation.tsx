import { Input } from "../Input/Input";
import { useState, useEffect } from 'react';

type props = {
    isValid: boolean;
    callback: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    placeholder: string;
};

export function InputValidation({isValid, callback, email, placeholder} : props) {
    const [emailError, setEmailError] = useState<string>('');

    const handleChange = (e: any) => {
        const {value} = e.target;
        callback?.(value);
    };

    useEffect(() => {
        if(!isValid) {
            setEmailError('Введите корректный email!');
        } else {
            setEmailError('');
        }
    }, [isValid]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input type='text' value={email} classname={`w-[100%]`} onChange={handleChange} placeholder={placeholder} error={emailError}/>
        </form>
    );
}