import { IncomeTable, DatePicker } from "../../components";
import Wrapper from "../../assets/wrappers/Statements.js";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const Statements = () => {
  const { handleDateChange } = useAppContext();

  useEffect(() => {
    handleDateChange();
  }, []);

  return (
    <Wrapper className="max-width statements-joyride">
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Statements</h4>
        <div className="date-picker-container">
        </div>
      </div>
      <IncomeTable />
    </Wrapper>
  );
};

export default Statements;
