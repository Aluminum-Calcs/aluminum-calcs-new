import { Fragment, useContext } from "react";
import "../scss/components/CurrentStepHeader.scss";
import { PageContext } from "../context/PageContext";
//use a context variable for steps and max-steps.

export default function CurrentStepHeader({
  currentStep,
  handleStepSetting = () => Math.min(1,2),
  otherButtons = [
    {
      text: <i className="fa fa-refresh">Refresh</i>,
      callbacks: [console.log("1"), console.log("2"), console.log("3")],
    },
  ],
}) {
  const { formSteps } = useContext(PageContext);
  const steps = formSteps ?? [0, 1, 2, 3, 4];
  // const stepLabels = ["Start", "Details", "Summary", "Items", "Review"];

  function handleButtons(e) {
    e.preventDefault();
    console.log()
  }

  return (
    <section className="Step-header">
      <div className="container">
        <div className="nav">
          <button onClick={() => handleStepSetting("backward")}>
            <i className="fa fa-angle-left"></i>
          </button>
          {otherButtons != [] && (
            <>
              {otherButtons.forEach((btn, i) => {
                console.log(btn.text);
                return <button id={`other-btn-${i}`}>{btn.text}</button>;
              })}
            </>
          )}
          <button id="save" onClick={(e) =>handleButtons()}>
            <i className="fa fa-refresh"></i>
          </button>
          <button id="save" onClick={(e) =>handleButtons()}>
            <i className="fa fa-save"></i>
          </button>
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
