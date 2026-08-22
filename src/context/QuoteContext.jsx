import { useState, createContext } from 'react';

export const QuoteContext = createContext();

export function QuoteContextProvider({children}) {
  const [isSaveDraftVisible, setSaveDraftVisibility] = useState(false); // closed

  return <QuoteContext.Provider value={{
    isSaveDraftVisible,
    setSaveDraftVisibility,
  }}>
    {children}
  </QuoteContext.Provider>;
}