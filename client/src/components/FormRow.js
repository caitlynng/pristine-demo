import Wrapper from "../assets/wrappers/FormRow"

const FormRow = ({ type, name, value, id, handleChange, labelText, errors, classList, handleBlur }) => {

  return (
    <Wrapper >
      <fieldset className="form-row">
        <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        onBlur={handleBlur}
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={handleChange}
        className={classList? `${classList} form-input` : 'form-input'}
      />
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
}

export default FormRow
