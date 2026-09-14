import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../scss/pages/Home.scss";
import { PageContext } from "../context/PageContext.jsx";
import { Greeting } from "../components/Greeting.jsx";

import quoteSvg from '../assets/images/svgs/quote.svg';
import glassSvg from '../assets/images/svgs/glass.svg';
import transom from '../assets/images/svgs/transom.svg';
import lockStile from '../assets/images/svgs/lock-stile.svg';

const tools = [
  {
    title: "Quote Builder",
    description: "Create complete window quotations in minutes with sliding, casement, and frameless options.",
    image: quoteSvg,
    link: "/aluminum-calcs-new/quote-builder",
    cta: "Start New Quote",
    accent: "quote",
  },
  {
    title: "Glass Calculator",
    description: "Map dimensions, glass type, and finish choices to a precise price in seconds.",
    image: glassSvg,
    link: "/aluminum-calcs-new/glass-price-calculator",
    cta: "Calculate Glass",
    accent: "glass",
  },
  {
    title: "Channels",
    description: "Browse aluminum channel references, lengths, and application notes from one workspace.",
    image: transom,
    link: "/aluminum-calcs-new/channels",
    cta: "Explore Channels",
    accent: "channels",
  },
  {
    title: "Profile / Stile Calc",
    description: "Calculate stile and profile dimensions for custom fabrication and cutlists.",
    image: lockStile,
    link: "/aluminum-calcs-new/stile-calculator",
    cta: "Calculate Profiles",
    accent: "stile",
  },
  {
    title: "Cart",
    description: "Review customer items, totals, and saved orders all in one place.",
    image: null,
    icon: "fa fa-shopping-cart",
    link: "/aluminum-calcs-new/cart",
    cta: "View Carts",
    accent: "cart",
  },
];

export default function Home() {
  const { setCurrentPage, user } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage('Make Life Easier');
  }, [setCurrentPage]);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="hero-copy">
            <p className="eyebrow">Workflow dashboard</p>
            <h1>
              <Greeting />
              {user.name && <span>, <span className="special">{user.name}!</span></span>}
            </h1>
            <p className="hero-text">
              Build better estimates, compare material options, and keep every aluminum project moving with fewer delays.
            </p>
            <div className="hero-actions">
              <NavLink to="/aluminum-calcs-new/quote-builder" className="primary-btn">
                <i className="fa fa-magic" aria-hidden="true" /> New quote
              </NavLink>
              <NavLink to="/aluminum-calcs-new/cart" className="secondary-btn">
                <i className="fa fa-shopping-cart" aria-hidden="true" /> View cart
              </NavLink>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-card">
              <span className="mini-label">Focus</span>
              <strong>Window & glass workflow</strong>
            </div>
            <div className="mini-card">
              <span className="mini-label">Tools</span>
              <strong>5 active calculators</strong>
            </div>
            <div className="mini-card highlighted">
              <span className="mini-label">Status</span>
              <strong>Ready for quoting</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-tools">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Quick actions</p>
            <h2>Everything you need to move faster</h2>
          </div>

          <div className="tool-grid">
            {tools.map((tool) => (
              <article key={tool.title} className={`tool-card ${tool.accent}`}>
                <div className="tool-card__icon" aria-hidden="true">
                  {tool.image ? <img src={tool.image} alt="" /> : <i className={tool.icon} />}
                </div>
                <div className="tool-card__content">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <NavLink to={tool.link} className="tool-card__link">
                  {tool.cta} <i className="fa fa-arrow-right" aria-hidden="true" />
                </NavLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}