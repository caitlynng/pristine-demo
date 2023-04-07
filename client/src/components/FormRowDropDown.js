import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useRef } from "react";
import Wrapper from "../assets/wrappers/FormRowDropDown";
import { useClickOutsideComponent } from "../utils/Helpers";

const FormRowDropDown = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  inputType,
  isChecked,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [checkedState, setCheckedState] = useState([]);


  if (checkedState.length === 0 && checkedState !== isChecked) {
    setCheckedState(isChecked);
  }

  const handleCheckState = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      let key = Object.keys(item);
      if (index === position) {
        return { [key]: !item[key] };
      } else {
        return item;
      }
    });
    setCheckedState(updatedCheckedState);
    handleChange({ [name]: updatedCheckedState });
  };
  return (
    <Wrapper isFilter={isActive}>
      <div
        className="form-label-container"
        onClick={() => setIsActive(!isActive)}
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
              <li key={`${itemValue}+${ind}`}>
                <input
                  type={inputType}
                  value={itemValue}
                  checked={Object.values(checkedState[ind])[0]}
                  name={name}
                  onChange={() => handleCheckState(ind)}
                />
                <label htmlFor={`${itemValue}+${ind}`}>{itemValue}</label>
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default FormRowDropDown;
