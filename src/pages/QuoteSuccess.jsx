import { useContext, useEffect } from "react";
import { NavLink } from "react-router";
import { PageContext } from "../context/PageContext.jsx";
import "../scss/pages/QuoteSuccess.scss";

export default function QuoteSuccess() {
  const { setCurrentPage } = useContext(PageContext);

  useEffect(() => {
    setCurrentPage("Quote Added");
  }, [setCurrentPage]);

  return (
    <main className="quote-success">
      <section className="container">
        <i className="fa fa-check-circle" aria-hidden="true"></i>
        <h1>Quote added to cart</h1>
        <p>Your window quotation has been saved and is ready for review.</p>
        <div className="actions">
          <NavLink className="primary" to="/aluminum-calcs-new/cart">View cart</NavLink>
          <NavLink className="secondary" to="/aluminum-calcs-new/quote-builder">Create another quote</NavLink>
        </div>
      </section>
    </main>
  );
}