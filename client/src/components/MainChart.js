import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext.js";
import { Wrapper } from "../assets/wrappers/MainChart.js";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import ChartJs from "./Chart.js";
import { useFullscreen } from "../context/fullscreenContext.js";
import FormRowDropDown from "./FormRowDropDown.js";
const MainChart = () => {
  const { noData, monthsDuration, yearsDuration, screenSize } = useAppContext();

  const viewByOptions = () => {
    let options = ["Daily"];
    if (monthsDuration >= 2) options.push("Monthly");

    if (yearsDuration >= 2) options.push("Yearly");
    return options;
  };
  const [chartType, setChartType] = useState("line");
  const [viewBy, setViewBy] = useState("");

  useEffect(() => {
    if (yearsDuration >= 2) {
      setViewBy("Yearly");
    } else if (monthsDuration >= 5) {
      setViewBy("Monthly");
    } else {
      setViewBy("Daily");
    }
  }, [yearsDuration, monthsDuration]);

  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } =
    useFullscreen();

  const viewByList = viewByOptions();

  const viewByHandle = (val) => {
    setViewBy(val);
  };
  const chartTypeHandle = (val) => {
    setChartType(val.toLowerCase());
  };

  return (
    <Wrapper ref={fullscreenRef} className="item-box mainchart-joyride">
      <div className="header-wrapper">
        <FormRowDropDown
          labelText="View By"
          name="viewBy"
          list={viewByList}
          inputType="radio"
          onClickHandle={viewByHandle}
          id="viewBy"
        />

        <FormRowDropDown
          labelText="Chart Type"
          name="chartType"
          list={["Line", "Bar"]}
          inputType="radio"
          onClickHandle={chartTypeHandle}
          id="chartType"
        />

        {screenSize <= 450 ? null : fullscreenActive && screenSize >= 450 ? (
          <div className="chart-settings-icon tooltip" onClick={exitFullscreen}>
            <RiFullscreenExitLine />
            <span className="tooltiptext bottom">Exit full screen</span>
          </div>
        ) : (
          <div
            className="chart-settings-icon tooltip"
            onClick={enterFullscreen}
          >
            <RiFullscreenLine />
            <span className="tooltiptext bottom">Enter full screen</span>
          </div>
        )}
      </div>

      {noData ? (
        <div className="no-data">No records to display</div>
      ) : (
        <ChartJs chartType={chartType} viewBy={viewBy} />
      )}
    </Wrapper>
  );
};
export default MainChart;
