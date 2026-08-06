
import { useContext, useEffect, useState } from "react"
import "../scss/components/InputField.scss";
import { PageContext } from "../context/PageContext";

function InputField({
  inputType = "number",
  id,
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
          {id && id.replace('-', ' ')}
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

export function CheckboxField({
  id,
  classNames = [],
  options = [],
  name,
  selectedValue,
  onChange,
}) {
  // console.log(selectedValue);
  // useEffect(() => {
  //   selectedValue = selectedValue;
  // },[selectedValue]);

  return (
    <fieldset id={id} className={`checkbox-field ${classNames.join(" ")}`}>
      <legend>{id.replace('-',' ')}</legend>

      <div className="types">
        {options.map((option, key) => (
          <Checkbox
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

function Checkbox({ data, name, selectedValue, onChange }) {
  const value = data?.val ?? "Option";

  return (
    <label htmlFor={value}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={selectedValue === value}
        onChange={() => {
          onChange(value);
          console.log(data, selectedValue, value, selectedValue === value);
        }}
      />
      <span>{value.replace('-'," ")}</span>
    </label>
  );
}

export function ImageRadioField({
  options = [],
  label = 'Image Radio Field',
  name = 'radio-field',
  classNames = [],
  selectedValue = 'none',
  onchange,
}) {
  return <fieldset className={`image-radio-field ${classNames && classNames.join(' ')}`}>
    <legend>{label}</legend>
    <div className="options">
      {options && options.map((option,i) =>
        <label htmlFor="something" key={i}>
          <input type="radio" name={name} id={`${name}-1`}/>
          <img src={option.image} alt={option.image} />
          <span>{option.value.replace('-', ' ')}</span>
        </label>
      )}
    </div>
  </fieldset>;
}

export function DropdownField({
  label = 'Dropdown field',
  name = 'drop-down',
  options = [],
  classNames = [],
}) {
  return <div className={`dropdown-field ${classNames.join(' ')}`}>
    <div className="container">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        {options && options.map((option, i) => <option key={i} value={option.value} selected={option.default ? true : false}>
          {option.value.replace('-', ' ')}
        </option>)}
      </select>
    </div>
  </div>;
}

export default InputField;