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
  defaulChecked
}) => {
  const [isActive, setIsActive] = useState(false);

  const [checkedState, setCheckedState] = useState([]);


  // const handleCheckState = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) => {
  //     let key = Object.keys(item);
  //     if (index === position) {
  //       return { [key]: !item[key] };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setCheckedState(updatedCheckedState);
  //   handleChange({ [name]: updatedCheckedState });
  // };
  return (
    <Wrapper isFilter={isActive}>
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
                  defaultChecked={defaulChecked ?? (ind === 0 && true)}
                  name={name}
                  onChange={() => console.log(value)}
                />
                <label htmlFor={`${itemValue}`}>{itemValue}</label>
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default FormRowDropDown;
