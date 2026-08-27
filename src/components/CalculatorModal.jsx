import { useEffect, useMemo, useState, useContext } from "react";
import { PageContext } from "../context/PageContext.jsx";
import "../scss/components/CalculatorModal.scss";
import InputField from "./InputField.jsx";

const operations = [
  { value: "add", label: "+" },
  { value: "sub", label: "–" },
  { value: "mul", label: "×" },
  { value: "div", label: "÷" },
];

export default function CalculatorModal() {
  const { calcMode, setCalcMode } = useContext(PageContext);
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(0);
  const [operation, setOperation] = useState("add");

  const show = calcMode === "show";

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setCalcMode("hide");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [show, setCalcMode]);

  const result = useMemo(() => {
    const a = Number(valueA);
    const b = Number(valueB);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return "—";
    }

    switch (operation) {
      case "sub":
        return a - b;
      case "mul":
        return a * b;
      case "div":
        return b === 0 ? "∞" : a / b;
      default:
        return a + b;
    }
  }, [operation, valueA, valueB]);

  if (!show) return null;

  return (
    <div
      className="calculator-modal-overlay"
      role="presentation"
      onClick={() => setCalcMode("hide")}
    >
      <div
        className="calculator-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="calculator-modal__header">
          <h2 id="calculator-modal-title">Quick Calculator</h2>
          <button
            type="button"
            className="calculator-modal__close"
            aria-label="Close calculator"
            onClick={() => setCalcMode("hide")}
          >
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>
        </header>

        <section className="calculator-modal__body">
          <div className="calculator-modal__row">
            <InputField
              id="value-a"
              inputType="number"
              value={valueA}
              onChange={setValueA}
            />
          </div>

          <div className="calculator-modal__row">
            <InputField
              id="value-b"
              inputType="number"
              value={valueB}
              onChange={setValueB}
            />
          </div>

          <div className="calculator-modal__row calculator-modal__row--operations">
            {operations.map((item) => (
              <button
                key={item.value}
                type="button"
                className={operation === item.value ? "active" : ""}
                onClick={() => setOperation(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="calculator-modal__result">
            <span>Result</span>
            <strong>{result.toLocaleString()}</strong>
          </div>
        </section>

        <footer className="calculator-modal__footer">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setValueA(0);
              setValueB(0);
              setOperation("add");
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => setCalcMode("hide")}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
