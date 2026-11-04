import { useState, createContext, useEffect, useLayoutEffect } from "react";
import { sel } from '../js/util/methods.js';

export const PageContext = createContext();

const THEME_KEY = 'aluminum-calcs-theme';
const USER_KEY = 'aluminum-calcs-user';

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable or full; fail silently
  }
}

function getInitialTheme() {
  const saved = readStorage(THEME_KEY, null);
  if (saved === 'light-mode' || saved === 'dark-mode') return saved;

  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark-mode' : 'light-mode';
}

function getInitialUser() {
  const saved = readStorage(USER_KEY, null);
  return {
    name: typeof saved?.name === 'string' ? saved.name : '',
    password: '', // intentionally never persisted
  };
}

export default function PageContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Home");

  const [theme, setTheme] = useState(getInitialTheme);

  const [carts, updateCarts] = useState([]);
  const [calcMode, setCalcMode] = useState('hide');

  const [preferences, setPreferences] = useState({
    includeHeader: true,
    includeAside: true,
    includeFooter: true,
  });

  const [user, setUser] = useState(getInitialUser);

  const [formSteps, setFormSteps] = useState([]);

  function handleUser(key, value) {
    setUser(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  useLayoutEffect(() => {
    setPageTheme(theme);
    writeStorage(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    writeStorage(USER_KEY, { name: user.name });
  }, [user.name]);

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,

        carts,
        updateCarts,
        calcMode,
        setCalcMode,

        theme,
        setTheme,
        preferences,
        setPreferences,
        user,
        setUser,
        handleUser,

        formSteps,
        setFormSteps,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

function setPageTheme(theme) {
  const html = sel('html');
  html.classList.remove('light-mode', 'dark-mode');
  html.classList.add(theme);
}