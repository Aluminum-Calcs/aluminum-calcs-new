import { useState, useContext } from "react";
import { PageContext } from "../context/PageContext.jsx";
import "../scss/components/Header.scss";
import { NavLink } from "react-router";
import { Helmet } from "react-helmet-async";
import iconSun from "../assets/images/svgs/icon-sun.svg";
import iconMoon from "../assets/images/svgs/icon-moon.svg";

// `status.selectors` are the modifier classes (e.g. "status--draft").
// The base "status" class is added automatically when rendering.
const navLinks = [
  { to: "/", label: "Dashboard", icon: "fa fa-home", end: true },
  { to: "/quote-builder", label: "Quote Builder", icon: "fa fa-magic" },
  {
    to: "/glass-price-calculator",
    label: "Glass Price Calculator",
    icon: "icon-square",
  },
  {
    to: "/sheet-optimizer",
    label: "Sheet Optimizer",
    icon: "fa fa-object-group",
    status: { text: "New", selectors: ["status--approved"] },
  },
  {
    to: "/stile-calculator",
    label: "Profile / Stile Calc",
    icon: "fa fa-columns",
  },
  {
    to: "/channels",
    label: "Channels and Uses",
    icon: "fa fa-bars",
  },
  {
    to: "/sales",
    label: "Sales",
    icon: "fa fa-money",
    status: { text: "Draft", selectors: ["status--draft"] },
  },
  {
    to: "/materials",
    label: "Materials / Inventory",
    icon: "fa fa-tags",
    status: { text: "Draft", selectors: ["status--draft"] },
  },
  {
    to: "/quotes",
    label: "Quotes",
    icon: "fa fa-file-text-o",
    status: { text: "Draft", selectors: ["status--draft"] },
  },
  {
    to: "/clients",
    label: "Clients",
    icon: "fa fa-users",
    status: { text: "Draft", selectors: ["status--draft"] },
  },
  { to: "/settings", label: "Settings", icon: "fa fa-gear" },
  {
    to: "/help-support",
    label: "Help and support",
    icon: "fa fa-question-circle",
  },
  {
    to: "/sign-in",
    label: "Sign in",
    icon: "fa fa-sign-in",
    status: { text: "Soon", selectors: ["status--pending"] },
  },
];

export default function Header() {
  const [navState, setNavState] = useState("closed");
  const { currentPage, setCalcMode, theme, setTheme, preferences } =
    useContext(PageContext);

  const nextTheme = theme === "light-mode" ? "dark-mode" : "light-mode";
  const nextThemeLabel = nextTheme.replace("-", " ");

  const handleNavState = () => {
    setNavState((prev) => (prev === "open" ? "closed" : "open"));
  };

  const closeNav = () => setNavState("closed");

  const changeTheme = () => setTheme(nextTheme);

  return (
    <>
      <Helmet>
        <title>
          {`Aluminum Calcs${currentPage ? ` | ${currentPage}` : ""}`}
        </title>
      </Helmet>

      {preferences.includeHeader && (
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
                title={`Switch theme to ${nextThemeLabel}`}
                className={`theme-btn ${theme}`}
                onClick={changeTheme}
              >
                <img src={iconSun} className="icon-sun" alt="icon sun" />
                <img src={iconMoon} className="icon-moon" alt="icon moon" />
              </button>
              {preferences.includeAside && (
                <button
                  title="Open navigation menu"
                  className={`${navState} hamburger`}
                  onClick={handleNavState}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {preferences.includeAside && (
        <aside className={`${navState}`}>
          <nav>
            <ul>
              {navLinks.map(({ to, label, icon, end, status }) => (
                <li key={to}>
                  <NavLink onClick={closeNav} to={to} end={end}>
                    <i className={icon} aria-hidden="true"></i>
                    {label}
                    {status && (
                      <span
                        className={["status", ...status.selectors].join(" ")}
                      >
                        {status.text}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="use">
            <button className={`${theme}`} onClick={changeTheme}>
              <img src={iconSun} className="icon-sun" alt="icon sun" />
              <img src={iconMoon} className="icon-moon" alt="icon moon" />
              {nextThemeLabel}
            </button>
            <button
              className="calc-trigger"
              type="button"
              onClick={() => setCalcMode("show")}
            >
              <i className="fa fa-calculator" aria-hidden="true"></i>
              Calculator
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
