import sheetIllustration from "../assets/images/sheet-optimizer-illustration.png";
import { FormNavi } from "./GlassPrice.jsx";
import CurrentStepHeader from "../components/CurrentStepHeader.jsx";
import InputField, { ImageCheckboxField } from "../components/InputField.jsx";
import { useLocation } from "react-router";

import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "../context/PageContext.jsx";
import {
  calculateLayoutStats,
  drawSheetLayout,
  optimizeSheetLayout,
} from "../js/sheet-optimizer/logic.js";
import "../scss/pages/SheetOptimizer.scss";

const initialPiece = {
  width: 900,
  height: 1200,
  qty: 1,
  lockRotation: false,
};
const initialValues = {
  sheetWidth: 3300,
  sheetHeight: 2140,
  kerf: 5,
  trim: 5,
};

export default function SheetOptimizer() {
  const { setCurrentPage } = useContext(PageContext);
  const [values, setValues] = useState({
    sheetWidth: 3300,
    sheetHeight: 2140,
    kerf: 5,
    trim: 5,
  });

  function handleValues(property, value) {
    setValues((prev) => ({ ...prev, [property]: value }));
    if (
      property == "sheetWidth" ||
      property == "sheetHeight" ||
      property == "kerf" ||
      property == "trim"
    ) {
      setLayout(null);
    }
  }

  const [currentStep, setCurrentStep] = useState(0);
  const { setFormSteps } = useContext(PageContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentPage("Sheet Optimizer");
    setFormSteps([0, 1, 2, 3]);
  }, [pathname, setCurrentPage, setFormSteps]);

  const [draft, setDraft] = useState(initialPiece);

  function updateDraft(property, value) {
    console.log(draft);
    if (property == "lockRotation")
      return setDraft((current) => ({ ...current, [property]: !value }));

    return setDraft((current) => ({ ...current, [property]: value }));
  }

  const [pieces, setPieces] = useState([]);
  const [allowRotation, setAllowRotation] = useState(true);
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (!layout || !canvasRef.current) return undefined;

    const renderLayout = () => {
      if (canvasRef.current) {
        drawSheetLayout(
          canvasRef.current,
          layout.sheets,
          layout.sheetW,
          layout.sheetH,
          layout.trim
        );
      }
    };

    renderLayout();
    window.addEventListener("resize", renderLayout);
    return () => window.removeEventListener("resize", renderLayout);
  }, [layout]);

  const addPiece = (event) => {
    event.preventDefault();
    const width = Number(draft.width);
    const height = Number(draft.height);
    const qty = Number(draft.qty);

    if (
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      !Number.isInteger(qty) ||
      width <= 0 ||
      height <= 0 ||
      qty <= 0
    ) {
      setError("Enter positive piece dimensions and a whole-number quantity.");
      return;
    }

    const piece = {
      id: nextId.current++,
      width,
      height,
      qty,
      lockRotation: draft.lockRotation,
    };
    setPieces((current) => [...current, piece]);
    setDraft(initialPiece);
    setError("");
    setLayout(null);
  };

  const removePiece = (id) => {
    setPieces((current) => current.filter((piece) => piece.id !== id));
    setLayout(null);
    setError("");
  };

  const generateLayout = (event) => {
    event.preventDefault();
    setLayout(null);
    const sheetW = Number(values.sheetWidth);
    const sheetH = Number(values.sheetHeight);
    const edgeTrim = Number(values.trim);
    const cutKerf = Number(values.kerf);

    if (
      !Number.isFinite(sheetW) ||
      !Number.isFinite(sheetH) ||
      sheetW <= 0 ||
      sheetH <= 0 ||
      !Number.isFinite(edgeTrim) ||
      edgeTrim < 0 ||
      sheetW <= 2 * edgeTrim ||
      sheetH <= 2 * edgeTrim ||
      !Number.isFinite(cutKerf) ||
      cutKerf < 0
    ) {
      setError(
        "Enter valid sheet dimensions, non-negative kerf, and trim smaller than the sheet."
      );
      return;
    }
    if (!pieces.length) {
      setError("Add at least one piece before generating a layout.");
      return;
    }

    const result = optimizeSheetLayout(pieces, {
      sheetW,
      sheetH,
      kerf: cutKerf,
      trim: edgeTrim,
      allowRotation,
    });
    setLayout({ ...result, sheetW, sheetH, trim: edgeTrim });
    setError("");
  };

  const reset = () => {
    setValues(initialValues);
    setDraft(initialPiece);

    setPieces([]);
    setAllowRotation(true);
    setLayout(null);
    setError("");
  };

  const stats = layout
    ? calculateLayoutStats(layout.sheets, layout.sheetW, layout.sheetH)
    : null;

  const handleStepSetting = (path) => {
    if (path === "backward") {
      currentStep === 0 ? setCurrentStep(0) : setCurrentStep(currentStep - 1);
    } else {
      currentStep === 4 ? setCurrentStep(4) : setCurrentStep(currentStep + 1);
    }
  };

  // Need tom make this a hook
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1100px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  //

  if (isDesktop) {
    return (
      <main className="sheet-optimizer-page desktop">
        <section className="desktop-hero">
          <div className="desktop-hero__inner">
            <div>
              <p className="eyebrow">Cutting Calculator</p>
              <h1>
                <span className="special">Sheet</span> Optimizer
              </h1>
              <p className="hero-copy">
                Plan cuts for glass, aluminum, plywood, and accuboard sheets.
                <button
                  className="new-calculation-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                >
                  <i className="fa fa-refresh"></i> NEW CALCULATION
                </button>
              </p>
            </div>

            <div className="hero-mark" aria-hidden="true">
              <i className="fa fa-object-group" />
            </div>
          </div>
        </section>

        <section className="main-content">
          <div className="container">
            <div className="glass-details">
              <div className="card-heading">
                <div className="card-icon">
                  <span aria-hidden="true">1</span>
                </div>
                <div>
                  <p className="eyebrow">Sheet Size</p>
                  <h2>Glass Details</h2>
                </div>
              </div>
              <GlassDetails values={values} handleValues={handleValues} />
            </div>

            <div className="glass-details add-piece-details">
              <div className="card-heading">
                <div className="card-icon">
                  <span aria-hidden="true">2</span>
                </div>
                <div>
                  <p className="eyebrow">Plan cuts</p>
                  <h2>Add pieces</h2>
                </div>
              </div>
              <AddPiece
                values={values}
                draft={draft}
                updateDraft={updateDraft}
                onSubmit={addPiece}
              />
              {error && (
                <p className="optimizer-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>
        </section>

        <Tip />

        <section className="items-section layout-results-desktop">
          <div className="container">
            <div className="card-heading section-header with-action">
              <div className="card-icon">
                <span aria-hidden="true">3</span>
              </div>
              <div>
                <p className="eyebrow">Finally</p>
                <h2>Layout Results</h2>
              </div>
              <button
                className="generate-layout-btn optimizer-primary-btn"
                onClick={(e) => {
                  handleStepSetting("forward");
                  generateLayout(e);
                }}
              >
                <i className="fa fa-magic"></i>Generate Layout
              </button>
              <button
                className="clear-all"
                onClick={(e) => {
                  e.preventDefault();
                  setPieces([]);
                }}
              >
                <i className="fa fa-trash"></i>CLEAR ALL
              </button>
            </div>

            <PieceList pieces={pieces} removePiece={removePiece} />

            <StatsAndCanvas
              stats={stats}
              layout={layout}
              canvasRef={canvasRef}
            />
          </div>
        </section>

        {/* <section className=""></section> */}
      </main>
    );
  }

  return (
    <main className="sheet-optimizer-page">
      {currentStep === 0 && (
        <>
          <section className="intro">
            <div className="container">
              <div className="left">
                <p className="eyebrow">Cutting Calculator</p>
                <h1>
                  <span className="special">Sheet</span> Optimizer
                </h1>
                <p>
                  Plan cuts for glass, aluminum, plywood, and accuboard sheets.
                </p>
                <ul>
                  <li>Sheet Size</li>
                  <li>Add pieces</li>
                  <li>Layout results</li>
                  <li>Print &amp; Plan</li>
                </ul>
              </div>
              <div className="right">
                <img
                  src={sheetIllustration}
                  alt="Sheet Optimizer Illustration"
                />
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
                <i className="fa fa-plus"></i>
                New Calculation
              </>
            }
          />
        </>
      )}

      {/* On step counts */}
      {currentStep !== 0 && (
        <CurrentStepHeader
          currentStep={currentStep}
          handleStepSetting={handleStepSetting}
        />
      )}

      {currentStep === 1 && (
        <>
          <section className="mobile-step-section sheet-size-section">
            <div className="container">
              <div className="heading">
                <div className="eyebrow">Parent glass</div>
                <h2>Sheet Size</h2>
                <p>Enter parent glass measurements.</p>
              </div>

              <GlassDetails values={values} handleValues={handleValues} />
            </div>
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => {
              handleStepSetting("forward");
            }}
            forwardText={
              <>
                Ok. Next <i className="fa fa-chevron-right"></i>
              </>
            }
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <section className="mobile-step-section add-piece-section">
            <div className="container">
              <div classname="heading">
                <span className="eyebrow">Plan your cuts</span>
                <h2>Add pieces</h2>
                <p>Fill in the parts to cut</p>
              </div>
              <AddPiece
                values={values}
                handleValues={handleValues}
                draft={draft}
                updateDraft={updateDraft}
                onSubmit={addPiece}
              />
              <PieceList pieces={pieces} removePiece={removePiece} />
            </div>
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => {
              handleStepSetting("forward");
            }}
            backwardText={
              <>
                <i className="fa fa-chevron-left"></i>
                Edit sheet
              </>
            }
          />
        </>
      )}

      {currentStep === 3 && (
        <>
          <section className="pieces-list-section">
            <div className="container">
              <div className="heading">
                <span className="eyebrow">Finally</span>
                <h2>Layout Results</h2>
                <p>Review your calculated cut.</p>
              </div>
              <div className="card">
                <PieceList pieces={pieces} removePiece={removePiece} />
              </div>

              <Tip />

              {error && (
                <p className="optimizer-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="optimizer-primary-btn"
                onClick={generateLayout}
              >
                <i className="fa fa-magic" aria-hidden="true" /> Generate layout
              </button>
            </div>

            <StatsAndCanvas
              stats={stats}
              layout={layout}
              canvasRef={canvasRef}
            />
          </section>
          <FormNavi
            currentStep={currentStep}
            maxSteps={4}
            onBack={() => handleStepSetting("backward")}
            onNext={() => handleStepSetting("forward")}
            forwardText={
              <>
                <i className="fa fa-print"></i>
                Print
              </>
            }
          />
        </>
      )}
    </main>
  );
}

