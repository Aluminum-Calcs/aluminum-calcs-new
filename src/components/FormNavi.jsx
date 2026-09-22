

export default function FormNavi({
  currentStep,
  maxSteps,
  onBack,
  onNext,
  onGenerate,
  backwardText = (
    <>
      <i className="fa fa-chevron-left"></i>Back
    </>
  ),
  forwardText = (
    <>
      Next<i className="fa fa-chevron-right"></i>
    </>
  ),
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
          <button
            className="forward generate"
            type="button"
            onClick={onGenerate}
          >
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