import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { PageContext } from "../context/PageContext";

import "../scss/pages/GlassPrice.scss";
import "../scss/components/FormNavi.scss";

import { initGlassPriceCalculator } from "../js/glass-price/controller.js";
import GlassResultsTable from "../components/GlassResultsTable.jsx";
import InputField, { DropdownField } from "../components/InputField.jsx";

let options = {
  glassType: [
    {value: "clear", label: "Clear"},
    {value: "frosted", label: "Frosted"},
    {value: "tinted", label: "Tinted"},
    {value: "laminated", label: "Laminated"},
  ],
  thickness: [
    {value: "4", label: "4mm"},
    {value: "5", label: "5mm"},
    {value: "6", label: "6mm"},
  ],
}

export default function GlassPrice() {
  const { setCurrentPage } = useContext(PageContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    glassType: "",
    thickness: "",
    length: 900,
    width: 500,
    quantity: 1,
    allowance: 2,
  });
  const controllerRef = useRef(null);

  useEffect(() => {
    setCurrentPage("Glass Price Calc");
  }, [setCurrentPage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
  }, []);

  const handleValues = (property, value) => {
    setValues((prev) => ({ ...prev, [property]: value }));
  };

  const handleNewCalculation = () => {
    setValues({
      glassType: "",
      thickness: "",
      length: "",
      width: "",
      quantity: 1,
      allowance: "",
    });
    setFeedback({});
    if (controllerRef.current?.reset) {
      controllerRef.current.reset();
    }
  };

  const handleStepSetting = (path) => {
    if (path === "backward") {
      currentStep === 0 ? setCurrentStep(0) : setCurrentStep(currentStep - 1);
    } else {
      currentStep === 4 ? setCurrentStep(4) : setCurrentStep(currentStep + 1);
    }
  };

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1100;

  // Desktop view
  if (isDesktop) {
    return (
      <main className="glass-price-page desktop">
        <section className="page-header">
          <div className="container">
            <div className="header-content">
              <div className="title-section">
                <h1><span className="special">Glass Price</span> Calculator</h1>
                <p>Calculate glass pricing instantly with precision</p>
              </div>
              <button className="new-calculation-btn" onClick={handleNewCalculation}>
                <i className="fa fa-refresh"></i> NEW CALCULATION
              </button>
            </div>
          </div>
        </section>

        <section className="main-content">
          <div className="container">
            <div className="content-grid">
              <div className="glass-details">
                <div className="section-header">
                  <h2>Glass Details</h2>
                </div>
                <GlassDetailsForm values={values} onChange={handlevalues} />
              </div>

              <div className="price-summary">
                <div className="section-header">
                  <h2>Price Summary</h2>
                </div>
                <PriceSummaryCard feedback={feedback} />
              </div>
            </div>
          </div>
        </section>

        <section className="items-section">
          <div className="container">
            <div className="section-header with-action">
              <h2>Items List</h2>
              <button className="clear-all">
                <i className="fa fa-trash"></i> CLEAR ALL
              </button>
            </div>
            <ItemsListTable entries={entries} />
          </div>
        </section>

        <NoteSection />
      </main>
    );
  }

  // Mobile multi-step view
  return (
    <main className="glass-price-page">
      <currentStepHeader currentStep={currentStep} />

      {currentStep === 0 && (
        <section className="intro">
          <div className="container">
            <div className="left">
              <h1>
                <span className="special">Glass Price</span> Calculator
              </h1>
              <p>Calculate glass pricing instantly with precision.</p>
              <ul>
                <li>Glass Details</li>
                <li>Price Summary</li>
                <li>Items List</li>
                <li>Review & Generate</li>
              </ul>
            </div>
            <div className="right">
              <div className="illustration-placeholder">
                <i className="fa fa-calculator"></i>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentStep === 1 && (
        <>
          <CurrentStepHeader currentStep={currentStep}/>
          <form className="quote-form">
            <div className="container">
              <div>
                <h2>Glass Details</h2>
                <p>Enter glass specifications and measurements.</p>
              </div>
              <GlassDetailsForm values={values} onChange={handleValues} />
            </div>
          </form>
        </>
      )}

      {currentStep === 2 && (
        <section className="mobile-price-summary">
          <div className="container">
            <div>
              <h2>Price Summary</h2>
              <p>Review your calculated price and details.</p>
            </div>
            <PriceSummaryCard feedback={feedback} />
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="mobile-items-list">
          <div className="container">
            <div>
              <h2>Items List</h2>
              <p>Review all calculated items.</p>
            </div>
            <ItemsListTable entries={entries} />
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="mobile-review">
          <div className="container">
            <div>
              <h2>Review & Generate</h2>
              <p>Complete your quote and generate a summary.</p>
            </div>
            <ReviewSummary entries={entries} feedback={feedback} />
          </div>
        </section>
      )}

      <FormNavi
        currentStep={currentStep}
        maxSteps={4}
        onBack={() => handleStepSetting("backward")}
        onNext={() => handleStepSetting("forward")}
        backwardText={<><i className="fa fa-chevron-left"></i>Back</>}
        forwardText={<>Next<i className="fa fa-chevron-right"></i></>}
      />

      <NoteSection />
    </main>
  );
}

