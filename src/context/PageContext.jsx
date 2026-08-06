import { useState, createContext, useEffect } from "react";
import { sel } from '../js/util/methods.js';

export const PageContext = createContext();

export default function PageContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Home");
  const [theme, setTheme] = useState('light-mode')
  const [carts, updatecarts] = useState([]);
  const [calcMode, setCalcMode] = useState('hide');

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
