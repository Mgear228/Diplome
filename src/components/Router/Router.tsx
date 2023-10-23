
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from '../../pages/MainPage/MainPage';
import { FilmPage } from '../../pages/FilmPage/FilmPage';
import { TrendsPage } from '../../pages/TrendsPage/TrendsPage';
import { FavouritesPage } from '../../pages/FavouritesPage/FavouritesPage';
import { SettingsPage } from '../../pages/SettingsPage/SettingsPage';
import { AuthorizePage } from '../../pages/AuthorizePage/AuthorizePage';
import { SignUpPage } from '../../pages/SignUpPage/SignUpPage';
import { Page404 } from '../../pages/Page404/Page404';
import { SupportPage } from '../../pages/SupportPage/SupportPage';

export function Router() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<MainPage />} />
              <Route path=':id' element={<FilmPage />}/>
              <Route path='/trends' element={<TrendsPage />}/>
              <Route path='/favourites' element={<FavouritesPage />}/>
              <Route path='/settings' element={<SettingsPage />}/>
              <Route path='/authorize' element={<AuthorizePage />}/>
              <Route path='/signUp' element={<SignUpPage />}/>
              <Route path='/support' element={<SupportPage />}/>
            </Route>
            <Route path='*' element={<Page404 />} />
          </Routes>
        </BrowserRouter>
    );
}