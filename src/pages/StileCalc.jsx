import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { PageContext } from "../context/PageContext";
import { StileContext } from "../context/StileContext.jsx";
import { computeResult } from "../js/stile-calc/main.js";
import { validateStileInputs } from "../js/stile-calc/error.js";

import "../scss/pages/StileCalc.scss";
import "../scss/components/Form.scss";
import "../scss/components/StileTable.scss";

import InputField from "../components/InputField";
import { RadioField } from "../components/InputField.jsx";

function StileCalc() {
  const { setCurrentPage } = useContext(PageContext);
  const { windowType, setWindowType, sashType, setSashType } = useContext(StileContext);

  const [inputs, setInputs] = useState({
    width: "400",
    height: "900",
    quantity: "1",
  });
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  const types = [
    { val: 'casement-window' },
    { val: 'sliding-window' },
    { val: 'frameless-window' },
  ];

  const sashes = [
    { val: 'one' },
    { val: 'two' },
  ];

  function handleInputChange(id, value) {
    setInputs((prev) => ({ ...prev, [id]: value }));
  }

  function handleCompute(event) {
    event.preventDefault();

    const validation = validateStileInputs({
      windowType,
      sashes: sashType,
      width: inputs.width,
      height: inputs.height,
    });

    if (!validation.isValid) {
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
  }

  useEffect(() => {
    setCurrentPage('Stile Calc');
  }, [setCurrentPage]);

  return (
    <>
      <Helmet>
        <title>Aluminum Calcs | Stile Calc</title>
      </Helmet>
      <main className="stileCalc-page">
        <section className="form">
          <form className="container" onSubmit={handleCompute}>
            <RadioField
              id="window-type"
              classNames={["windowType"]}
              options={types}
              name="type"
              selectedValue={windowType}
              onChange={setWindowType}
            />
            {errors.windowType && <div className="field-error">{errors.windowType}</div>}

            <RadioField
              id="panels/sash"
              classNames={["sash-field"]}
              options={sashes}
              name="sash"
              selectedValue={sashType}
              onChange={setSashType}
            />
            {errors.sashes && <div className="field-error">{errors.sashes}</div>}

            <InputField
              id="width"
              inputType="number"
              value={inputs.width}
              onChange={(value) => handleInputChange("width", value)}
            />
            {errors.width && <div className="field-error">{errors.width}</div>}

            <InputField
              id="height"
              inputType="number"
              value={inputs.height}
              onChange={(value) => handleInputChange("height", value)}
            />
            {errors.height && <div className="field-error">{errors.height}</div>}

            <InputField
              id="quantity"
              inputType="number"
              value={inputs.quantity}
              onChange={(value) => handleInputChange("quantity", value)}
            />

            <button id="compute" type="submit">
              <i className="fa fa-calculator"></i>
              <span>CALCULATE</span>
            </button>
          </form>
        </section>

        <Results rows={results} />
      </main>
    </>
  );
}

function Results({ rows }) {
  return (
    <section className="results">
      <div className="container">
        {rows && rows.length > 0 ? (
          <Table rows={rows} />
        ) : (
          <div className="results__empty">
            <i className="fa fa-table"></i>
            <p>No tables yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Table({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Length (mm)</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.label}</td>
            <td>{row.value}</td>
            <td>{row.price ?? '--'}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td colSpan={2}>--</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default StileCalc;