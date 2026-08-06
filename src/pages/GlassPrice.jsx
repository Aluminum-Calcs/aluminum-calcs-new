import { useState, useContext, useEffect, useRef } from "react";
import { PageContext } from "../context/PageContext";

import "../scss/components/Form.scss";
import "../scss/pages/GlassPrice.scss";

import InputField from "../components/InputField.jsx";
import { initGlassPriceCalculator } from "../js/glass-price/controller.js";
import GlassResultsTable from "../components/GlassResultsTable.jsx";

export default function GlassPrice() {
  const { setCurrentPage } = useContext(PageContext);
  const [entries, setEntries] = useState([]);
  const [feedback, setFeedback] = useState("No previous entries");
  const controllerRef = useRef(null);

  useEffect(() => {
    setCurrentPage("Glass Price Calc");
  }, [setCurrentPage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    controllerRef.current = initGlassPriceCalculator({
      onEntriesChange: setEntries,
      onFeedbackChange: setFeedback,
    });

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  return (
    <main className="glass-price-page">
      <section className="form">
        <div className="container glass-price-form">
          <InputField id="width" val="400" />
          <InputField id="height" val="900" />
          <InputField id="quantity" val="1" />
          <InputField
            id="fullsheet-price"
            val="90000"
            msgType="static"
            msg="Default price is ₦90,000"
          />

          <div className="btns">
            <button type="button" className="calculate">
              Calculate
            </button>
            <button type="button" className="addToTable">
              <i className="fa fa-table"></i>
              Add to <b>Table</b>
            </button>
            <button type="button" className="addToCart">
              <i className="fa fa-cart-plus"></i>
              Add to <b>Cart</b>
            </button>
            <button type="button" className="reset">
              Reset
            </button>
          </div>

          {/* <p className="glass-price-feedback">{feedback}</p> */}
        </div>
      </section>

      <GlassPriceResults entries={entries} ans={feedback}/>
    </main>
  );
}

export function GlassPriceResults({
  entries = [],
  ans = "No previous entries"
}) {
  useEffect(()=>console.log(entries, ans), [entries, ans])
  return (
    <section className="results">
      <div className="container">
        <div className="results__current">
          <p className="glass-price-feedback">
            Glass Price for: <b>{ans.size}</b>
          </p>
          <h1>{ans.price}</h1>
        </div>

        {/* <div className="results__table">
          {/* <div className="head">
            <h2 className="title">Tabulated</h2>
            <div className="tools">
              <button><i className="fa fa-cart-plus"></i></button>
            </div>
          </div> }
          {entries.length}
          <GlassResultsTable/>
        </div> */}

        {entries.length ? (
          <div className="results__table">
            <GlassResultsTable entries={entries}/>
          </div>
        ) : (
          <div className="results__empty">
            <i className="fa fa-table"></i>
            <p>No previous entries</p>
          </div>
        )}
      </div>
    </section>
  );
}