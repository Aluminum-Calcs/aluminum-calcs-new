import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../scss/pages/Home.scss";
import { Helmet } from "react-helmet-async";
import { PageContext } from "../context/PageContext.jsx";
import { Greeting } from "../components/Greeting.jsx";

import quoteSvg from '../assets/images/svgs/quote.svg';
import glassSvg from '../assets/images/svgs/glass.svg';
import transom from '../assets/images/svgs/transom.svg';
import lockStile from '../assets/images/svgs/lock-stile.svg';

export default function Home() {
  const { setCurrentPage } = useContext(PageContext)
  useEffect(() => {
    setCurrentPage('Make Life Easier');
  }, []);
  let name = 'Ehi';

  return (
    <>
      <main className="home">
        <section className="hero">
          <div className="container">
            <h1><Greeting />{name && <span>, <span className="special">{name}!</span></span>}</h1>
            
            <p>Enjoy the variety of tools here to create windows, calculate dimensions and efficiently manage your business.</p>
          </div>
        </section>

        <section className="tools">
          <div className="container">
            <h2>Quick Actions</h2>
            <div className="cards">
              <div className="card quote">
                <div className="card__img">
                  <img src={quoteSvg} alt="img" />
                </div>
                <h3>Quote Builder</h3>
                <p>Create complete window quotations in minutes (sliding, casement, frameless).</p>
                <NavLink to="/aluminum-calcs-new/quote-builder" className="btn">Start New Quote</NavLink>
              </div>
              <div className="card glass">
                <div className="card__img">
                  <img src={glassSvg} alt="img" />
                </div>
                <h3>Glass Calculator</h3>
                <p>Calculate glass price bassed on dimensions, thickness and colors.</p>
                <NavLink to="/aluminum-calcs-new/glass-price-calculator" className="btn">Calculate Glass</NavLink>
              </div>
              <div className="card channels">
                <div className="card__img">
                  <img src={transom} alt="img" />
                </div>
                <h3>Channels</h3>
                <p>View Aluminum channels reference, lengths, and applications.</p>
                <NavLink to="/aluminum-calcs-new/channels" className="btn">Explore Channels</NavLink>
              </div>
              <div className="card">
                <div className="card__img">
                  <img src={lockStile} alt="img" />
                </div>
                <h3>Profile/Stile Calc</h3>
                <p>Calculate the dimensions of stiles based on the type of stile and the dimensions of the window</p>
                <NavLink to="/aluminum-calcs-new/stile-calculator" className="btn">Calculate Profiles</NavLink>
              </div>
              <div className="card cart">
                <div className="card__img">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <h3>Cart</h3>
                <p>View, tabulate and calculate your customer cart and manage your customer orders</p>
                <NavLink to="/aluminum-calcs-new/cart" className="btn">View Carts</NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}