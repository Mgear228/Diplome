import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage/MainPage';
import { Page404 } from './pages/Page404/page404';
import { FilmPage } from './pages/FilmPage/FilmPage';
import { TrendsPage } from './pages/TrendsPage/TrendsPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<MainPage />} />
          <Route path=':id' element={<FilmPage />}/>
          <Route path='/trends' element={<TrendsPage />}/>
          <Route path='/favourites' element={<FavouritesPage />}/>
          <Route path='/settings' element={<SettingsPage />}/>
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
