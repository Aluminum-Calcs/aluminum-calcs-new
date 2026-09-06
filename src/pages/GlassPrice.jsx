import { useState, useContext, useEffect, Fragment } from "react";
import { pdf } from "@react-pdf/renderer";
import { PageContext } from "../context/PageContext";
import { calculateGlassPrice } from '../js/glass-price/calculation.js';
import GlassQuotePdf from "../components/GlassQuotePdf.jsx";

import "../scss/pages/GlassPrice.scss";
import "../scss/components/FormNavi.scss";
import glassPriceIllustration from '../assets/images/glass-price-illustration.png';

import InputField, { DropdownField } from "../components/InputField.jsx";
import { CheckGlassSheetPrice } from "../js/global.js";

let options = {
  glassColor: [
    {value: "transparent", label: "Transparent"},
    {value: "blue", label: "Blue"},
    {value: "black", label: "Black"},
  ],
  glassThickness: [
    {value: "4mm", label: "4mm"},
    {value: "5mm", label: "5mm"},
    {value: "6mm", label: "6mm"},
  ],
}

export default function GlassPrice() {
  const { setCurrentPage } = useContext(PageContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    glassColor: "transparent",
    glassThickness: "4mm",
    width: 500,
    height: 900,
    quantity: 1,
    allowance: 0,
  });
  const [feedback, setFeedback] = useState({});
  const [entries, setEntries] = useState([]);


  useEffect(() => {
    setCurrentPage("Glass Price Calc");
  }, [setCurrentPage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
  }, []);

  // Feedback request from calculation.js
  function getFeedback() {
    setFeedback(
      calculateGlassPrice({ ...values, fullSheetPrice: CheckGlassSheetPrice(values.glassThickness, values.glassColor) })
    )
  }

  // Adding quote to entries
  function addEntry(entry) {
    if (entry == {}) return;
    setEntries(prev=> [...prev, entry])
  }

  // State update.
  const handleValues = (property, value) => {
    console.log(property, value)
    setValues((prev) => ({ ...prev, [property]: value }));
  };

  // For resets.
  const handleNewCalculation = () => {
    setValues({
      glassColor: "transparent",
      glassThickness: "4mm",
      width: 0,
      height: 0,
      quantity: 1,
      allowance: 0,
    });
    setFeedback({});
  };

  async function handleGenerateQuote(discount = 0) {
    if (!entries.length) return;

    const subtotal = entries.reduce(
      (sum, entry) => sum + (parseFloat(entry.price) || 0),
      0
    );
    const normalizedDiscount = Math.max(0, parseFloat(discount) || 0);
    const total = Math.max(0, subtotal - normalizedDiscount);
    const blob = await pdf(
      <GlassQuotePdf
        entries={entries}
        discount={normalizedDiscount}
        subtotal={subtotal}
        total={total}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `glass-quote-${new Date().toISOString().slice(0, 10)}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }

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
                <GlassDetailsForm
                  values={values}
                  onChange={handleValues}
                  buttonDuty={getFeedback}
                />
              </div>

              <div className="price-summary">
                <div className="section-header">
                  <h2>Price Summary</h2>
                </div>
                <PriceSummaryCard feedback={feedback} buttonDuty={addEntry}/>
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

      {currentStep === 0 && (
        <>
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
                <img src={glassPriceIllustration} alt="Glass Price Calculator" />
              </div>
            </div>
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => handleStepSetting("forward")}
          />
        </>
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
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => {
              getFeedback();
              handleStepSetting("forward");
            }}
            forwardText={<>
              Calculate <i className="fa fa-chevron-right"></i>
            </>}
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <CurrentStepHeader currentStep={currentStep}/>
          <section className="mobile-price-summary">
            <div className="container">
              <div>
                <h2>Price Summary</h2>
                <p>Review your calculated price and details.</p>
              </div>
              <PriceSummaryCard feedback={feedback} buttonDuty={addEntry}/>
            </div>
          </section>
          <FormNavi
              currentStep={currentStep}
              maxSteps={4}
              onBack={() => handleStepSetting("backward")}
              onNext={() => handleStepSetting("forward")}
          />
        </>
      )}

      {currentStep === 3 && (
        <>
          <CurrentStepHeader currentStep={currentStep}/>
          <section className="mobile-items-list">
            <div className="container">
              <div>
                <h2>Items List</h2>
                <p>Review all calculated items.</p>
              </div>
              <ItemsListTable entries={entries} />
            </div>
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => handleStepSetting("forward")}
          />
        </>
      )}

      {currentStep === 4 && (
        <>
          <CurrentStepHeader currentStep={currentStep}/>
          <section className="mobile-review">
            <div className="container">
              <div>
                <h2>Review & Generate</h2>
                <p>Complete your quote and generate a summary.</p>
              </div>
              <ReviewSummary entries={entries} feedback={feedback} onGenerate={handleGenerateQuote} />
            </div>
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => handleStepSetting("forward")}
            onGenerate={() => handleGenerateQuote()}
          />
        </>
      )}

      <NoteSection />
    </main>
  );
}

function GlassDetailsForm(
  {
    values,
    onChange,
    buttonDuty = () => console.log('button duty activated')
  }
) {
  return (
    <div className="glass-details-form">
      <DropdownField
        label="Glass Color"
        name="glassColor"
        options={options.glassColor}
        value={values.glassColor}
        selectedValue={values.glassColor}
        onChange={onChange}
      />

      <DropdownField
        label="Thickness (MM)"
        name="glassThickness"
        options={options.glassThickness}
        value={values.glassThickness}
        selectedValue={values.glassThickness}
        onChange={onChange}
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
        id="height"
        name="height"
        label="height"
        value={values.height}
        onChange={onChange}
        unit="mm"
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

      {window.innerWidth >= 1100 && <button
        type="button"
        className="calculate-btn"
        onClick={buttonDuty}
      >
        <i className="fa fa-calculator"></i> CALCULATE PRICE
      </button>}
    </div>
  );
}

function PriceSummaryCard({
  feedback = {},
  buttonDuty = ()=>console.log('Supposed to add quote')
}) {
  const isEmpty = !feedback || !feedback.price;

  if (isEmpty) {
    return (
      <div className="price-summary-empty">
        <i className="fa fa-naira">₦</i>
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
        <span className="value">{`₦${feedback.price.toLocaleString()}` || "₦0.00"}</span>
      </div>
      <div className="summary-item">
        <span className="label">Total Area</span>
        <span className="value">{`${feedback.area}mm²` || "0.00mm²"}</span>
      </div>
      <div className="summary-item">
        <span className="label">Unit Price</span>
        <span className="value">{feedback.unitPrice.toLocaleString() || "₦0.00"}</span>
      </div>

      <div className="breakdown">
        <div className="breakdown-row">
          <span>Glass Color</span>
          <span>{feedback.color || "-"}</span>
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

      <button
        className="add-to-quote-btn"
        onClick={()=> buttonDuty(feedback)}
      >
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
    <div className="items-table-wrapper">
      <table className="items-table">
      <thead>
        <tr>
          <th>S/N</th>
          <th>Glass Color</th>
          <th>Thickness(mm)</th>
          <th>Size(mm)</th>
          <th>Qty</th>
          <th>Area(m²)</th>
          <th>Unit Price(₦)</th>
          <th>Total(₦)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{entry.color || "-"}</td>
            <td>{entry.thickness || "-"}</td>
            <td>{entry.sizeLabel || "-"}</td>
            <td>{entry.quantity || "0"}</td>
            <td>{entry.area || "0.00"}</td>
            <td>{`₦${entry.unitPrice.toLocaleString()}` || "₦0.00"}</td>
            <td>{`₦${entry.price.toLocaleString()}` || "₦0.00"}</td>
            <td>
              <button className="delete-btn" title="Delete">
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

function ReviewSummary({ entries = [], feedback = {}, onGenerate = () => {} }) {
  const totalItems = entries.length;
  const totalArea = entries.reduce(
    (sum, e) => sum + (parseFloat(e.area) || 0),
    0
  );
  const subtotal = entries.reduce(
    (sum, e) => sum + (parseFloat(e.price) || 0),
    0
  );
  const [discount, setDiscount] = useState(0);
  let total = discount >= subtotal
    ? 0
    : subtotal - discount;

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
            <span className="value">{totalArea.toFixed(2)} mm²</span>
          </div>
          <div className="review-item">
            <span>Subtotal</span>
            <span className="value">₦ {subtotal.toLocaleString()}</span>
          </div>
          <div className="review-item discount">
            <span>Discount</span>
            <input
              type="text"
              id='discountInput'
              value={`₦ ${discount.toLocaleString()}`} onChange={(e) => {
                setDiscount(
                  parseFloat(e.target.value.replace('₦', '').replace(',', '').replace(' ', 0))
                )
              }}
            />
          </div>
          <div className="review-item highlight">
            <span>Total Price</span>
            <span className="value">₦ {total.toLocaleString() || '₦0.00'}</span>
          </div>
          <button className="generate-quote-btn" type="button" onClick={() => onGenerate(discount)}>
            <i className="fa fa-download"></i> GENERATE QUOTE
          </button>
        </div>
      ) : (
        <div className="review-empty">
          <i className="fa fa-eye"></i>
          <p className="empty-title">No items to review</p>
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
          <h3>
            <i className="fa fa-sticky-note"></i>
            Note
          </h3>
          <button className="export-btn">
            <i className="fa fa-download"></i> EXPORT / PRINT
          </button>
        </div>
        <ul className="note-list">
          <li>Prices are based on unit price per square meter.</li>
          <li>Cutting allowance is added to both length and width.</li>
          <li>All calculations are saved locally in your browser.</li>
        </ul>
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
  onGenerate,
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
          <button className="forward generate" type="button" onClick={onGenerate}>
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