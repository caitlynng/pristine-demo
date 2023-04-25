import Wrapper from "../assets/wrappers/FormRow";

const FormRow = ({
  type,
  name,
  value,
  id,
  handleChange,
  labelText,
  errors,
  classList,
  handleBlur,
}) => {
  return (
    <Wrapper>
      <fieldset className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        {type === "textarea" ? (
          <textarea
            onBlur={handleBlur}
            value={value}
            id={id}
            onChange={handleChange}
            className={classList ? `${classList} form-input textarea-height` : "form-input textarea-height"}
          />
        ) : (
          <input
            onBlur={handleBlur}
            type={type}
            value={value}
            name={name}
            id={id}
            onChange={handleChange}
            className={classList ? `${classList} form-input input-height` : "form-input input-height"}
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