function GlassDetails(values, handleValues) {
  return (
    <form className="sheet-size-form">
      <div className="optimizer-field-grid">
        <InputField
          inputType="number"
          label="Width"
          name="sheetWidth"
          value={values.sheetWidth}
          onChange={handleValues}
          unit="mm"
        />
        <InputField
          inputType="number"
          label="height"
          name="sheetHeight"
          value={values.sheetHeight}
          onChange={handleValues}
          unit="mm"
        />
      </div>
    </form>
  );
}

function AddPiece({ values, handleValues, draft, updateDraft, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="add-piece-form">
      <div className="optimizer-field-grid optimizer-field-grid--pieces">
        <InputField
          inputType="number"
          label="Width"
          name="width"
          value={draft.width}
          onChange={updateDraft}
          placeholder="e.g. 800"
          unit="mm"
        />
        <InputField
          inputType="number"
          label="Height"
          name="height"
          value={draft.height}
          onChange={updateDraft}
          placeholder="e.g. 600"
          unit="mm"
        />
        <InputField
          inputType="number"
          label="Quantity"
          name="qty"
          value={draft.qty ?? 1}
          onChange={updateDraft}
          placeholder="e.g 7"
          unit="pcs"
        />
        <InputField
          inputType="number"
          label="Kerf / spacing"
          name="kerf"
          value={values.kerf}
          onChange={handleValues}
          placeholder="00"
          unit="mm"
        />
        <InputField
          inputType="number"
          label="Edge Trim"
          name="trim"
          value={values.trim}
          onChange={handleValues}
          placeholder="00"
          unit="mm"
        />
      </div>
      <ImageCheckboxField
        label="Lock Rotation"
        onChange={updateDraft}
        icon={<i className="fa fa-lock"></i>}
        includeInfo={{
          groupName: "lockRotation",
          value: draft.lockRotation,
        }}
        info="Don't rotate (grain direction)"
      />
      <button className="add-piece-btn optimizer-secondary-btn" type="submit">
        <i className="fa fa-plus"></i>
        Add Piece
      </button>
    </form>
  );
}

