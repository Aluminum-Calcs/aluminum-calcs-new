
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { PageContext } from "../context/PageContext";
import { QuoteContext } from "../context/QuoteContext.jsx";

import "../scss/pages/Quote.scss";
import "../scss/components/FormNavi.scss";
import "../scss/components/CurrentStepHeader.scss";

import InputField, {
  RadioField,
  ImageRadioField,
  DropdownField,
  ImageCheckboxField,
} from "../components/InputField.jsx";

import Quotation from "../components/QuotationSummary.jsx";
import SaveDraftModal from "../components/SaveDraftModal.jsx";
import GlassSizeTip from "../components/GlassSizeTip.jsx";

import quoteIllustration from "../assets/images/quote-illustration.png";

import insectNetSvg from "../assets/images/svgs/net.svg";
import protectorSvg from "../assets/images/svgs/protector.svg";
import protectorRodSvg from "../assets/images/svgs/protector-rod.svg";
import weatherStripSvg from "../assets/images/svgs/weather-strip.svg";

import slidingSvg from "../assets/images/svgs/sliding.svg";
import casementSvg from "../assets/images/svgs/casement.svg";
import framelessSvg from "../assets/images/svgs/frameless.svg";

import { getQuotationTotals } from "../js/Quote/quotationTotals.js";
import { addQuoteToCart } from "../js/cart/quoteCart.js";

const draft_storage_key = "aluminum-calcs/quote-builder";

const steps = [1, 2, 3, 4, 5];

const initialValues = {
  windowType: "casement-window",

  width: 1200,
  height: 1200,

  innerWidth: 0,
  innerHeight: 0,

  sashCount: 3,

  orientation: "horizontal",

  matterTransom: "yes",
  openingStyle: "both",

  includeGlass: true,
  glassThickness: "4mm",
  glassColor: "Blue",
  glassType: "Partial reflective",

  accessories: ["30m net", "weather strip"],
};

