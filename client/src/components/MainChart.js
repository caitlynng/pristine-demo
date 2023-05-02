import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext.js";
import { Wrapper } from "../assets/wrappers/MainChart.js";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import ChartJs from "./Chart.js";
import { useFullscreen } from "../context/fullscreenContext.js";
import FormRowDropDown from "./FormRowDropDown.js";
const MainChart = () => {
  const { noData, monthsDuration, weeksDuration, screenSize } = useAppContext();

  const viewByOptions = () => {
    let options = ["Day"];
    if (monthsDuration >= 2) options.push("Month");

    if (weeksDuration >= 2) options.push("Week");
    return options;
  };
  const [chartType, setChartType] = useState("line");
  const [viewBy, setViewBy] = useState("");

  useEffect(() => {
    if (weeksDuration >= 4) {
      setViewBy("Week");
    } else if (monthsDuration >= 5) {
      setViewBy("Month");
    } else {
      setViewBy("Day");
    }
  }, [weeksDuration, monthsDuration]);

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
      <div className="header-wrapper flex align-center">
        <FormRowDropDown
          labelText="View By"
          name="viewBy"
          list={viewByList}
          inputType="radio"
          onClickHandle={viewByHandle}
          id="viewBy"
          defaultChecked={viewBy}
        />

        <FormRowDropDown
          labelText="Chart Type"
          name="chartType"
          list={["Line", "Bar"]}
          inputType="radio"
          onClickHandle={chartTypeHandle}
          id="chartType"
          defaultChecked={chartType}
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
        <div className="no-data flex align-center justify-center">No records to display</div>
      ) : (
        <ChartJs chartType={chartType} viewBy={viewBy} />
      )}
    </Wrapper>
  );
};
export default MainChart;
