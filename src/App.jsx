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
import QuoteSuccess from './pages/QuoteSuccess.jsx';
import Clients from './pages/Clients.jsx';
import Quotes from './pages/Quotes.jsx';
import HelpSupport from './pages/HelpSupport.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import "./assets/fontawesome/css/font-awesome.min.css";
import { HelmetProvider } from 'react-helmet-async';
import StileContextProvider from './context/StileContext.jsx';
import { QuoteContextProvider } from './context/QuoteContext.jsx';
import SignIn from './pages/SignIn.jsx';
import Settings from './pages/Settings.jsx';


function App() {
  return (
    <HelmetProvider>
      <PageContextProvider>
        <BrowserRouter>
          <Header/>
          <CalculatorModal />
          <ScrollToTop/>

          <Routes>
            <Route
              path="/aluminum-calcs-new/"
              element={<Home />}
            />
            <Route
              path="/aluminum-calcs-new/sign-in"
              element={<SignIn/>}
            />
            <Route
              path="/aluminum-calcs-new/settings"
              element={<Settings/>}
            />
            <Route
              path="/aluminum-calcs-new/quote-builder"
              element={
                <QuoteContextProvider>
                  <QuoteBuilder/>
                </QuoteContextProvider>
              }
            >
            </Route>
            <Route
              path="/aluminum-calcs-new/quote-success"
              element={<QuoteSuccess />}
            />
            <Route
              path="/aluminum-calcs-new/quotes"
              element={<Quotes />}
            />
            <Route
              path="/aluminum-calcs-new/clients"
              element={<Clients />}
            />
            <Route
              path="/aluminum-calcs-new/help-support"
              element={<HelpSupport />}
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
            <Route
              path="/aluminum-calcs-new/clients"
              element={<Clients />}
            />
          </Routes>

          <Footer/>
        </BrowserRouter>
      </PageContextProvider>
    </HelmetProvider>
  )
}

export default App