function PieceList({ pieces, removePiece }) {
  return (
    <ul className="optimizer-piece-list" aria-label="Pieces to cut">
      {pieces.length ? (
        pieces.map((piece) => (
          <li key={piece.id}>
            <span>
              <strong>
                {piece.width} × {piece.height} mm
              </strong>
              <small>
                Quantity {piece.qty}
                {piece.lockRotation ? " · Rotation locked" : ""}
              </small>
            </span>
            <button
              type="button"
              onClick={() => removePiece(piece.id)}
              aria-label={`Remove ${piece.width} by ${piece.height} mm piece`}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </li>
        ))
      ) : (
        <li className="optimizer-piece-list__empty">No pieces added yet.</li>
      )}
    </ul>
  );
}

function Tip() {
  return (
    <div className="optimizer-tip">
      <i className="fa fa-info-circle" aria-hidden="true" />
      <p>
        Layouts use edge-to-edge guillotine cuts. A piece that cannot fit on a
        usable sheet will be reported.
      </p>
    </div>
  );
}

function StatsAndCanvas({ stats, layout, canvasRef }) {
  return (
    <>
      {stats ? (
        <>
          <div className="optimizer-stats" aria-live="polite">
            <div>
              <span>Sheets used</span>
              <strong>{stats.sheetCount}</strong>
            </div>
            <div>
              <span>Efficiency</span>
              <strong>{stats.efficiency.toFixed(1)}%</strong>
            </div>
            <div>
              <span>Waste</span>
              <strong>{stats.waste.toFixed(1)}%</strong>
            </div>
          </div>
          {layout.unplaceable.length > 0 && (
            <div className="optimizer-warning" role="status">
              <strong>
                {layout.unplaceable.length} piece
                {layout.unplaceable.length === 1 ? "" : "s"} could not be
                placed.
              </strong>
              <span>
                {layout.unplaceable
                  .map((piece) => `${piece.width} × ${piece.height} mm`)
                  .join(", ")}
              </span>
            </div>
          )}
          {layout.sheets.length ? (
            <div className="optimizer-canvas-wrapper">
              <canvas
                ref={canvasRef}
                aria-label="Generated sheet cutting layout"
              >
                Your browser does not support canvas rendering.
              </canvas>
            </div>
          ) : (
            <div className="optimizer-empty">
              No pieces fit within the usable sheet area. Adjust the sheet or
              piece dimensions.
            </div>
          )}
        </>
      ) : (
        <div className="optimizer-empty">
          <i className="fa fa-th-large" aria-hidden="true" />
          <strong>Your layout will appear here</strong>
          <span>Add the pieces you need, then generate a cutting plan.</span>
        </div>
      )}
    </>
  );
}
