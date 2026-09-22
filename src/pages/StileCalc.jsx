import { useState, useContext, useEffect, Fragment } from "react";
import { useLocation } from 'react-router';

import { PageContext } from "../context/PageContext";
import { StileContext } from "../context/StileContext.jsx";
import { computeResult } from "../js/stile-calc/main.js";
import { validateStileInputs } from "../js/stile-calc/error.js";

import "../scss/pages/StileCalc.scss";
// import "../scss/components/StileTable.scss";

import InputField, {
  DropdownField,
  ImageRadioField,
} from "../components/InputField";
import FormNavi from "../components/FormNavi.jsx";
import CurrentStepHeader from "../components/CurrentStepHeader.jsx";

const options = {
  windowType: [
    { value: "casement-window" },
    { value: "sliding-window" },
    { value: "frameless-window" },
  ],
  sashCount: [{ value: "one" }, { value: "two" }],
};

const initialInputs = {
  windowType: "casement-window",
  sashType: "two",
  width: "400",
  height: "900",
  quantity: "1",
};

function getInitialValues() {
  return { ...initialInputs };
}

function StileCalc() {
  const { setCurrentPage } = useContext(PageContext);
  const { setWindowType, setSashType } = useContext(StileContext);

  const [currentStep, setCurrentStep] = useState(1);
  const { setFormSteps } = useContext(PageContext);
  setFormSteps([0,1,2,3,4])
  const [values, setValues] = useState(getInitialValues);
  const [results, setResults] = useState([]);
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1100px)").matches
  );

  function handleValues(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (id === "windowType") setWindowType(value);
    if (id === "sashType") setSashType(value);
  }

  function handleCompute(event) {
    event?.preventDefault();
    setCurrentStep(currentStep + 1);

    const quantity = Number(values.quantity);
    const validation = validateStileInputs({
      windowType: values.windowType,
      sashes: values.sashType,
      width: values.width,
      height: values.height,
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
      values.windowType,
      values.sashType,
      values.width,
      values.height
    );

    setErrors({});
    setResults(rows);
    setEntries((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${previous.length}`,
        windowType: values.windowType,
        sashType: values.sashType,
        width: values.width,
        height: values.height,
        quantity,
        rows,
      },
    ]);
  }

  function handleNewCalculation() {
    setValues(getInitialValues());
    setResults([]);
    setErrors({});
    setCurrentStep(0);
    setWindowType(initialInputs.windowType);
    setSashType(initialInputs.sashType);
  }

  function clearEntries() {
    setEntries([]);
  }

  const { pathname } = useLocation();
  useEffect(() => {
    setCurrentPage("Stile Calc");
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    const handleViewportChange = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const handleStepSetting = (path) => {
    if (path === "backward") {
      currentStep === 0 ? setCurrentStep(0) : setCurrentStep(currentStep - 1);
    } else {
      currentStep === 4 ? setCurrentStep(4) : setCurrentStep(currentStep + 1);
    }
  };

  const form = (
    <form className="stile-form" onSubmit={handleCompute}>
      <div className="stile-form-heading">
        <p className="section-kicker">Specifications</p>
        <h2>Window details</h2>
        <p>Choose a profile system and enter the finished opening size.</p>
      </div>
      <div className="step-fields">
        <ImageRadioField
          label="Window Type"
          options={options.windowType}
          name="windowType"
          selectedValue={values.windowType}
          onChange={handleValues}
        />
        <DropdownField
          label="No of Sashes"
          options={options.sashCount}
          name="sashType"
          value={values.sashType}
          onChange={handleValues}
        />
        <InputField
          inputType="number"
          id="width"
          label="Overall width"
          value={values.width}
          onChange={handleValues}
          unit="mm"
        />
        <InputField
          inputType="number"
          id="height"
          label="Overall height"
          value={values.height}
          onChange={handleValues}
          unit="mm"
        />
        <InputField
          inputType="number"
          id="quantity"
          label="Quantity"
          value={values.quantity}
          onChange={handleValues}
        />
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="stile-errors">
          {Object.values(errors).map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div className="stile-form-actions">
        <button type="submit">
          <i className="fa fa-calculator"></i> Calculate cuts
        </button>
        <button
          type="button"
          className="secondary"
          onClick={handleNewCalculation}
        >
          <i className="fa fa-refresh"></i> New calculation
        </button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <main className="stileCalc-page desktop">
        <section className="page-header">
          <div className="container header-content">
            <div>
              <p className="eyebrow">Profile planning</p>
              <h1>
                <span className="special">Stile</span> Calculator
              </h1>
              <p>Calculate accurate profile cuts for your window opening.</p>
            </div>
            <button
              className="new-calculation-btn"
              onClick={handleNewCalculation}
            >
              <i className="fa fa-refresh"></i> NEW CALCULATION
            </button>
          </div>
        </section>

        <section className="main-content">
          <div className="container stile-workspace">
            <div className="stile-details">{form}</div>
            <Results
              rows={results}
              quantity={values.quantity}
              windowType={values.windowType}
              sashType={values.sashType}
            />
          </div>
        </section>

        <section className="items-section">
          <div className="container">
            <div className="section-header with-action">
              <div>
                <p className="section-kicker">Saved work</p>
                <h2>Items List</h2>
              </div>
              <button className="clear-all" onClick={clearEntries}>
                <i className="fa fa-trash"></i> CLEAR ALL
              </button>
            </div>
            <ItemsList entries={entries} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="stileCalc-page">
        {currentStep === 0 && (
          <>
            <section className="intro">
              <div className="container">
                <div className="left">
                  <p className="eyebrow">Plan your cut</p>
                  <h1>
                    <span className="special">Stile</span> Calculator
                  </h1>
                  <p>
                    Calculate profile cuts for casement, sliding, and frameless
                    windows.
                  </p>
                  <ul>
                    <li>Glass Details</li>
                    <li>Price Summary</li>
                    <li>Items List</li>
                    <li>Review & Generate</li>
                  </ul>
                </div>
                <div className="right">
                  <i className="fa fa-scissors"></i>
                </div>
              </div>
            </section>
            <FormNavi
              currentStep={currentStep}
              maxSteps={4}
              onBack={() => handleStepSetting("backward")}
              onNext={() => handleStepSetting("forward")}
              forwardText={
                <>
                  Get started<i className="fa fa-chevron-right"></i>
                </>
              }
            />
          </>
        )}

        {currentStep !== 0 && <CurrentStepHeader
          currentStep={currentStep}
          handleStepSetting={handleStepSetting}
        />}

        {currentStep === 1 && (
          <>
            <form className="stile-form" onSubmit={handleCompute}>
              <div className="stile-form-heading">
                <h2>Window details</h2>
                <p>Choose a profile system and enter the finished opening size.</p>
              </div>
              <div className="step-fields">
                <ImageRadioField
                  label="Window Type"
                  options={options.windowType}
                  name="windowType"
                  selectedValue={values.windowType}
                  onChange={handleValues}
                />
                <DropdownField
                  label="No of Sashes"
                  options={options.sashCount}
                  name="sashType"
                  value={values.sashType}
                  onChange={handleValues}
                />
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="stile-errors">
                  {Object.values(errors).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </form>
            <FormNavi
              currentStep={currentStep}
              maxSteps={4}
              onBack={() => handleStepSetting("backward")}
              onNext={handleCompute}
              forwardText={
                <>
                  Calculate <i className="fa fa-chevron-right"></i>
                </>
              }
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <form className="stile-form" onSubmit={handleCompute}>
              <div className="stile-form-heading">
                <p className="section-kicker">Specifications</p>
                <h2>Window details</h2>
                <p>Choose a profile system and enter the finished opening size.</p>
              </div>
              <div className="action-buttons">
                <button type="submit">
                  <i className="fa fa-calculator"></i> Calculate cuts
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={handleNewCalculation}
                >
                  <i className="fa fa-refresh"></i> New calculation
                </button>
              </div>
              <div className="step-fields">
                <InputField
                  inputType="number"
                  id="width"
                  label="Overall width"
                  value={values.width}
                  onChange={handleValues}
                  unit="mm"
                />
                <InputField
                  inputType="number"
                  id="height"
                  label="Overall height"
                  value={values.height}
                  onChange={handleValues}
                  unit="mm"
                />
                <InputField
                  inputType="number"
                  id="quantity"
                  label="Quantity"
                  value={values.quantity}
                  onChange={handleValues}
                  unit="windows"
                />
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="stile-errors">
                  {Object.values(errors).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </form>
            <FormNavi
              currentStep={currentStep}
              onBack={()=> handleStepSetting('backward')}
              onNext={() => handleStepSetting('forward')}
              forwardText={<>Calculate <i className="fa fa-chevr"></i></>}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <Results
              rows={results}
              quantity={values.quantity}
              windowType={values.windowType}
              sashType={values.sashType}
            />
            <FormNavi
              currentStep={currentStep}
              onBack={()=> handleStepSetting('backward')}
              onNext={() => handleStepSetting('forward')}
              forwardText={<>Add to Quote <i className="fa fa-chevr"></i></>}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <ItemsList entries={entries} />
            <FormNavi
              currentStep={currentStep}
              maxSteps={4}
              onBack={() => handleStepSetting("backward")}
              onNext={() => handleStepSetting("forward")}
            />
          </>
        )}
      </main>
    </>
  );
}

function Results({ rows, quantity, windowType, sashType }) {
  const total = rows.reduce(
    (sum, row) =>
      sum +
      (Number(row.price) || 0) *
        (Number(row.qty) || 1) *
        (Number(quantity) || 1),
    0
  );

  return (
    <section className="stile-results">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Output</p>
            <h2>Current Calculation</h2>
          </div>
          {rows.length > 0 && (
            <span className="result-count">{rows.length} cuts</span>
          )}
        </div>
        {rows && rows.length > 0 ? (
          <>
            <div className="summary">
              <span>
                {windowType.replace("-window", "")} / {sashType} sash
              </span>
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
    <div className="table-wrapper">

      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Channel</th>
            <th>Length (mm)</th>
            <th>Line total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{row.label}</td>
              <td>{row.value}</td>
              <td>
                {row.price == null
                  ? "--"
                  : formatCurrency(
                      (Number(row.price) || 0) *
                        (Number(row.qty) || 1) *
                        (Number(quantity) || 1)
                    )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td colSpan={3}>{formatCurrency(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}


function ItemsList({ entries }) {
  return (
    <section className="stile-items">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Saved work</p>
            <h2>Items List</h2>
          </div>
          <span className="result-count">
            {entries.length} {entries.length === 1 ? "item" : "items"}
          </span>
        </div>
        {entries.length === 0 ? (
          <div className="empty">
            <i className="fa fa-list"></i>
            <p>No saved calculations</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Window</th>
                  <th>Size</th>
                  <th>Sashes</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id}>
                    <td>{i+1}.</td>
                    <td>{entry.windowType.replace("-window", "")}</td>
                    <td>
                      {entry.width} x {entry.height} mm
                    </td>
                    <td>{entry.sashType}</td>
                    <td>{entry.quantity}</td>
                    <td>
                      {formatCurrency(
                        entry.rows.reduce(
                          (sum, row) =>
                            sum +
                            (Number(row.price) || 0) *
                              (Number(row.qty) || 1) *
                              entry.quantity,
                          0
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default StileCalc;
