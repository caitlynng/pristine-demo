import { useEffect, useState } from "react";
import { Wrapper, LegendItem } from "../assets/wrappers/SideChart.js";
import { useAppContext } from "../context/appContext.js";
import { useElementSize, currencyFormatter } from "../utils/Helpers.js";
import { MultiColorBar, DoughnutChart, Button } from "./index.js";
import ContentPill from "./ContentPill.js";

const SideChart = () => {
  const {
    dashboardDoughnutChart_SalesData,
    dashboardDoughnutChart_ExpensesData,
    dashboardTable_TotalSales,
    dashboardTable_TotalExpenses,
    screenSize,
    noData,
    dashboardTable_TotalProfits,
  } = useAppContext();

  const [dataset, setDataset] = useState(dashboardDoughnutChart_SalesData);
  const [redraw, setRedraw] = useState(false); //for chart redraw, update when button is clicked
  const [active, setActive] = useState("Sales");

  //create a deep copy of data to prevent our defined functions from mutating the data array order
  let deepCopy = JSON.parse(JSON.stringify(dataset));

  const dataSum =
    active === "Sales"
      ? dashboardTable_TotalSales
      : dashboardTable_TotalExpenses;
  const profitPercentage =
    dashboardTable_TotalProfits && dashboardTable_TotalSales
      ? (
          (dashboardTable_TotalProfits / dashboardTable_TotalSales) *
          100
        ).toFixed(0)
      : 0;

  //reorganize labels to match new sorted data array
  const swapElement = (labels, sortedArr) => {
    if (labels && sortedArr) {
      return sortedArr.map((i) => labels[i]);
    }
  };

  //sort array descendantly
  const sortedDataList = (arr) => {
    if (arr && arr.length > 0) {
      return arr.sort((a, b) => b - a);
    }
  };

  const stripFloatToPrecision = (number) => {
    return +parseFloat(number).toPrecision(7);
  };
  const roundListTo100 = (arr, decimal) => {
    if (arr) {
      let hundredPercent = 100;
      const roundedList = arr.map((num) => {
        //convert dataset num to percentage
        const numToPercentage = +((num / dataSum) * 100).toFixed(decimal);

        const leftOver = hundredPercent - numToPercentage;
        if (leftOver > 0) {
          hundredPercent = stripFloatToPrecision(
            hundredPercent - numToPercentage
          );
          //https://stackoverflow.com/questions/10713878/decimal-subtraction-problems-in-javascript
          //https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
          //https://floating-point-gui.de/
          return numToPercentage;
        } else {
          return hundredPercent;
        }
      });
      return roundedList;
    }
  };

  const sortedDeepCopy = sortedDataList(deepCopy.data);
  const roundedToTwoDecimal_DatasetList = roundListTo100(sortedDeepCopy, 2);

  //get index of original array
  const originalIndex = (arr, originalArr) => {
    if (arr && originalArr) {
      return arr.map((i) => originalArr.indexOf(i));
    }
  };
  const indexArray = originalIndex(sortedDeepCopy, dataset.data);
  //reorganize the labels array to match sorted data array
  deepCopy.labels = swapElement(deepCopy.labels, indexArray);

  const setCategoryHandle = (e) => {
    const value = e.currentTarget.attributes.category.value;
    setRedraw(true);
    if (value === "Expenses") {
      setDataset(dashboardDoughnutChart_ExpensesData);
    } else {
      setDataset(dashboardDoughnutChart_SalesData);
    }
    setActive(value);
  };

  const getLegendDisplay = (item, index) => {
    return (
      <LegendItem color={backgroundColor[index]} key={index}>
        <span className="legend-color-box"></span>
        <span className="legend-content">{item}</span>
      </LegendItem>
    );
  };
  const getBGColor = (arr) => {
    if (arr) {
      const bgcArr = arr.map((i) => (i < 1 ? "#c9a337" : "#f2f2f2"));
      return ["#495057", "#6c757d", "#adb5bd", ...bgcArr];
    }
  };
  const backgroundColor = getBGColor(roundedToTwoDecimal_DatasetList);

  //compute inside padding for chart
  const getPadding = () => {
    if (screenSize >= 450 && screenSize < 1000) {
      return Math.round(((screenSize * 2) / 3) * 0.19);
    }
    if (screenSize > 1000 && screenSize < 1300) {
      return 30;
    }
    return 90;
  };

  const contentPillData = [
    {
      title: "Sales",
      total: dashboardTable_TotalSales,
      key: 0,
    },
    {
      title: "Expenses",
      total: dashboardTable_TotalExpenses,
      key: 1,
    },
  ];
  useEffect(() => {
    setDataset(dashboardDoughnutChart_SalesData);
  }, [
    dashboardDoughnutChart_SalesData,
    dashboardDoughnutChart_ExpensesData,
    dashboardTable_TotalSales,
    dashboardTable_TotalExpenses,
    screenSize,
    noData,
    dashboardTable_TotalProfits,
  ]);
  return (
    <Wrapper className="item-box">
      <div className="contentpill-container">
        {contentPillData.map((i, ind) => {
          return (
            <ContentPill
              category={i.title}
              onClickHandle={(e) => setCategoryHandle(e)}
              total={i.total}
              active={active === i.title}
              key={ind}
            />
          );
        })}
      </div>
      <div className="doughnut-chart-container">
        {noData ? (
          <div className="no-data">No records to display</div>
        ) : (
          <DoughnutChart
            chartData={deepCopy.data}
            backgroundColor={backgroundColor}
            labels={deepCopy.labels}
            roundedToTwoDecimal_DatasetList={roundedToTwoDecimal_DatasetList}
            dataSum={dataSum}
            padding={getPadding()}
            redraw={redraw}
          />
        )}
        <div className="legend-container-outer">
          <div className="legend-container-inner">
            {dataset.labels &&
              dataset.labels.length > 0 &&
              dataset.labels.map((item, index) =>
                getLegendDisplay(item, index)
              )}
          </div>
        </div>
      </div>
      <MultiColorBar category={active} profitPercentage={profitPercentage} />
    </Wrapper>
  );
};

export default SideChart;
