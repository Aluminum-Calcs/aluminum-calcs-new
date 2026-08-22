
import { Fragment, useContext, useEffect, useState } from "react"
import "../scss/components/InputField.scss";
import { PageContext } from "../context/PageContext";

function InputField ({
  inputType = "number",
  id,
  label,
  val,
  value,
  msgType,
  msg,
  onChange
}) {
  const { theme } = useContext(PageContext);
  const [valueState, setValueState] = useState(value ?? val ?? "");

  useEffect(() => {
    setValueState(value ?? val ?? "");
  }, [value, val]);

  function handleChange(e) {
    setValueState(e.target.value);
    if (onChange) onChange(e.target.value);
  }

  return (
    <div className="InputField">
      <div className={`InputField__container ${theme}`}>
        <input
          type={inputType}
          id={`${id}_input`}
          value={valueState}
          onChange={handleChange}
        />
        <label
          htmlFor={`${id}_input`}>
          { label
            ? label
            : id && id.replace('-', ' ')
          }
        </label>
      </div>

      <div
        className={`error-message ${id}Error ${msgType && msgType}`}>
        {(msg)
          ? msg
          : <>Please input a valid number</>
        }
        
      </div>
    </div>
  )
}

export function RadioField({
  id,
  classNames = [],
  options,
  name,
  selectedValue,
  onChange,
}) {
  // useEffect(() => {
  //   selectedValue = selectedValue;
  // },[selectedValue]);
  // console.log(options, selectedValue, name, onChange);

  return (
    <fieldset id={id} className={`RadioField ${classNames.join(" ")}`}>
      <legend>{id.replace('-',' ')}</legend>

      <div className="types">
        {options.map((option, key) => (
          <Radio
            data={option}
            key={key}
            name={name}
            selectedValue={selectedValue}
            onChange={onChange}
          />
        ))}

        <div className="error-msg">Please select an option</div>
      </div>
    </fieldset>
  )
}

function Radio({ data, name, selectedValue, onChange }) {
  const value = data?.value ?? "Option";

  function handleChange() {
    if (!onChange) return;
    if (onChange.length === 2) {
      onChange(name, value);
    } else {
      onChange(value);
    }
  }

  return (
    <label htmlFor={value}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={selectedValue === value}
        onChange={handleChange}
      />
      <span>{value.replace('-'," ")}</span>
    </label>
  );
}

export function ImageRadioField({
  label, // String
  options, // Array
  name,
  selectedValue, // String
  onChange, // Function handleValues(name, value)
  classNames,
}) {

  return <fieldset className={`image-radio-field ${classNames && classNames.join(' ')}`}>
    <legend>{label}</legend>
    <div className="options">
      {options && options.map((option, i) =>
      
        <Fragment key={i}>
          <input
            type="radio"
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            onChange={() => {
              if (!onChange) return;
              if (onChange.length === 2) {
                onChange(name, option.value);
              } else {
                onChange(option.value);
              }
            }}
            checked={selectedValue === option.value}
          />
          
          <label htmlFor={`${name}-${option.value}`} key={i}>
            {option.image && <img src={option.image} alt={option.image} />}
            <span>{option.value.replace('-', ' ')}</span>
          </label>
        </Fragment>
      )}
    </div>
  </fieldset>;
}

export function DropdownField({
  label,
  name,
  value,
  options,
  classNames,
  onChange,
}) {
  return <div className={`dropdown-field ${classNames && classNames.join(' ')}`}>
    <div className="container">
      <label htmlFor={name}>{label.replace('-', ' ')}</label>
      <select
        name={name}
        id={name}
        onChange={(e) => {
          if (!onChange) return;
          if (onChange.length === 2) {
            onChange(name, e.target.value);
          } else {
            onChange(e.target.value);
          }
        }}
      >
        {options && options.map((option, i) => <option
          key={i}
          value={option.value} selected={value === option.value}
        >
          {option.value.replace('-', ' ')}
        </option>)}
      </select>
    </div>
  </div>;
}

export function ImageCheckboxField({
  label='Image Checkbox Field',
  name = 'name',
  info = 'Lorem ipsium donor sit amet',
  onChange,
  classNames = [],
  image,
  selected=false,
}) {
  
  return <div className="image-checkbox-field" id={`parent-of-${name}`}>
    {image && <img src={image} alt={image} />}
    <div className="info">
      <label htmlFor={name}>{label.replace('-', ' ')}</label>
      {info && <p>{info}</p>}
    </div>

    <input type="checkbox" name={name} id={name} />
  </div>
}

export default InputField;