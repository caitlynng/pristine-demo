import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useRef } from "react";
import Wrapper from "../assets/wrappers/FormRowDropDown";
import { useClickOutsideComponent } from "../utils/Helpers";

const FormRowDropDown = ({
  labelText,
  name,
  value,
  list,
  inputType,
  onClickHandle,
  id,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [selectedItem, setSelectedItem] = useState(list[0]);

  const handleSelect = (e) => {
    const val = e.target.textContent
    setSelectedItem(val);
    onClickHandle(val)
  };

  return (
    <Wrapper isFilter={isActive} id={id}>
      <div
        className="form-label-container"
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
              <li key={itemValue}>
                <input
                  id={itemValue}
                  type={inputType}
                  value={itemValue}
                  name={name}
                  checked={selectedItem === itemValue}
                  onChange={() => {}}
                />
                <label htmlFor={`${itemValue}`} onMouseDown={handleSelect}>{itemValue}</label>
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default FormRowDropDown;
