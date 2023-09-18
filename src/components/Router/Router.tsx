import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Test } from '../../pages/Test/Test'
import { NextPage } from '../../pages/NextPage/NextPage';
import { PostPage } from '../../pages/PostPage/PostPage';
import { UserRegistration } from '../../pages/UserRegistration/UserRegistration';

export function Router() {
    return <>
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Test />}/>
            <Route path='/nextPage'>
                <Route index  element={<NextPage />}/>
                <Route path=':id' element={<PostPage />}/>
            </Route>
            <Route path='activate/:uid/:token' element={<UserRegistration />}/>
            </Routes>
        </BrowserRouter>
    </>;
}