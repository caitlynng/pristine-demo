import Wrapper from "../assets/wrappers/FilterFormContainer";
import FormRowDropDown from "./FormRowDropDown";
import { useAppContext } from "../context/appContext.js";
import { useState, useEffect, useRef } from "react";
import { useClickOutsideComponent } from "../utils/Helpers";
import Button from "./Button";

const FilterFormContainer = ({ setIsActive, isActive }) => {
  const { filterHeaders, isCheckedHeaders, handleHeadersChange, reportData } =
    useAppContext();

  const [checkedState, setCheckedState] = useState([]);

  if (checkedState.length === 0 && checkedState !== isCheckedHeaders) {
    setCheckedState(isCheckedHeaders);
  }

  const wrapperRef = useRef(null);
  useClickOutsideComponent(wrapperRef, setIsActive);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsActive(false);
    handleHeadersChange(checkedState, reportData);
  };
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
  };
  const handleCheckSelect = (cond) => {
    const check = checkedState.map((i) => {
      let key = Object.keys(i);
      return { [key]: cond };
    });
    setCheckedState(check);
  };

  useEffect(() => {}, [filterHeaders, isCheckedHeaders]);

  return (
    <Wrapper isActive={isActive} ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="form-center">
          <div className="header-container">
            <div className="bold-text">Active Headers:</div>
            <Button
              type="button"
              title="select all"
              classList="select-btn"
              onSetActive={() => handleCheckSelect(true)}
            />
            <Button
              type="button"
              title="deselect all"
              classList="select-btn"
              onSetActive={() => handleCheckSelect(false)}
            />
          </div>
          <ul className="form-items">
            {filterHeaders &&
              checkedState.length > 0 &&
              filterHeaders.map((itemValue, ind) => {
                return (
                  <li key={`${itemValue}-${ind}`}>
                    <input
                      id={`${itemValue}-${ind}`}
                      type="checkbox"
                      value={itemValue}
                      checked={Object.values(checkedState[ind])[0]}
                      name="headerFields"
                      onChange={() => handleCheckState(ind)}
                    />
                    <label htmlFor={`${itemValue}-${ind}`}>{itemValue}</label>
                  </li>
                );
              })}
          </ul>
        </div>
        <Button type="submit" title="apply" classList="save-btn float-right-btn" />
      </form>
    </Wrapper>
  );
};

export default FilterFormContainer;
