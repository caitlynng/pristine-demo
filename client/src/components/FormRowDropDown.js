import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import Wrapper from "../assets/wrappers/FormRowDropDown";

const FormRowDropDown = ({
  labelText,
  name,
  value,
  list,
  inputType,
  onClickHandle,
  id,
  defaultChecked
}) => {
  const [isActive, setIsActive] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  if (defaultChecked && selectedItem !== defaultChecked){
    setSelectedItem(defaultChecked)
  }
  const handleSelect = (e) => {
    const val = e.currentTarget.textContent
    setSelectedItem(val);
    onClickHandle(val)
  };

  return (
    <Wrapper isFilter={isActive} id={id}>
      <div
        className="form-label-container flex align-center"
        onClick={() => setIsActive(!isActive)}
        onBlur={() => setIsActive(false)}
        tabIndex="0"
      >
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <span className="form-dropdown-icon">
          <MdKeyboardArrowDown />
        </span>
      </div>
      {isActive && list && (
        <ul value={value} className="form-dropdown-content">
          {list.map((itemValue, ind) => {
            return (
              <li key={itemValue} onMouseDown={handleSelect}>
                <input
                  id={itemValue}
                  type={inputType}
                  value={itemValue}
                  name={name}
                  checked={selectedItem.toLowerCase() === itemValue.toLowerCase()}
                  onChange={() => {}}
                />
                <label htmlFor={`${itemValue}`} >{itemValue}</label>
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default FormRowDropDown;
