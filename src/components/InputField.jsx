
import { Fragment, useContext } from "react";
import "../scss/components/InputField.scss";
import { PageContext } from "../context/PageContext";

function InputField({
  inputType = "number",
  id,
  name,
  label,
  val,
  value,
  placeholder = "",
  unit,
  msgType,
  msg,
  onChange,
}) {
  const { theme } = useContext(PageContext);

  const fieldName = name ?? id;
  const fieldValue = value ?? val ?? "";

  function handleChange(e) {
    const nextValue = e.target.value;
    onChange?.(fieldName, nextValue);
  }

  const [showPassword, setShowPassword] = [false, null];

  return (
    <div className="InputField">
      <div className={`InputField__container ${theme}`}>
        <input
          type={inputType}
          id={`${id}_input`}
          name={fieldName}
          value={fieldValue}
          onChange={handleChange}
          placeholder={placeholder}
        />

        <label htmlFor={`${id}_input`}>
          {label || id?.replaceAll("-", " ")}
        </label>

        {inputType === "password" && (
          <button
            type="button"
            onClick={() => {}}
          >
            Show
          </button>
        )}

        {unit && (
          <span className="input_unit">{unit}</span>
        )}
      </div>

      {msg && (
        <div className={`error-message ${id}Error ${msgType || ""}`}>
          {msg}
        </div>
      )}
    </div>
  );
}

export function RadioField({
  label,
  id,
  classNames = [],
  options = [],
  name,
  selectedValue,
  onChange,
}) {
  return (
    <fieldset
      id={id}
      className={`RadioField ${classNames.join(" ")}`}
    >
      <legend>
        {label || id?.replaceAll("-", " ")}
      </legend>

      <div className="types">
        {options.map((option, index) => (
          <Radio
            key={index}
            data={option}
            name={name}
            selectedValue={selectedValue}
            onChange={onChange}
          />
        ))}

        <div className="error-msg">
          Please select an option
        </div>
      </div>
    </fieldset>
  );
}

function Radio({
  data,
  name,
  selectedValue,
  onChange,
}) {
  const value = data?.value ?? "Option";
  const inputId = `${name}-${value}`;

  return (
    <label htmlFor={inputId}>
      <input
        type="radio"
        name={name}
        id={inputId}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange?.(name, value)}
      />

      <span>{String(value).replaceAll("-", " ")}</span>
    </label>
  );
}

export function ImageRadioField({
  label,
  options = [],
  name,
  selectedValue,
  onChange,
  classNames = [],
}) {
  return (
    <fieldset
      className={`image-radio-field ${classNames.join(" ")}`}
    >
      <legend>{label}</legend>

      <div className="options">
        {options.map((option, index) => {
          const inputId = `${name}-${option.value}`;

          return (
            <Fragment key={inputId}>
              <input
                type="radio"
                name={name}
                id={inputId}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() =>
                  onChange?.(name, option.value)
                }
              />

              <label htmlFor={inputId}>
                {option.image && (
                  <img
                    src={option.image}
                    alt={String(option.value)}
                  />
                )}

                <span>
                  {String(option.value).replaceAll("-", " ")}
                </span>
              </label>
            </Fragment>
          );
        })}
      </div>
    </fieldset>
  );
}

export function DropdownField({
  label,
  name,
  value,
  options = [],
  classNames = [],
  onChange,
}) {
  const selectedValue =
    value ??
    options.find((option) => option.default)?.value ??
    options[0]?.value ??
    "";

  function handleChange(e) {
    const selectedOption = options.find(
      (option) => String(option.value) === e.target.value
    );

    onChange?.(
      name,
      selectedOption?.value ?? e.target.value
    );
  }

  return (
    <div className={`dropdown-field ${classNames.join(" ")}`}>
      <div className="container">
        <label htmlFor={name}>
          {label?.replaceAll("-", " ") || name}
        </label>

        <select
          name={name}
          id={name}
          value={String(selectedValue)}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={String(option.value)}
            >
              {String(option.value).replaceAll("-", " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ImageCheckboxField({
  label = "Image Checkbox Field",
  name = "name",
  info = "Lorem ipsum dolor sit amet",
  classNames = [],
  image,
  icon,
  selected = false,
  onChange,
  includeInfo,
}) {
  const isDisabled = classNames.includes("disable");

  function handleTicking() {
    if (isDisabled) return;

    if (!includeInfo) return;

    onChange?.(
      includeInfo.groupName,
      includeInfo.value
    );
  }

  return (
    <div
      className={`image-checkbox-field ${classNames.join(" ")}`}
      id={`parent-of-${name}`}
    >
      {image && (
        <img src={image} alt={label} />
      )}

      {!image && icon && icon}

      <div className="info">
        <label htmlFor={name}>
          <h4>{label.replaceAll("-", " ")}</h4>
        </label>

        {info && <p>{info}</p>}
      </div>

      <input
        type="checkbox"
        name={name}
        id={name}
        checked={Boolean(selected)}
        disabled={isDisabled}
        onChange={handleTicking}
      />
    </div>
  );
}

export default InputField;
