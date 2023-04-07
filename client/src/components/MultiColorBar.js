import Wrapper from "../assets/wrappers/MultiColorBar.js";
import { useAppContext } from "../context/appContext.js";

const MultiColorBar = ({ category, profitPercentage }) => {
  const { dashboardTable_TotalSales, dashboardTable_TotalExpenses } =
    useAppContext();
  const expensesPercentage =
    dashboardTable_TotalExpenses && dashboardTable_TotalSales
      ? (
          (dashboardTable_TotalExpenses / dashboardTable_TotalSales) *
          100
        ).toFixed(0)
      : 0;
  let categoryControl =
    category === "Sales"
      ? {
          denominator: profitPercentage,
          name: "Profits",
          value: profitPercentage,
        }
      : {
          denominator: expensesPercentage,
          name: "Expenses",
          value: expensesPercentage,
        };
  const denominator = categoryControl.denominator;

  let txtAlign = { textAlign: "center" };
  const getDenominatorValue = (denominator) => {
    let value = (100 - denominator).toFixed(0);
    if (value >= 0 && value <= 100) return value;
    if (value > 100) return 100;
    return 0;
  };
  const filterValue = (value) => {
    if (value < 0 ) {
      txtAlign.textAlign = 'left'
      return 100;
    }
    if ( value > 100) {
      txtAlign.textAlign = 'right'
      return 100;
    }
    txtAlign.textAlign = 'center'
    return value;
  };
  let readings = [
    {
      name: categoryControl.name,
      value: categoryControl.value,
      color: "#495057",
      key: 0,
    },
    {
      name: "Sales",
      value: getDenominatorValue(denominator),
      color: "#adb5bd",
      key: 1,
    },
  ];
  let values =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      return (
        <div
          className="value"
          style={{
            color: item.color,
            width: filterValue(item.value) + "%",
            maxWidth: "100%",
            textAlign: txtAlign.textAlign
          }}
          key={i}
        >
          <span>{item.value}%</span>
        </div>
      );
    });

  let calibrations =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      return (
        <div
          className="graduation"
          style={{
            color: item.color,
            width: filterValue(item.value) + "%",
            maxWidth: "100%",
            textAlign: txtAlign.textAlign
          }}
          key={i}
        >
          <span>|</span>
        </div>
      );
    });
  let bars =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      let value = item.value < 0 ? 0 : item.value;
      return (
        <div
          className="bar"
          style={{ width: value + "%", maxWidth: "100%" }}
          key={i}
        >{i === 0 && <span className="tooltiptext top">{item.name}: {value}%</span>}</div>
      );
    });

  let legends =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      return (
        <div className="legend" key={i}>
          <span className="dot" style={{ color: item.color }}>
            ●
          </span>
          <span className="label">{item.name}</span>
        </div>
      );
    });

  return (
    <Wrapper>
      <div className="overview-title tooltip">
        <h6>Ratio</h6>
        <span className="tooltiptext right">ratio is {category === 'Sales'? 'profits' : 'expenses'} divided by sales</span>
      </div>
      <div className="multicolorbar-container">
        <div className="bars tooltip">{bars == "" ? "" : bars}</div>
        <div className="scale">{calibrations == "" ? "" : calibrations}</div>
        <div className="values">{values == "" ? "" : values}</div>
        <div className="legends">{legends == "" ? "" : legends}</div>
      </div>
    </Wrapper>
  );
};

export default MultiColorBar;