const options = {
  windowType: [
    { value: "sliding-window", image: slidingSvg },
    { value: "casement-window", image: casementSvg },
    { value: "frameless-window", image: framelessSvg },
  ],

  sashCount: [
    { value: 1 },
    { value: 2, default: true },
    { value: 3 },
  ],

  matterTransom: [{ value: "yes" }, { value: "no" }],

  openingStyle: [
    { value: "left-open" },
    { value: "right-open" },
    { value: "both" },
  ],

  orientation: [
    { value: "vertical" },
    { value: "horizontal" },
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setCurrentPage, setFormSteps } = useContext(PageContext);
  const { setSaveDraftVisibility } = useContext(QuoteContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(() => ({
    ...initialValues,
    accessories: [...initialValues.accessories],
  }));

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1100
  );

  // Responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update application page context
  useEffect(() => {
    setCurrentPage?.("Quote Builder");
    setFormSteps?.(steps);
  }, [pathname, setCurrentPage, setFormSteps]);

  // Update form values
  function handleValues(property, value) {
    if (!property) return;

    if (property === "accessories") {
      setValues((previous) => {
        const currentAccessories = previous.accessories || [];

        const updatedAccessories = currentAccessories.includes(value)
          ? currentAccessories.filter((item) => item !== value)
          : [...currentAccessories, value];

        return {
          ...previous,
          accessories: updatedAccessories,
        };
      });

      return;
    }

    if (property === "sashCount") {
      value = Number(value);
    }

    if (property === "width" || property === "height") {
      value = value === "" ? "" : Number(value);
    }

    setValues((previous) => ({
      ...previous,
      [property]: value,
    }));
  }

  // Step navigation
  function handleStepSetting(direction) {
    setCurrentStep((previous) => {
      if (direction === "backward") {
        return Math.max(0, previous - 1);
      }

      return Math.min(5, previous + 1);
    });
  }

  // Reset quotation
  function clearAll() {
    setValues({
      ...initialValues,
      accessories: [...initialValues.accessories],
    });

    setCurrentStep(0);
  }

  // Add quotation to cart
  function handleAddToCart(quoteData) {
    const quotationValues = quoteData?.values || values;

    const totals = getQuotationTotals(quotationValues);

    const subtotal = quoteData?.subtotal ?? totals.subTotal;
    const discount = quoteData?.discount ?? 0;
    const total = quoteData?.total ?? subtotal - discount;

    addQuoteToCart(
      quotationValues,
      total,
      subtotal,
      discount
    );

    navigate("/aluminum-calcs-new/quote-success");
  }

  // Open save draft modal
  function openSaveDraft() {
    setSaveDraftVisibility?.(true);
  }

  // Accessory selection helpers
  const hasAccessory = (accessory) =>
    (values.accessories || []).includes(accessory);

  const disableStainless =
    hasAccessory("ify pipe") ||
    hasAccessory("25mm galvanized pipe");

  const disableIfy =
    hasAccessory("25mm stainless pipe") ||
    hasAccessory("25mm galvanized pipe");

  const disableGalvanized =
    hasAccessory("ify pipe") ||
    hasAccessory("25mm stainless pipe");

  // Render accessory fields
  function renderAccessoryFields() {
    return (
      <>
        <ImageCheckboxField
          label="Insect Net"
          name="insect-net"
          info="Net for ventilation and protection"
          image={insectNetSvg}
          selected={hasAccessory("30m net")}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "30m net",
          }}
        />

        <ImageCheckboxField
          label="Stainless Steel Pipe"
          name="steel-pipe"
          info="Include stainless steel pipe"
          image={protectorSvg}
          selected={hasAccessory("25mm stainless pipe")}
          classNames={disableStainless ? ["disable"] : []}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "25mm stainless pipe",
          }}
        />

        <ImageCheckboxField
          label="Ify pipe"
          name="ify-pipe"
          info="Use Ify-pipe as protector"
          image={protectorSvg}
          selected={hasAccessory("ify pipe")}
          classNames={disableIfy ? ["disable"] : []}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "ify pipe",
          }}
        />

        <ImageCheckboxField
          label="Galvanized pipe"
          name="galvanized-pipe"
          info="Use galvanized pipe as protector"
          image={protectorSvg}
          selected={hasAccessory("25mm galvanized pipe")}
          classNames={disableGalvanized ? ["disable"] : []}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "25mm galvanized pipe",
          }}
        />

        <ImageCheckboxField
          label="Protector Rod"
          name="protector-rod"
          info={
            <>
              <b>16mm</b> rod for maximized protection
            </>
          }
          image={protectorRodSvg}
          selected={hasAccessory("16mm rod")}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "16mm rod",
          }}
        />

        <ImageCheckboxField
          label="Weather Strip / Brush"
          name="weather-strip"
          info="Reduce noise & dust"
          image={weatherStripSvg}
          selected={hasAccessory("weather strip")}
          onChange={handleValues}
          includeInfo={{
            groupName: "accessories",
            value: "weather strip",
          }}
        />
      </>
    );
  }

  // Render window details
  function renderWindowDetailsFields() {
    return (
      <>
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
          label="Overall Width"
          inputType="number"
          id="overall-width"
          name="width"
          value={values.width}
          onChange={handleValues}
          unit="mm"
        />

        <InputField
          label="Overall Height"
          inputType="number"
          id="overall-height"
          name="height"
          value={values.height}
          onChange={handleValues}
          unit="mm"
        />

        <DropdownField
          label="Window Orientation"
          name="orientation"
          classNames={["window-orientation"]}
          options={options.orientation}
          selectedValue={values.orientation}
          onChange={handleValues}
        />

        {values.windowType === "frameless-window" && (
          <RadioField
            label="Matter Transom"
            id="matterTransom"
            name="matterTransom"
            classNames={["matterTransom"]}
            options={options.matterTransom}
            selectedValue={values.matterTransom}
            onChange={handleValues}
          />
        )}

        {values.windowType !== "sliding-window" && (
          <RadioField
            label="Opening Style"
            id="openingStyle"
            name="openingStyle"
            classNames={["opening-style"]}
            options={options.openingStyle}
            selectedValue={values.openingStyle}
            onChange={handleValues}
          />
        )}
      </>
    );
  }

  // Render glass fields
  function renderGlassFields() {
    return (
      <>
        <DropdownField
          label="Glass thickness"
          name="glassThickness"
          options={options.glassThickness}
          selectedValue={values.glassThickness}
          onChange={handleValues}
        />

        <DropdownField
          label="Glass Color"
          name="glassColor"
          options={options.glassColor}
          selectedValue={values.glassColor}
          onChange={handleValues}
        />

        <DropdownField
          label="Glass Type"
          name="glassType"
          options={options.glassType}
          selectedValue={values.glassType}
          onChange={handleValues}
        />
      </>
    );
  }

  // Render introduction section
  function renderCreateQuoteIntro() {
    return (
      <section className="intro">
        <div className="container">
          <div className="left">
            <p className="eyebrow">Start planning</p>

            <h1>
              <span className="special">Quote</span> Builder
            </h1>

            <p>Create complete window quotations in minutes.</p>

            <ul>
              <li>Window Details</li>
              <li>Dimensions & Opening</li>
              <li>Glass Details</li>
              <li>Accessories & Add-ons</li>
              <li>Review and Quotation</li>
            </ul>
          </div>

          <div className="right">
            {quoteIllustration && (
              <img
                src={quoteIllustration}
                alt="Quote illustration"
                className="quote_hero_img"
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render form navigation
  function renderFormNavi({
    backTo = () => handleStepSetting("backward"),
    nextTo = () => handleStepSetting("forward"),
    backwardText = (
      <>
        <i className="fa fa-chevron-left" />
        Back
      </>
    ),
    forwardText = (
      <>
        Next
        <i className="fa fa-chevron-right" />
      </>
    ),
  } = {}) {
    return (
      <section className="form-navigation">
        <div className="container">
          {currentStep > 0 && (
            <button
              type="button"
              className="backward"
              onClick={backTo}
            >
              {backwardText}
            </button>
          )}

          <button
            type="button"
            className="forward"
            onClick={nextTo}
          >
            {currentStep === 0 ? "Create a Quote" : forwardText}

            {currentStep === 0 && (
              <i className="fa fa-chevron-right" />
            )}
          </button>
        </div>
      </section>
    );
  }

  // Render mobile step header
  function renderStepHeader({ headerText = "New Quote" } = {}) {
    return (
      <section className="Step-header">
        <div className="container">
          <div className="nav">
            <button
              type="button"
              onClick={() => handleStepSetting("backward")}
            >
              <i className="fa fa-angle-left" />
            </button>

            <h3>{headerText}</h3>

            <button
              type="button"
              id="save"
              onClick={openSaveDraft}
            >
              <i className="fa fa-save" />
            </button>
          </div>

          <div className={`counter step${currentStep}`}>
            {steps.map((step, index) => (
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
                  {step}
                </span>

                {index < steps.length - 1 && (
                  <div
                    className={
                      step < currentStep
                        ? "line completed"
                        : "line"
                    }
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render draft modal
  function renderDraftModal() {
    return (
      <SaveDraftModal
        values={values}
        storageKey={draft_storage_key}
      />
    );
  }

  // Desktop layout
  if (isDesktop) {
    return (
      <main className="quote-builder-page desktop">
        <section className="desktop-hero">
          <div className="desktop-hero__inner">
            <div>
              <p className="eyebrow">Start planning</p>

              <h1>
                <span className="special">Quote</span> Builder
              </h1>

              <p className="hero-copy">
                Create complete window quotations in minutes
              </p>
            </div>

            <div className="hero-mark" aria-hidden="true">
              <i className="fa fa-cubes" />
            </div>
          </div>
        </section>

        <section className="form-actions">
          <button
            type="button"
            className="saveDraftButton"
            onClick={openSaveDraft}
          >
            <i className="fa fa-save" />
            Save Draft
          </button>

          <button
            type="button"
            className="clear-all"
            onClick={clearAll}
          >
            <i className="fa fa-refresh" />
            Clear All
          </button>

          <button
            type="button"
            className="cartButton"
            onClick={() => handleAddToCart()}
          >
            <i className="fa fa-shopping-cart" />
            Add to Cart
          </button>
        </section>

        <form
          className="form"
          onSubmit={(e) => e.preventDefault()}
        >
          <section className="form_section 1">
            <div className="card-heading">
              <div className="card-icon">
                <span>1</span>
              </div>

              <div>
                <p className="eyebrow">About the window</p>
                <h2>Window Details</h2>
              </div>
            </div>

            <div className="form_section_fields">
              {renderWindowDetailsFields()}
            </div>
          </section>

          <section className="form_section 2">
            <div className="card-heading">
              <div className="card-icon">
                <span>2</span>
              </div>

              <div>
                <p className="eyebrow">Which type of glass?</p>
                <h2>Glass Details</h2>
              </div>
            </div>

            <div className="form_section_fields">
              {renderGlassFields()}

              <GlassSizeTip
                windowType={values.windowType}
                sashes={values.sashCount}
                width={values.width}
                height={values.height}
              />
            </div>
          </section>

          <section className="form_section 3">
            <div className="card-heading">
              <div className="card-icon">
                <span>3</span>
              </div>

              <div>
                <p className="eyebrow">Any additional items?</p>
                <h2>Accessories and Add-ons</h2>
              </div>
            </div>

            <div className="form_section_fields">
              {renderAccessoryFields()}
            </div>
          </section>
        </form>

        <Quotation
          values={values}
          onAddToCart={handleAddToCart}
          onSaveDraft={openSaveDraft}
        />

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 0: Introduction
  if (currentStep === 0) {
    return (
      <main className="quote-builder-page">
        {renderCreateQuoteIntro()}

        {renderFormNavi()}

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 1: Window details
  if (currentStep === 1) {
    return (
      <main className="quote-builder-page">
        {renderStepHeader()}

        <form onSubmit={(e) => e.preventDefault()}>
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

        {renderFormNavi()}

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 2: Dimensions and opening
  if (currentStep === 2) {
    return (
      <main className="quote-builder-page">
        {renderStepHeader()}

        <form
          className="quote-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="container">
            <div>
              <h2>Dimensions & Opening</h2>
              <p>Enter the measurements.</p>
            </div>

            <InputField
              label="Overall Width"
              inputType="number"
              id="overall-width"
              name="width"
              value={values.width}
              onChange={handleValues}
              unit="mm"
            />

            <InputField
              label="Overall Height"
              inputType="number"
              id="overall-height"
              name="height"
              value={values.height}
              onChange={handleValues}
              unit="mm"
            />

            <DropdownField
              label="Window Orientation"
              name="orientation"
              classNames={["window-orientation"]}
              options={options.orientation}
              selectedValue={values.orientation}
              onChange={handleValues}
            />

            {values.windowType === "frameless-window" && (
              <RadioField
                label="Matter Transom"
                id="matterTransom"
                name="matterTransom"
                classNames={["matterTransom"]}
                options={options.matterTransom}
                selectedValue={values.matterTransom}
                onChange={handleValues}
              />
            )}

            {values.windowType !== "sliding-window" && (
              <RadioField
                label="Opening Style"
                id="openingStyle"
                classNames={["opening-style"]}
                options={options.openingStyle}
                name="openingStyle"
                selectedValue={values.openingStyle}
                onChange={handleValues}
              />
            )}
          </div>
        </form>

        {renderFormNavi()}

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 3: Glass details
  if (currentStep === 3) {
    return (
      <main className="quote-builder-page">
        {renderStepHeader()}

        <form
          className="quote-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="container">
            <div>
              <h2>Glass Details</h2>
              <p>Choose your glass specifications.</p>
            </div>

            {renderGlassFields()}
          </div>
        </form>

        <GlassSizeTip
          windowType={values.windowType}
          sashes={values.sashCount}
          width={values.width}
          height={values.height}
        />

        {renderFormNavi()}

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 4: Accessories
  if (currentStep === 4) {
    return (
      <main className="quote-builder-page">
        {renderStepHeader()}

        <form
          className="quote-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="container">
            <div>
              <h2>Accessories & Add-ons</h2>
              <p>Select additional items.</p>
            </div>

            {renderAccessoryFields()}
          </div>
        </form>

        {renderFormNavi()}

        {renderDraftModal()}
      </main>
    );
  }

  // Mobile step 5: Review and quotation
  return (
    <main className="quote-builder-page">
      {renderStepHeader()}

      <form
        className="quote-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="container">
          <div>
            <h2>Review & Quotation</h2>
            <p>Review your items and total.</p>
          </div>
        </div>
      </form>

      <Quotation
        values={values}
        onAddToCart={handleAddToCart}
        onSaveDraft={openSaveDraft}
      />

      {renderFormNavi({
        backTo: openSaveDraft,
        nextTo: () => handleAddToCart(),
        backwardText: (
          <>
            <i className="fa fa-save" />
            Save Draft
          </>
        ),
        forwardText: (
          <>
            <i className="fa fa-cart-plus" />
            Add to Cart
          </>
        ),
      })}

      {renderDraftModal()}
    </main>
  );
}

export default QuoteBuilder;
