import Wrapper from "../assets/wrappers/FormRow";

const FormRow = ({
  component = "input",
  name,
  value,
  labelId = "",
  handleChange,
  labelText,
  errors,
  classNames = [],
  handleBlur,
  checked,
  ...otherProps
}) => {
  const inputId = labelId ? `${labelId}-input` : `${name}-input`;
  const inputClassNames = classNames.concat([`${component}-height`]);
  return (
    <Wrapper>
      <fieldset className="form-row">
        <label htmlFor={inputId} className="form-label">
          {labelText || name}
        </label>
        {component === "textarea" ? (
          <textarea
            onBlur={handleBlur}
            value={value}
            id={inputId}
            onChange={handleChange}
            className={`form-input ${inputClassNames.join(" ")}`}
            name={name}
          />
        ) : component === "checkbox" || component === "radio" ? (
          <input
            type={component}
            name={name}
            value={value}
            id={inputId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${inputClassNames.join(" ")}`}
            checked={checked}
            {...otherProps}
          />
        ) : (
          <input
            onBlur={handleBlur}
            type={component}
            value={value}
            name={name}
            id={inputId}
            onChange={handleChange}
            className={`form-input ${inputClassNames.join(" ")}`}
          />
        )}
      </fieldset>
      {errors &&
        errors.length > 0 &&
        errors.map((err, i) => (
          <div key={i} className="error-message">
            <span> &#10006; </span>
            <span>{err}</span>
          </div>
        ))}
    </Wrapper>
  );
};

export default FormRow;
