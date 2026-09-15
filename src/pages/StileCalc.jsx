import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { PageContext } from "../context/PageContext";
import { StileContext } from "../context/StileContext.jsx";
import { computeResult } from "../js/stile-calc/main.js";
import { validateStileInputs } from "../js/stile-calc/error.js";

import "../scss/pages/StileCalc.scss";
import "../scss/components/StileTable.scss";

import InputField from "../components/InputField";
import { RadioField } from "../components/InputField.jsx";

const options = {
  windowType: [
    { value: 'casement-window' },
    { value: 'sliding-window' },
    { value: 'frameless-window' },
  ],
  sashCount: [
    { value: 'one' },
    { value: 'two' },
  ],
};

const initialInputs = {
  width: "400",
  height: "900",
  quantity: "1",
};

function getInitialInputs() {
  return { ...initialInputs };
}

function StileCalc() {
  const { setCurrentPage } = useContext(PageContext);
  const { windowType, setWindowType, sashType, setSashType } = useContext(StileContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState(getInitialInputs);
  const [results, setResults] = useState([]);
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(min-width: 1100px)").matches
  ));

  function handleInputChange(id, value) {
    setInputs((prev) => ({ ...prev, [id]: value }));
  }

  function handleCompute(event) {
    event.preventDefault();

    const quantity = Number(inputs.quantity);
    const validation = validateStileInputs({
      windowType,
      sashes: sashType,
      width: inputs.width,
      height: inputs.height,
    });

    if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
      validation.errors.quantity = "Enter a whole quantity of at least 1.";
    }

    if (!validation.isValid || Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors);
      setResults([]);
      return;
    }

    const rows = computeResult(
      "all",
      windowType,
      sashType,
      inputs.width,
      inputs.height
    );

    setErrors({});
    setResults(rows);
    setEntries((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${previous.length}`,
        windowType,
        sashType,
        width: inputs.width,
        height: inputs.height,
        quantity,
        rows,
      },
    ]);
  }

  function handleNewCalculation() {
    setInputs(getInitialInputs());
    setResults([]);
    setErrors({});
    setCurrentStep(0);
    setWindowType("casement-window");
    setSashType("two");
  }

  function clearEntries() {
    setEntries([]);
  }

  useEffect(() => {
    setCurrentPage('Stile Calc');
  }, [setCurrentPage]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    const handleViewportChange = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>Aluminum Calcs | Stile Calc</title>
      </Helmet>
      <main className={`stileCalc-page ${isDesktop ? "desktop" : ""}`}>
        <section className="stile-intro">
          <div className="container">
            <div>
              <h1><span className="special">Stile</span> Calculator</h1>
              <p>Calculate profile cuts for casement, sliding, and frameless windows.</p>
            </div>
            <div className="stile-actions">
              <button type="button" onClick={handleNewCalculation}>
                <i className="fa fa-refresh"></i> NEW CALCULATION
              </button>
              <button type="button" onClick={clearEntries}>
                <i className="fa fa-trash"></i> CLEAR ITEMS
              </button>
            </div>
          </div>
        </section>

        <section className="stile-workspace">
          <div className="stile-form-panel">
            <div className="section-header"><h2>Window Details</h2></div>
            <form onSubmit={handleCompute}>
              <div className="step-fields">
                {(isDesktop || currentStep === 0) && <RadioField
                  id="window-type"
                  classNames={["windowType"]}
                  options={options.windowType}
                  name="type"
                  selectedValue={windowType}
                  onChange={setWindowType}
                />}
                {errors.windowType && <div className="field-error">{errors.windowType}</div>}

                {(isDesktop || currentStep === 1) && <RadioField
                  id="panels/sash"
                  classNames={["sash-field"]}
                  options={options.sashCount}
                  name="sash"
                  selectedValue={sashType}
                  onChange={setSashType}
                />}
                {errors.sashes && <div className="field-error">{errors.sashes}</div>}

                {(isDesktop || currentStep === 2) && <>
                  <InputField id="width" inputType="number" value={inputs.width}
                    onChange={(value) => handleInputChange("width", value)} />
                  {errors.width && <div className="field-error">{errors.width}</div>}
                </>}

                {(isDesktop || currentStep === 3) && <>
                  <InputField id="height" inputType="number" value={inputs.height}
                    onChange={(value) => handleInputChange("height", value)} />
                  {errors.height && <div className="field-error">{errors.height}</div>}
                  <InputField id="quantity" inputType="number" value={inputs.quantity}
                    onChange={(value) => handleInputChange("quantity", value)} />
                  {errors.quantity && <div className="field-error">{errors.quantity}</div>}
                </>}
              </div>
              <div className="stile-form-actions">
                {!isDesktop && <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
                  <i className="fa fa-arrow-left"></i> BACK
                </button>}
                {!isDesktop && currentStep < 3 && <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                  NEXT <i className="fa fa-arrow-right"></i>
                </button>}
                {(isDesktop || currentStep === 3) && <button id="compute" type="submit">
                  <i className="fa fa-calculator"></i> CALCULATE
                </button>}
              </div>
            </form>
          </div>

          <Results rows={results} quantity={inputs.quantity} windowType={windowType} sashType={sashType} />
        </section>

        <ItemsList entries={entries} />
      </main>
    </>
  );
}

function Results({ rows, quantity, windowType, sashType }) {
  const total = rows.reduce((sum, row) => sum + ((Number(row.price) || 0) * (Number(row.qty) || 1) * (Number(quantity) || 1)), 0);

  return (
    <section className="stile-results">
      <div className="results-content">
        <div className="section-header">
          <div>
            <p className="section-kicker">Output</p>
            <h2>Current Calculation</h2>
          </div>
          {rows.length > 0 && <span className="result-count">{rows.length} cuts</span>}
        </div>
        {rows && rows.length > 0 ? (
          <>
            <div className="result-summary">
              <span>{windowType.replace("-window", "")} / {sashType} sash</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <Table rows={rows} quantity={quantity} total={total} />
          </>
        ) : (
          <div className="results-empty">
            <i className="fa fa-table"></i>
            <p>No calculation yet</p>
            <span>Enter the window details to see the cut list.</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Table({ rows, quantity, total }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Length (mm)</th>
          <th>Line total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.label}</td>
            <td>{row.value}</td>
            <td>{row.price == null ? "--" : formatCurrency((Number(row.price) || 0) * (Number(row.qty) || 1) * (Number(quantity) || 1))}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td colSpan={2}>{formatCurrency(total)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

function ItemsList({ entries }) {
  return (
    <section className="stile-items">
      <div className="section-header">
        <div>
          <p className="section-kicker">Saved work</p>
          <h2>Items List</h2>
        </div>
        <span className="result-count">{entries.length} {entries.length === 1 ? "item" : "items"}</span>
      </div>
      {entries.length === 0 ? (
        <div className="items-empty"><i className="fa fa-list"></i><p>No saved calculations</p></div>
      ) : (
        <div className="items-table-wrap">
          <table>
            <thead><tr><th>Window</th><th>Size</th><th>Sashes</th><th>Qty</th><th>Total</th></tr></thead>
            <tbody>{entries.map((entry) => <tr key={entry.id}>
              <td>{entry.windowType.replace("-window", "")}</td>
              <td>{entry.width} x {entry.height} mm</td>
              <td>{entry.sashType}</td>
              <td>{entry.quantity}</td>
              <td>{formatCurrency(entry.rows.reduce((sum, row) => sum + ((Number(row.price) || 0) * (Number(row.qty) || 1) * entry.quantity), 0))}</td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

export default StileCalc;