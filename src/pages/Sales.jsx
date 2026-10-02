import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from '../context/PageContext';

function Sales() {
  const { pathname } = useLocation();
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => { 
    setCurrentPage("Sales")
  }, [pathname]);

  return (
    <main className="sales-page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">Quick Sale</p>
            <h1>Record a <span className="special">sale</span> in seconds.</h1>
            <p className="hero-copy">Quickly add materials sold at the counter, enter quantities and let aluminum-calcs calculate the total for you.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <i className="fa fa-file-text-o" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Sales;