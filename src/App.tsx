import { useEffect } from 'react';
import './App.css'
import { Router } from './components/Router/Router';
import { ThemeContext, useInitThemeContext} from './context/ThemeContext';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { refreshingToken } from './redux/user/user';

function App() {
  const theme = useInitThemeContext();
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.user.refreshToken);

  useEffect(() => {
    const refresh = localStorage.getItem('token');

    setInterval(() => {
      if(!refresh) return;
      dispatch(refreshingToken({refresh}))
    },4500);
  }, [token]);

  return (
    <ThemeContext.Provider value={theme}>
      <Router />
    </ThemeContext.Provider>
  );
}

export default App
