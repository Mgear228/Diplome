import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage/MainPage';
import { useEffect } from 'react';
import axios from 'axios';
import { Page404 } from './pages/Page404/page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
