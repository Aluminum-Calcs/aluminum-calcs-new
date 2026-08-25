import { PageContext } from "../context/PageContext";
import { Fragment, useContext, useEffect, useState } from "react";
import "../scss/pages/Quote.scss";
import "../scss/components/FormNavi.scss";
import { NavLink, useNavigate } from "react-router";
import InputField, {
  RadioField,
  ImageRadioField,
  DropdownField,
  ImageCheckboxField,
} from "../components/InputField.jsx";
import Quotation from "../components/QuotationSummary.jsx";
import SaveDraftModal from "../components/saveDraftModal.jsx";

import quoteIllustration from "../assets/images/quote-illustration.png";
import lockStile from "../assets/images/svgs/lock-stile.svg";
import glassSvg from "../assets/images/svgs/glass.svg";
import insectNetSvg from "../assets/images/svgs/net.svg";
import protectorSvg from "../assets/images/svgs/protector.svg";
import transom from "../assets/images/svgs/transom.svg";
import protectorRodSvg from "../assets/images/svgs/protector-rod.svg";
import weatherStripSvg from "../assets/images/svgs/weather-strip.svg";

import slidingSvg from "../assets/images/svgs/sliding.svg";
import casementSvg from "../assets/images/svgs/casement.svg";
import framelessSvg from "../assets/images/svgs/frameless.svg";
import GlassSizeTip from "../components/GlassSizeTip.jsx";
import { saveDraft_localStorage } from "../js/Quote/main.js";
import { QuoteContext, QuoteContextProvider } from "../context/QuoteContext.jsx";
import { getQuotationTotals } from "../js/Quote/quotationTotals.js";
import { addQuoteToCart } from "../js/cart/quoteCart.js";

let draft_storage_key = 'aluminum-calcs/quote-builder';
function addToCart() {
  const { total } = getQuotationTotals(values);
  addQuoteToCart(values, total);
  navigate("/aluminum-calcs-new/quote-success");
}

let options = {
  windowType: [
    {
      value: "sliding-window",
      image: slidingSvg,
    },
    {
      value: "casement-window",
      image: casementSvg,
    },
    {
      value: "frameless-window",
      image: framelessSvg,
    },
  ],
  sashCount: [
    { value: "1-sash" },
    { value: "2-sashes", default: true },
    { value: "3-sashes" },
  ],
  matterTransom: [
    { value: "yes" },
    { value: "no" }
  ],
  openingStyle: [
    { value: "left-open" },
    { value: "right-open" },
    { value: "both" },
  ],
  glassThickness: [
    { value: "4mm", default: true },
    { value: "5mm" },
  ],
  glassColor: [
    { value: "Blue", default: true },
    { value: "Black" },
  ],
  glassType: [
    { value: "Partial reflective", default: true },
    { value: "Total-reflective" },
    { value: "Transparent" },
    { value: "Opaque" },
  ],
};