function GlassDetailsForm({ values, onChange }) {
  return (
    <div className="glass-details-form">
      <DropdownField
        label="Glass Type"
        id="glass-type"
        name="glassType"
        options={options.glassType}
        value={values.glassType}
        onChange={onChange}
      />

      <DropdownField
        label="Thickness (MM)"
        id="thickness"
        name="thickness"
        options={options.thickness}
        value={values.thickness}
        onChange={onChange}
      />

      <InputField
        inputType="number"
        id="length"
        name="length"
        label="Length"
        value={values.length}
        onChange={onChange}
        unit="mm"
      />

      <InputField
        inputType="number"
        id="width"
        name="width"
        label="Width"
        value={values.width}
        onChange={onChange}
        unit="mm"
        placeholder="Enter width"
      />

      <InputField
        inputType="number"
        id="quantity"
        name="quantity"
        label="Quantity"
        value={values.quantity}
        onChange={onChange}
        placeholder="Enter quantity"
        unit="pcs"
      />

      <InputField
        inputType="number"
        id="cutting-allowance"
        name="allowance"
        label="Cutting Allowance"
        value={values.allowance}
        onChange={onChange}
        unit="mm"
        placeholder="Enter allowance"
      />

      <button type="button" className="calculate-btn">
        <i className="fa fa-calculator"></i> CALCULATE PRICE
      </button>
    </div>
  );
}

function PriceSummaryCard({ feedback = {} }) {
  const isEmpty = !feedback || !feedback.price;

  if (isEmpty) {
    return (
      <div className="price-summary-empty">
        <i className="fa fa-file-invoice-dollar"></i>
        <p className="empty-title">No calculation yet</p>
        <p className="empty-text">
          Enter glass details and click "Calculate Price" to see the summary.
        </p>
      </div>
    );
  }

  return (
    <div className="price-summary-content">
      <div className="summary-item highlight">
        <span className="label">Total Price</span>
        <span className="value">{feedback.price || "₦0.00"}</span>
      </div>
      <div className="summary-item">
        <span className="label">Total Area</span>
        <span className="value">{feedback.area || "0.00 m²"}</span>
      </div>
      <div className="summary-item">
        <span className="label">Unit Price</span>
        <span className="value">{feedback.unitPrice || "₦0.00"}</span>
      </div>

      <div className="breakdown">
        <div className="breakdown-row">
          <span>Glass Type</span>
          <span>{feedback.type || "-"}</span>
        </div>
        <div className="breakdown-row">
          <span>Thickness</span>
          <span>{feedback.thickness || "-"}</span>
        </div>
        <div className="breakdown-row">
          <span>Total Pieces</span>
          <span>{feedback.quantity || "0"}</span>
        </div>
        <div className="breakdown-row">
          <span>Cutting Allowance</span>
          <span>{feedback.allowance || "0mm"}</span>
        </div>
      </div>

      <button className="add-to-quote-btn">
        <i className="fa fa-cart-plus"></i> ADD TO QUOTE
      </button>
    </div>
  );
}

