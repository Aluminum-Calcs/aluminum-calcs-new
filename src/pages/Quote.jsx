import { useContext, useEffect, useState } from "react";
import { PageContext } from "../context/PageContext";
import "../scss/pages/Quote.scss";
import "../scss/components/FormNavi.scss";
import quoteImg from '../assets/images/ehiejakhian.jpg';
import { NavLink } from "react-router";
import InputField, { CheckboxField, ImageRadioField, DropdownField } from '../components/InputField.jsx';

function QuoteBuilder() {
  const { theme, setCurrentPage } = useContext(PageContext);
  const [currentStep, setCurrentStep] = useState(0);
  let steps = [1, 2, 3, 4, 5];
  
  let windowTypes = [
    {
      value: 'sliding-window',
      image: 'img'
    },
    {
      value: 'casement-window',
      image: 'img'
    },
    {
      value: 'frameless-window',
      image: 'img'
    },
  ];

  let sashes = [
    { value: '1-sash' },
    { value: '2-sashes', default: true},
    { value: '3-sashes' },
  ];
  
  useEffect(() => {
    setCurrentPage('Quote Builder');
  });

  function handleStepSetting(path) {
    if (path == 'backward') {
      currentStep == 0
        ? setCurrentStep(0)
        : setCurrentStep(currentStep - 1);
    } else {
      currentStep == 5
        ? setCurrentStep(5)
        : setCurrentStep(currentStep + 1);
    }
  }

  
  if (currentStep == 0) {
    return (
      <main className="quote-builder-page">
        <CreateQuoteIntro/>
        <FormNavi/>
      </main>
    )
  } else if (currentStep == 1) {
    return <main className="quote-builder-page">
      <StepHeader />
      <form>
        <div className="container">
          <div>
            <h2>Window details</h2>
            <p>Tell us about the  window.</p>
          </div>
          <ImageRadioField
            name="window-type"
            options={windowTypes}
            label="Window Type"
          />
          <DropdownField
            label="No of Sashes"
            name='sash-select'
            value='2 Sashes'
            options={sashes}
          />
        </div>

      </form>
      <FormNavi/>
    </main>
  } else if (currentStep == 2) {
    return <main className="quote-builder-page">
      <StepHeader />
      <form className="quote-form">
        <div className="container">
          <div>
            <h2>Dimensions &amp; Opening</h2>
            <p>Enter the measurements.</p>
          </div>
          <InputField
            inputType="number"
            id='overall-width'
            value='1200'
          />
          <InputField
            inputType="number"
            id='overall-height'
            value='1200'
          />
          <InputField
            inputType="dropdown"
            id='Window-orientation'
            value='Horizontal'
          />
          <CheckboxField
            id='matter-transom'
            classNames={['matter-transom']}
            options={[
              { val: 'yes' },
              {val: 'no'}
            ]}
            name='matter-transom'
            selectedValue='yes'
          />
          <CheckboxField
            id='opening-style'
            classNames={['opening-style']}
            options={[
              { val: 'left open' },
              { val: 'right open' },
              {val: 'both'}
            ]}
            name='opening-style'
            selectedValue='both'
          />
        </div>
      </form>
      <FormNavi/>
    </main>
  } else if (currentStep == 3) {
    return <main className="quote-builder-page">
      <StepHeader />
      <form className="quote-form">
        <div className="container">
          <div>
            <h2>Glass Details</h2>
            <p>Choose your glass specifications.</p>
          </div>
          <InputField
            inputType="dropdown"
            id='Glass-thickness'
            value='4mm'
          />
          <InputField
            inputType="dropdown"
            id='Glass-color'
            value='Blue'
          />
          <InputField
            inputType="dropdown"
            id='Glass-type'
            value='Float Glass'
          />
          <InputField
            inputType="number"
            id='Glass-quantity'
            value='2'
          />
        </div>
      </form>
      <FormNavi/>
    </main>
  } else if (currentStep == 4) {
    return <main className="quote-builder-page">
      <StepHeader />
      <form className="quote-form">
        <div className="container">
          <div>
            <h2>Accesories &amp; Add-ons</h2>
            <p>Select additional items.</p>
          </div>
          <InputField
            inputType="dropdown"
            id='Glass-thickness'
            value='4mm'
          />
          <InputField
            inputType="dropdown"
            id='Glass-color'
            value='Blue'
          />
          <InputField
            inputType="dropdown"
            id='Glass-type'
            value='Float Glass'
          />
          <InputField
            inputType="number"
            id='Glass-quantity'
            value='2'
          />
        </div>
      </form>
      <FormNavi/>
    </main>
  } else if (currentStep == 5) {
    return <main className="quote-builder-page">
      <StepHeader />
      <form className="quote-form">
        <div className="container">
          <div>
            <h2>Review &amp; Quotation</h2>
            <p>Review your items and total.</p>
          </div>
        </div>
      </form>
      <FormNavi/>
    </main>
  }


  function CreateQuoteIntro() {
    return <section className="intro">
      <div className="container">
        <div className="left">
          <h1><span className="special">Quote</span> Builder</h1>
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
          {/* <img src={quoteImg} alt="quote illustration" className="quote_hero_img" /> */}
        </div>
      </div>
    </section>
  }

  function FormNavi() {
    return (
      <section className="form-navigation">
        <div className="container">
          {currentStep > 0 &&
          <button
            className="backward"
            onClick={() => handleStepSetting('backward')}
          >
            <i className="fa fa-chevron-left"></i>
            Back
          </button>
          }
          {currentStep == 0
            ? <button
              className='forward'
              onClick={()=> handleStepSetting('forward')}>
              Create a Quote
              <i className="fa fa-chevron-right"></i>
            </button>
            : <button
              className='forward'
              onClick={()=> handleStepSetting('forward')}>
              Next
              <i className="fa fa-chevron-right"></i>
            </button>
          }
        </div>
      </section>
    )
  }

  function StepHeader({
    headerText='New Quote',
  }) {
    return <section className="form-header">
      <div className="container">
        <div className="nav">
          <button onClick={()=> handleStepSetting('backward')}><i className="fa fa-angle-left"></i></button>
          <h3>{headerText}</h3>
          <button id="save">
            <i className="fa fa-save"></i>
          </button>
        </div>
        <div className={`counter step${currentStep}`}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </section>
  }
}





export default QuoteBuilder;