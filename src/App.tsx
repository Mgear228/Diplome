import './App.css'
import { Router } from './components/Router/Router';
import { ThemeContext, useInitThemeContext } from './context/ThemeContext/ThemeContext';
import { UserContext, useInitUserContext } from './context/UserContext/UserContext';

function App() {
  const theme = useInitThemeContext();
  const user = useInitUserContext();

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <Router />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App
