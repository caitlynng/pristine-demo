import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Wrapper, DropDownButton } from "../assets/wrappers/IncomeTable.js";
import { currencyFormatter } from "../utils/Helpers";
import InputField from "./InputField";
import Button from "./Button";
import { MdKeyboardArrowRight, MdOutlineInfo } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import Loading from "./Loading";

const IncomeTable = () => {
  const {
    statementTable_SalesData,
    dashboardTable_TotalSales,
    statementTable_ExpensesData,
    dashboardTable_TotalExpenses,
    cogs,
    dashboardTable_TotalProfits,
    isLoading,
    showDemoMessage,
  } = useAppContext();
  const [expanded, setExpanded] = useState({
    expandedRows: [],
  });
  const [allExpanded, setAllExpanded] = useState({
    expenses: false,
    sales: false,
  });
  const [COGS, setCOGS] = useState(0);
  const [selection, showSelection] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setCOGS(cogs);
  }, [cogs]);

  const handleSave = (e) => {
    e.preventDefault();
    const key = e.target.innerText.toLowerCase();
    if (!key || key === "") return;
    if (COGS === "" || COGS === cogs || COGS === 0) return;
    switch (key) {
      case "cancel":
      case "save":
        showSelection(!selection);
        break;
      case "overwrite":
      case "add on":
        showDemoMessage();
        setCOGS(cogs);
        showSelection(!selection);
        break;
      default:
        break;
    }
    setDisabled(true);
  };
  const handleCOGS = ({ target }) => {
    setDisabled(false);
    setCOGS(target.value);
  };
  const compareArrays = (arr, target) => target.every((v) => arr.includes(v));
  const expenses_IDs = statementTable_ExpensesData.map((i) => i._id);
  const sales_IDs = statementTable_SalesData.map((i) => i._id);
  const isExpandedAll = (arr, category) => {
    let target = category === "expenses" ? expenses_IDs : sales_IDs;
    compareArrays(arr, target)
      ? setAllExpanded({ ...allExpanded, [category]: true })
      : setAllExpanded({ ...allExpanded, [category]: false });
  };
  const getUserSelection = () => {
    return (
      <div className="user-selection-container alert alert-info">
        <p>Do you want to overwrite or add on top of the current cost?</p>
        <div className="select-btn-container">
          <Button
            title="overwrite"
            onSetActive={handleSave}
            classList="save-btn"
          />
          <Button
            title="add on"
            onSetActive={handleSave}
            classList="save-btn"
          />
          <Button
            title="cancel"
            classList="btn-cancel"
            onSetActive={handleSave}
          />
        </div>
      </div>
    );
  };
  const getDashBoardTable = (data, total, category) => {
    const handleExpand = (item) => {
      let newExpandedRows = [...expanded.expandedRows];
      let allExpanded = expanded.allExpanded;
      let idxFound = newExpandedRows.findIndex((id) => {
        return id === item._id;
      });
      if (idxFound > -1) {
        newExpandedRows.splice(idxFound, 1);
      } else {
        newExpandedRows.push(item._id);
      }
      setExpanded({ expandedRows: [...newExpandedRows] });
      isExpandedAll(newExpandedRows, category);
    };

    const isExpanded = (item) => {
      const idx = expanded.expandedRows.find((id) => {
        return id === item._id;
      });
      return idx > -1;
    };

    const expandAll = (item, category) => {
      let newExpandedRows = item.map((i) => i._id);
      //remove item if currently expanded
      if (compareArrays(expanded.expandedRows, newExpandedRows)) {
        newExpandedRows = expanded.expandedRows.filter(
          (i) => newExpandedRows.indexOf(i) === -1
        );
        setExpanded({ expandedRows: [...newExpandedRows] });
        isExpandedAll(newExpandedRows, category);
      } else {
        setExpanded({
          expandedRows: [...expanded.expandedRows, ...newExpandedRows],
        });
        isExpandedAll(newExpandedRows, category);
      }
    };
    const getRows = (item, lastItem) => {
      let rows = [];
      const subRows = item.subRows || [];
      const firstRow = (
        <>
          <div className="col-1 col" onClick={() => handleExpand(item)}>
            {item.category}
          </div>
          <div className="col-2 col"></div>
          <div className="col-3 col">
            {currencyFormatter.format(item.total).replace(/\.00$/, "")}
          </div>
        </>
      );
      rows.push(firstRow);
      if (isExpanded(item) && subRows.length > 0) {
        const subRowList = subRows.map((i, ind) => (
          <>
            <div className="sub-col col-italic col-1">{i.type}</div>
            {lastItem && category === "expenses" ? (
              <>
                <form className="col-italic col-2 statements__form">
                  <span>$</span>
                  <InputField
                    onChange={handleCOGS}
                    value={COGS}
                    type="number"
                  />
                  <div className="tooltip upload-requirement">
                    <FaInfo className="fill-primary" />
                    <div className="tooltiptext right">
                      <div>
                        <b>Direct Material Cost</b> refers to the amount of
                        money your bussiness spends on the production of goods
                        or services. <br></br> 
                        <div>Please select the desired time
                        frame before updating your cost.</div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="statements__btn-container">
                  <Button
                    classList="save-btn small col-3"
                    onSetActive={handleSave}
                    title="save"
                    disabled={disabled}
                  />
                </div>
              </>
            ) : (
              <div className="col-italic col-2">
                {currencyFormatter.format(i.total).replace(/\.00$/, "")}
              </div>
            )}
          </>
        ));
        rows.push(subRowList);
      }
      return rows;
    };

    const getTableBody = data.map((i, index) => {
      let lastItem = false;
      if (data.length === index + 1) {
        lastItem = true;
      }
      return getRows(i, lastItem);
    });

    return (
      <>
        <DropDownButton
          className="title bold-text"
          onClick={() => expandAll(data, category)}
          isFilter={
            category === "sales" ? allExpanded.sales : allExpanded.expenses
          }
        >
          <span className="category-btn">{category}</span>
          <span className="dropdown-icon">
            <MdKeyboardArrowRight />
          </span>
        </DropDownButton>

        {getTableBody}
      </>
    );
  };
  return (
    <Wrapper className="item-box">
      {isLoading && <Loading center />}
      <div className="statement-table-container">
        <div className="statement-table">
          {getDashBoardTable(
            statementTable_SalesData,
            dashboardTable_TotalSales,
            "sales"
          )}
          <span className="col-2 bold-text">Total: </span>
          <span className="col-3 bold-text ">
            {currencyFormatter
              .format(dashboardTable_TotalSales)
              .replace(/\.00$/, "")}
          </span>
          {getDashBoardTable(
            statementTable_ExpensesData,
            dashboardTable_TotalExpenses,
            "expenses"
          )}
          {selection && getUserSelection()}
          <span className="col-2 bold-text">Total: </span>
          <span className="col-3 bold-text ">
            {currencyFormatter
              .format(dashboardTable_TotalExpenses)
              .replace(/\.00$/, "")}
          </span>
          <span className="col-2 bold-text border no-border-right">
            Total Profits:{" "}
          </span>
          <span className="col-3 bold-text border highlight no-border-left">
            {currencyFormatter
              .format(dashboardTable_TotalProfits)
              .replace(/\.00$/, "")}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};
export default IncomeTable;
