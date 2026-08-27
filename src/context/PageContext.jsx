import { useState, createContext, useEffect } from "react";
import { sel } from '../js/util/methods.js';

export const PageContext = createContext();

export default function PageContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Home");

  const [theme, setTheme] = useState('light-mode')

  const [carts, updateCarts] = useState([]);
  const [calcMode, setCalcMode] = useState('hide');

  const [preferences, setPreferences] = useState({
    includeHeader: true,
    includeAside: true,
    includeFooter: true,
  });

  const [user, setUser] = useState({
    name: 'Ehi',
    password: '',
  });

  function handleUser(key, value) {
    setUser(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    setPageTheme(theme);
  }, [theme]);

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        carts,
        calcMode,
        setCalcMode,
        theme,
        setTheme,
        preferences,
        setPreferences,
        user,
        setUser,
        handleUser,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

function setPageTheme(theme) {
  let html = sel('html');
  html.classList.remove('light-mode', 'dark-mode');
  html.classList.add(theme);
}
