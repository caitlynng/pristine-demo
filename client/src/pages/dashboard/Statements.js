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
    <Wrapper className="max-width">
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Statements</h4>
        <div className="date-picker-container">
          <DatePicker />
        </div>
      </div>
      <IncomeTable />
    </Wrapper>
  );
};

export default Statements;
