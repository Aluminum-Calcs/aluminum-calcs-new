import { useState, useEffect, useContext } from "react";
import { PageContext } from "../context/PageContext.jsx";
import "../scss/components/Header.scss";
import { NavLink } from "react-router";
import { Helmet } from "react-helmet-async";
import iconSun from '../assets/images/svgs/icon-sun.svg';
import iconMoon from '../assets/images/svgs/icon-moon.svg';
import siteLogo from '../assets/images/svgs/lock-stile-green.svg';

export default function Header() {
  const [navState, setNavState] = useState('closed');
  const { currentPage, setCalcMode } = useContext(PageContext);
  const [title, setTitle] = useState('');
  const { theme, setTheme } = useContext(PageContext);

  useEffect(() => {
    setTitle(currentPage);
  }, [currentPage]);

  const handleNavState= ()=> {
    navState == 'open'
      ? setNavState('closed')
      : setNavState('open');
    console.log(navState);
  }

  const changeTheme = () => {
    theme == 'light-mode'
      ? setTheme('dark-mode')
      : setTheme('light-mode');
  }

  return (<>
    <Helmet>
      <title>
        {`Aluminum Calcs | ${title && title}`}
      </title>
    </Helmet>
    
    <header className="page-header">
      <div className="wrapper">
        <div className="logo">
          {/* <img src={siteLogo}alt='site logo'/> */}
          <div className="logo__text">
            <h2>Aluminum Calc</h2>
            <span>{currentPage}</span>
          </div>
        </div>
          
        <div className="quick-btns">
          <button
            title={`Switch theme to ${theme.replace('-',' ')}`}
            className={`theme-btn ${theme}`}
            onClick={changeTheme}>
            <img src={iconSun} className='icon-sun' alt="icon sun" />
            <img src={iconMoon} className='icon-moon' alt="icon moon" />
          </button>
          <button
            title="Open navigation menu"
            className={`${navState} hamburger`} onClick={handleNavState}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
          
      </div>
    </header>

    <aside className={`${navState}`}>
      <nav>    
        <ul>
          <li>
            <NavLink to="/aluminum-calcs-new/">
              <i className="fa fa-home"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/quote-builder">
              <i className="fa fa-magic"></i>
              Quote Builder
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/glass-price-calculator">
              <i className="fa fa-simplybuilt"></i>
              Glass Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/stile-calculator">
              <i className="fa fa-slack"></i>
              Profile / Stile Calc
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/channels">
              <i className="fa fa-columns"></i>
              Channels
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/cart">
              <i className="fa fa-shopping-cart"></i>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/quotes">
              <i className="fa fa-circle-o"></i>
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/clients">
              <i className="fa fa-btc"></i>
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/settings">
              <i className="fa fa-gear"></i>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/aluminum-calcs-new/settings">
              <i className="fa fa-frown-o"></i>
              Help and support
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="use">
        <button>
          <i className="fa fa-adjust"></i>
          Light Mode
        </button>
        <button
          className="calc-trigger"
          type="button"
          onClick={() => setCalcMode('show')}
        >
          <i className="fa fa-calculator" aria-hidden="true"></i>
          Calculator
        </button>
      </div>
    </aside>
  </>)
}