function QuoteBuilder() {
  const { theme, setCurrentPage } = useContext(PageContext);

  const { setSaveDraftVisibility } = useContext(QuoteContext);

  const [currentStep, setCurrentStep] = useState(0);
  let steps = [1, 2, 3, 4, 5];

  const [values, setValues] = useState({
    windowType: "frameless-window",
    width: 1200,
    height: 1200,
    innerWidth: 0,
    innerHeight: 0,
    sashCount: 2,
    orientation: 'horizontal',
    matterTransom: "yes",
    openingStyle: "both",
    includeNet: false,
    includeAccessories: true,
    includeProtector: false,
    includeProctectorRod: false,

    includeGlass: true,
    glassThickness: "4mm",
    glassColor: "blue",
  });

  

  function handleValues(property, value) {
    property == sashCount && (value = Number(value.toString().replace(/-sash(es)?/i, "")));
    setValues((prev) => ({ ...prev, [property]: value }));
  }

  useEffect(() => {
    setCurrentPage("Quote Builder");
  });

  function handleStepSetting(path) {
    if (path == "backward") {
      currentStep == 0 ? setCurrentStep(0) : setCurrentStep(currentStep - 1);
    } else {
      currentStep == 5 ? setCurrentStep(5) : setCurrentStep(currentStep + 1);
    }
  }

  if (window.innerWidth >= 1100) {
    return <>
      <main className="quote-builder-page desktop">
        <section className="intro">
          <div className="container">
            <div className="left">
              <h1><span className="special">Quote</span> Builder ✨</h1>
              <p>
                Create complete window quotations in minutes.
              </p>
            </div>
            <div className="right">
              <button className="saveDraftButton">
                <i className="fa fa-save"></i>
                Save Draft
              </button>
              <button className="clear-all">
                <i className="fa fa-refresh"></i>
                Clear All
              </button>
              <button className="cartButton">
                <i className="fa fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </section>
        <form className="form">
          <div className="form_section 1" onClick={()=> setCurrentStep(1)}>
            <h2 className="form_section_name">
              1. Window Details
            </h2>
            <div className="form_section_fields">
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
                name="sashCount"
                selectedValue={values.sashCount}
                onChange={handleValues}
              />
              <InputField
                inputType="number" id="overall-width"
                value="1200"
                onChange={handleValues}
                unit ="mm"
              />
              <InputField
                inputType="number" id="overall-height"
                value="1200"
                onChange={handleValues}
                unit="mm"
              />
              <InputField
                inputType="dropdown"
                id="Window-orientation"
                value="Horizontal"
              />
              <RadioField
                id="matterTransom"
                name="matterTransom"
                classNames={["matterTransom"]}
                options={options.matterTransom}
                selectedValue={values.matterTransom}
                onChange={handleValues}
              />
              <RadioField
                id="openingStyle"
                classNames={["opening-style"]}
                options={options.openingStyle}
                name="openingStyle"
                selectedValue={values.openingStyle}
                onChange={handleValues}
              />
            </div>
          </div>
          <div className="form_section 2" onClick={()=> setCurrentStep(2)}>
            <h2 className="form_section_name">
              2. Glass Details
            </h2>
            <div className="form_section_fields">
              <DropdownField
                label="Glass thickness"
                name="glassThickness"
                options={options.glassThickness}
                value={values.glassThickness}
                onChange={handleValues}
              />
              <DropdownField
                label="Glass Color"
                name="glassColor"
                options={options.glassColor}
                value={values.glassColor}
                onChange={handleValues}
              />
              <DropdownField
                label="Glass Type"
                name="glassType"
                options={options.glassType}
                value={values.glassType}
                onChange={handleValues}
              />
              <GlassSizeTip
                windowType={values.windowType}
                sashes={values.sashCount}
                width={values.width}
                height={values.height}
              />
            </div>
          </div>
          <div className="form_section 3" onClick={()=> setCurrentStep(3)}>
            <h2 className="form_section_name">
              3. Accessories &amp; Add-ons
            </h2>
            <div className="form_section_fields">
              <ImageCheckboxField
                label="Insect Net"
                name="insect-net"
                info="Include insect net for ventilation"
                image={insectNetSvg}
                selected={false}
              />
              <ImageCheckboxField
                label="Protector"
                name="protector"
                info="Include window protector"
                image={protectorSvg}
              />
              <ImageCheckboxField
                label="Protector Rod"
                name="protector-red"
                info="Include protector rod"
                image={protectorRodSvg}
              />
              <ImageCheckboxField
                label="Weather Strip"
                name="weather-strip"
                info="Reduce noise & dust"
                image={weatherStripSvg}
              />
            </div>
          </div>
        </form>
        <Quotation values ={values}/>
      </main>
    </>;
  }


  if (currentStep == 0) {
    return (
      <main className="quote-builder-page">
        <CreateQuoteIntro />
        <FormNavi />
        
        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  } else if (currentStep == 1) {
    return (
      <main className="quote-builder-page">
        <StepHeader />
        <form>
          <div className="container">
            <div>
              <h2>Window details</h2>
              <p>Tell us about the window.</p>
            </div>
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
              name="sashCount"
              selectedValue={values.sashCount}
              onChange={handleValues}
            />
          </div>
        </form>
        <FormNavi />

        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  } else if (currentStep == 2) {
    return (
      <main className="quote-builder-page">
        <StepHeader />
        <form className="quote-form">
          <div className="container">
            <div>
              <h2>Dimensions &amp; Opening</h2>
              <p>Enter the measurements.</p>
            </div>
            <InputField
              inputType="number" id="overall-width"
              value="1200"
              onChange={handleValues}
              unit ="mm"
            />
            <InputField
              inputType="number" id="overall-height"
              value="1200"
              onChange={handleValues}
              unit="mm"
            />
            <InputField
              inputType="dropdown"
              id="Window-orientation"
              value="Horizontal"
            />
            <RadioField
              id="matterTransom"
              name="matterTransom"
              classNames={["matterTransom"]}
              options={options.matterTransom}
              selectedValue={values.matterTransom}
              onChange={handleValues}
            />
            <RadioField
              id="openingStyle"
              classNames={["opening-style"]}
              options={options.openingStyle}
              name="openingStyle"
              selectedValue={values.openingStyle}
              onChange={handleValues}
            />
          </div>
        </form>
        <FormNavi />

        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  } else if (currentStep == 3) {
    return (
      <main className="quote-builder-page">
        <StepHeader />
        <form className="quote-form">
          <div className="container">
            <div>
              <h2>Glass Details</h2>
              <p>Choose your glass specifications.</p>
            </div>
            <DropdownField
              label="Glass thickness"
              name="glassThickness"
              options={options.glassThickness}
              value={values.glassThickness}
              onChange={handleValues}
            />
            <DropdownField
              label="Glass Color"
              name="glassColor"
              options={options.glassColor}
              value={values.glassColor}
              onChange={handleValues}
            />
            <DropdownField
              label="Glass Type"
              name="glassType"
              options={options.glassType}
              value={values.glassType}
              onChange={handleValues}
            />
          </div>
        </form>
        <GlassSizeTip
          windowType={values.windowType}
          sashes={values.sashCount}
          width={values.width}
          height={values.height}
        />
        
        <FormNavi />

        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  } else if (currentStep == 4) {
    return (
      <main className="quote-builder-page">
        <StepHeader />
        <form className="quote-form">
          <div className="container">
            <div>
              <h2>Accesories &amp; Add-ons</h2>
              <p>Select additional items.</p>
            </div>
            <ImageCheckboxField
              label="Insect Net"
              name="insect-net"
              info="Include insect net for ventilation"
              image={insectNetSvg}
              selected={false}
            />
            <ImageCheckboxField
              label="Protector"
              name="protector"
              info="Include window protector"
              image={protectorSvg}
            />
            <ImageCheckboxField
              label="Protector Rod"
              name="protector-red"
              info="Include protector rod"
              image={protectorRodSvg}
            />
            <ImageCheckboxField
              label="Weather Strip"
              name="weather-strip"
              info="Reduce noise & dust"
              image={weatherStripSvg}
            />
          </div>
        </form>
        <FormNavi />
        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  } else if (currentStep == 5) {
    return (
      <main className="quote-builder-page">
        <StepHeader />
        <form className="quote-form">
          <div className="container">
            <div>
              <h2>
                Review &amp; Quotation
              </h2>
              <p>Review your items and total.</p>
            </div>
          </div>
        </form>
        <Quotation values={values} />

        <FormNavi
          backTo={() => setSaveDraftVisibility(true)}
          nextTo={() => addToCart()}
          backwardText={<>
            <i className="fa fa-save"></i>
            Save Draft
          </>}
          forwardText={<>
            <NavLink to="/aluminum-calcs-new/quote-success" className="absolute">
              <i className="fa fa-cart-plus"></i>
              Add to cart
            </NavLink>
          </>}
        />

        <SaveDraftModal
          values={values}
          storageKey={draft_storage_key}
        />
      </main>
    );
  }


  function CreateQuoteIntro() {
    return (
      <section className="intro">
        <div className="container">
          <div className="left">
            <h1>
              <span className="special">Quote</span> Builder
            </h1>
            <p>Create complete window quotations in minutes.</p>
            <ul className={theme}>
              <li>Window Details</li>
              <li>Dimensions &amp; Opening</li>
              <li>Glass Details</li>
              <li>Accessories &amp; Add-ons</li>
              <li>Review and Quotation</li>
            </ul>
          </div>
          <div className="right">
            <img
              src={quoteIllustration}
              alt="quote illustration"
              className="quote_hero_img"
            />
          </div>
        </div>
      </section>
    );
  }

  function FormNavi({
    backTo = () => handleStepSetting("backward"),
    nextTo = () => handleStepSetting("forward"),
    backwardText = <><i className="fa fa-chevron-left"></i>Back</>,
    forwardText = <>Next<i className="fa fa-chevron-right"></i></>,
  }) {
    return (
      <section className="form-navigation">
        <div className="container">
          {currentStep > 0 && (
            <button
              className="backward"
              onClick={backTo}
            >
              {backwardText}
            </button>
          )}
          {currentStep == 0 ? (
            <button
              className="forward"
              onClick={nextTo}
            >
              Create a Quote
              <i className="fa fa-chevron-right"></i>
            </button>
          ) : (
            <button
              className="forward"
              onClick={nextTo}
            >
              {forwardText}
            </button>
          )}
        </div>
      </section>
    );
  }

  function StepHeader({ headerText = "New Quote" }) {
    return (
      <section className="form-header">
        <div className="container">
          <div className="nav">
            <button onClick={() => handleStepSetting("backward")}>
              <i className="fa fa-angle-left"></i>
            </button>
            <h3>{headerText}</h3>
            <button id="save" onClick={() => setSaveDraftVisibility(true)}>
              <i className="fa fa-save"></i>
            </button>
          </div>
          <div className={`counter step${currentStep}`}>
            {steps.map((step, i) => {
              return (
                <Fragment key={step}>
                  <span
                    className={
                      step == currentStep
                        ? "active"
                        : step < currentStep
                        ? "completed"
                        : ""
                    }
                  >
                    {step}
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

  const StepMarker = ({ text = 'Step', }) => {
    // returns a list marker for a step in the form.
    return <span className="special">
      {text && text}
      {currentStep}
      . 
    </span>
  };
}


export default QuoteBuilder;
