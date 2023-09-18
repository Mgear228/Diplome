import styles from './Test.module.css'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { InputValidation } from '../../components/InputValidation'
import { Username } from '../../components/Username'
import { Password } from '../../components/Password'
import { Title } from '../../components/Title'
import { HamburgerBtn } from '../../components/HamburgerBtn'
import { Tabs } from '../../components/Tabs'
import { PostItem } from '../../components/PostItem'
import { Template } from '../../components/Template'
import { Registration } from '../../components/Registration'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { Login } from '../../components/Login'

const postList = [
    {id: "01.08.1488", image: "https://avatars.mds.yandex.net/i?id=211993b263ee0eefabad6d99c650bfddfabe7838-10354718-images-thumbs&n=13", text: "SHEESH asdasdsadasd uauaua", title: "Nog?", author: "Chel"},
    {id: "01.08.1337", image: "https://avatars.mds.yandex.net/i?id=211993b263ee0eefabad6d99c650bfddfabe7838-10354718-images-thumbs&n=13", text: "SHEESH asdasdsadasd uauaua", title: "Nog?", author: "Chel"},
];

export function Test() {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    }

    return (
        <Provider store={store}>
            <Template>
                <div className={styles.menu}> 
                    <h1 className={styles.text}>BUTTONS</h1>
                        <Button mode='Primary' text='Primary' isDisabled={false}/>
                        <Button mode='Secondary' text='Secondary' isDisabled={false}/>
                        <Button mode='Tretiary' text='Secondary 2' isDisabled={false}/>
                        <Button mode='Primary' text='Primary' isDisabled={true}/>
                        <Button mode='Secondary' text='Secondary' isDisabled={true}/>
                        <Button mode='Tretiary' text='Secondary 2' isDisabled={true}/>
                        <Username user='Artem Malkin'/>
                    <h1 className={styles.text}>INPUTS</h1>
                        <h2>Title</h2>
                        <label>EMAIL</label>
                        <InputValidation />
                        <label>TEXT</label>
                        <textarea className={styles.textarea} placeholder='Add your text'></textarea>
                        <label>PASSWORD</label>
                        <Password value={password} onChange={handlePasswordChange}/>
                        <Title title='Sign In'/>
                </div>
                <div className={styles.menu}>
                    <HamburgerBtn className={styles.hiddenUser}/>
                    <h1 className={styles.text}>TABS</h1>
                    <Tabs disabled={true}/>
                    {postList.map(post => <PostItem key={post.id} id={post.id} image={post.image} text={post.text} title={post.title} author={post.author}/>)}
                </div>
            </Template>
        </Provider>
    );
}