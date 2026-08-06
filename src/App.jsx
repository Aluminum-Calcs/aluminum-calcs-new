import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import PageContextProvider from './context/PageContext.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CalculatorModal from './components/CalculatorModal.jsx';

import Home from './pages/Home.jsx'
import Channels from './pages/Channels.jsx';
import StileCalc from './pages/StileCalc.jsx';
import Cart from './pages/Cart.jsx';
import GlassPrice from './pages/GlassPrice.jsx';
import QuoteBuilder from './pages/Quote.jsx';

import "./assets/fontawesome/css/font-awesome.min.css";
import { HelmetProvider } from 'react-helmet-async';
import StileContextProvider from './context/StileContext.jsx';


function App() {

  return (
    <HelmetProvider>
      <PageContextProvider>
        <BrowserRouter>
          <Header/>
          <CalculatorModal />

          <Routes>
            <Route
              path="/aluminum-calcs-new/"
              element={<Home />}
            />
            <Route
              path="/aluminum-calcs-new/quote-builder"
              element={<QuoteBuilder />}
            />
            <Route
              path="/aluminum-calcs-new/glass-price-calculator"
              element={<GlassPrice />}
            />
            <Route
              path="/aluminum-calcs-new/channels"
              element={<Channels />}
            />
            <Route
              path="/aluminum-calcs-new/stile-calculator"
              element={
                <StileContextProvider>
                  <StileCalc />
                </StileContextProvider>
              }
            />
            <Route
              path="/aluminum-calcs-new/cart"
              element={<Cart />}
            />
          </Routes>

          <Footer/>
        </BrowserRouter>
      </PageContextProvider>
    </HelmetProvider>
  )
}

export default App