function ItemsListTable({ entries = [] }) {
  if (!entries.length) {
    return (
      <div className="items-empty">
        <i className="fa fa-briefcase"></i>
        <p className="empty-title">No items added yet</p>
        <p className="empty-text">Add glass details above to build your list.</p>
      </div>
    );
  }

  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Glass Type</th>
          <th>Thickness (MM)</th>
          <th>Size (MM)</th>
          <th>Qty</th>
          <th>Area (m²)</th>
          <th>Unit Price (₦)</th>
          <th>Total (₦)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{entry.type || "-"}</td>
            <td>{entry.thickness || "-"}</td>
            <td>{entry.size || "-"}</td>
            <td>{entry.qty || "0"}</td>
            <td>{entry.area || "0.00"}</td>
            <td>{entry.unitPrice || "₦0.00"}</td>
            <td>{entry.total || "₦0.00"}</td>
            <td>
              <button className="delete-btn" title="Delete">
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ReviewSummary({ entries = [], feedback = {} }) {
  const totalItems = entries.length;
  const totalArea = entries.reduce(
    (sum, e) => sum + (parseFloat(e.area) || 0),
    0
  );
  const subtotal = entries.reduce(
    (sum, e) => sum + (parseFloat(e.total?.replace(/₦|,/g, "")) || 0),
    0
  );

  return (
    <div className="review-summary">
      {entries.length ? (
        <div className="review-content">
          <div className="review-item">
            <span>Total Items</span>
            <span className="value">{totalItems}</span>
          </div>
          <div className="review-item">
            <span>Total Area</span>
            <span className="value">{totalArea.toFixed(2)} m²</span>
          </div>
          <div className="review-item">
            <span>Subtotal</span>
            <span className="value">₦ {subtotal.toLocaleString()}</span>
          </div>
          <div className="review-item highlight">
            <span>Total Price</span>
            <span className="value">₦ {subtotal.toLocaleString()}</span>
          </div>
          <button className="generate-quote-btn">
            <i className="fa fa-download"></i> GENERATE QUOTE
          </button>
        </div>
      ) : (
        <div className="empty-review">
          <i className="fa fa-file-invoice"></i>
          <p>No items to review</p>
          <p>Add items from the previous steps to generate your quote.</p>
        </div>
      )}
    </div>
  );
}

function NoteSection() {
  return (
    <section className="note-section">
      <div className="container">
        <div className="note-header">
          <i className="fa fa-sticky-note"></i>
          <h3>Note</h3>
        </div>
        <ul className="note-list">
          <li>Prices are based on unit price per square meter.</li>
          <li>Cutting allowance is added to both length and width.</li>
          <li>All calculations are saved locally in your browser.</li>
        </ul>
        <button className="export-btn">
          <i className="fa fa-download"></i> EXPORT / PRINT
        </button>
      </div>
    </section>
  );
}

function CurrentStepHeader({ currentStep }) {
  const steps = [0, 1, 2, 3, 4];
  const stepLabels = ["Start", "Details", "Summary", "Items", "Review"];

  return (
    <section className="form-header">
      <div className="container">
        <div className="nav">
          <div></div>
          <h3>Glass Calculator</h3>
          <div></div>
        </div>
        <div className={`counter step${currentStep}`}>
          {steps.map((step, i) => {
            return (
              <Fragment key={step}>
                <span
                  className={
                    step === currentStep
                      ? "active"
                      : step < currentStep
                      ? "completed"
                      : ""
                  }
                >
                  {step < currentStep ? <i className="fa fa-check"></i> : step}
                </span>

                {i < steps.length - 1 && (
                  <div
                    className={step < currentStep ? "line completed" : "line"}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FormNavi({
  currentStep,
  maxSteps,
  onBack,
  onNext,
  backwardText = <>
    <i className="fa fa-chevron-left"></i>Back</>,
  forwardText = <>
    Next<i className="fa fa-chevron-right"></i></>,
}) {
  return (
    <section className="form-navigation">
      <div className="container">
        {currentStep > 0 && (
          <button className="backward" onClick={onBack}>
            {backwardText}
          </button>
        )}
        {currentStep === maxSteps ? (
          <button className="forward generate">
            <i className="fa fa-download"></i>
            GENERATE QUOTE
          </button>
        ) : (
          <button className="forward" onClick={onNext}>
            {forwardText}
          </button>
        )}
      </div>
    </section>
  );
}