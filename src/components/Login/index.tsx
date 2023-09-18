import styles from './index.module.css'
import { Button } from '../Button'
import { InputValidation } from '../InputValidation'
import { Password } from '../Password'
import { useState } from "react";
import { login } from '../../redux/user/user';
import { useAppDispatch } from '../../redux/hooks';

export function Login() {
    const dispatch = useAppDispatch();
    const [registr, setRegistr] = useState('Wrong data!');
    const [confirm, setConfirm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(
            login({
                email,
                password,
            })
        )
        setConfirm(!confirm);
    }

    const validation = (reg: boolean): void => {
        if(!reg) {
        setRegistr('Wrong data!');
        return;
        }
        setRegistr('Login success!');
        return;
    }

    return (
        <div className={styles.registr}>
            {!confirm && <h1 className={styles.login}>LOGIN</h1>}
            {!confirm && <label>ENTER EMAIL HERE</label>}
            {!confirm && <InputValidation check={validation} callback={setEmail} email={email}/>}
            {!confirm && <label>ENTER PASSWORD HERE</label>}
            {!confirm && <Password value={password} onChange={handlePasswordChange}/>}
            {!confirm && <Button onClick={handleChange} mode='Primary' text='Submit login' isDisabled={false}/>}
            {confirm && <h2 className={confirm? styles.anim : ''}>{registr}</h2>}
        </div>
    );
}