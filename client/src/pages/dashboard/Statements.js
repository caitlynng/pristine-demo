import { IncomeTable, DatePicker } from "../../components";
import Wrapper from "../../assets/wrappers/Statements.js";
import {useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const Statements = () => {
  const { handleDateChange } = useAppContext();

  useEffect(() => {
    handleDateChange();
  }, []);

  return (
    <Wrapper className="max-width statements-joyride">
      <div className="page-header">
        <h2 className="page-title">Statements</h2>
        <div className="date-picker-container">
          <DatePicker />
        </div>
      </div>
      <IncomeTable />
    </Wrapper>
  );
};

export default Statements;
