const InputField = ({
  onChange,
  value,
  name,
  type,
  classList,
  placeHolder,
}) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      className={classList}
      placeholder={placeHolder}
    />
  );
};
export default InputField;
