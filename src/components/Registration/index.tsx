import styles from './index.module.css'
import { Button } from '../Button'
import { InputValidation } from '../InputValidation'
import { Password } from '../Password'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { registerUser } from '../../redux/user/user'
import { Input } from '../Input'
import { Login } from '../Login'

type handleClick = () => void;
interface props {
    callback: handleClick;
}

export function Registration({callback} : props) {
    const dispatch = useAppDispatch();
    const [registr, setRegistr] = useState('Wrong data!');
    const [confirm, setConfirm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [click, setClick] = useState(false);

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    const handleUsernameChange = (e: any) => {
        const {value} = e.target;
        setUsername(value);
    }

    const handleClick = () => {
        setClick(!click);
    }

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(
            registerUser({
                email,
                password,
                username,
            })
        );
        setConfirm(!confirm);
    }

    const validation = (reg: boolean) => {
        if(!reg) {
        setRegistr('Wrong data!');
        return;
        }
        setRegistr('Registration success!');
        return;
    }

    return (<>
        <div onClick={callback} className={styles.bg}></div>
        {!click && <div className={styles.registr}>
            {!confirm && <label>ENTER USERNAME HERE</label>}
            {!confirm && <Input value={username} placeholder='placeholder' disabled={false} type='text' onChange={handleUsernameChange}/>}
            {!confirm && <label>ENTER EMAIL HERE</label>}
            {!confirm && <InputValidation check={validation} callback={setEmail} email={email}/>}
            {!confirm && <label>ENTER PASSWORD HERE</label>}
            {!confirm && <Password value={password} onChange={handlePasswordChange}/>}
            {!confirm && <h2 onClick={handleClick} className={styles.signUp}>Already registed? Login here</h2>}
            {!confirm && <Button onClick={handleChange} mode='Primary' text='Submit registration' isDisabled={false}/>}
            {confirm && <h2 className={confirm? styles.anim : ''}>{registr}</h2>}
        </div>}
        {click && <Login />}
        </>
    );
}