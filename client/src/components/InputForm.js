import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import Button from "./Button";
import Wrapper from "../assets/wrappers/InputForm";
import { isEmailValid, isPWValid, isRequired, isRetypePWValid, isNameValid } from "../utils/Helpers";

const InputForm = ({ formRows, handleSubmit, btnTitle }) => {
  const { user } = useAppContext();
  //https://codepen.io/Dannzzor/pen/XELxwv


  const [value, setValue] = useState({
    name: {
      value: user ? user.name : "",
      isValid: false,
      errors: [],
    },
    email: {
      value: user ? user.email : "",
      isValid: false,
      errors: [],
    },
    password: { value: "", isValid: false, errors: [] },
    passwordRetype: {
      value: "",
      isValid: false,
      errors: [],
    },
  });

  const handleInputChange = (e) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;

    validateForm(targetName, targetValue);
  };
  const validateForm = (targetName, targetValue) => {
    let newState = { ...value };
    let oTarget = formRows && formRows.find((i) => i.name === targetName);
    newState[targetName].errors = [];
    newState[targetName].value = targetValue;
    if (oTarget.required && isRequired(targetValue)) {
      newState[targetName].errors.push(isRequired(targetValue));
    } else if (targetValue && oTarget.validate) {
      switch (targetName) {
        case "name": 
          let nameErr = isNameValid(targetValue);
          nameErr.length > 0 && newState[targetName].errors.push(nameErr);
          break;
        case "email":
          let emailErr = isEmailValid(targetValue);
          emailErr && newState[targetName].errors.push(emailErr);
          break;
        case "password":
          newState[targetName].errors.push(...isPWValid(targetValue));
          break;
        case "passwordRetype":
          let retypeErr = isRetypePWValid(targetValue, value["password"].value);
          retypeErr && newState[targetName].errors.push(retypeErr);
          break;
      }
    }
    if (newState[targetName].errors.length === 0)
      newState[targetName].isValid = true;
    setValue({ ...newState });
  };

  const allValid = () => {
    return formRows.every(
      (i) => value[i.name].isValid && value[i.name].errors.length === 0
    );
  };

  const handleBeforeSubmit = (e) => {
    e.preventDefault();

    formRows
      .map((i) => i.name)
      .map((name) => validateForm(name, value[name].value));

    if (allValid()) {
      handleSubmit(value);
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleBeforeSubmit}>
        {formRows.map((i, ind) => {
          return (
            <FormRow
              classList={value[i.name].errors.length > 0 ? "has-error" : ""}
              type={i.type}
              name={i.name}
              labelText={i.labelText}
              value={value[i.name].value}
              handleChange={handleInputChange}
              key={`${i.name}-${ind}`}
              errors={value[i.name].errors}
            />
          );
        })}

        <Button
          classList="save-btn float-right-btn"
          type="submit"
          title={btnTitle}
        />
      </form>
    </Wrapper>
  );
};

export default InputForm;
