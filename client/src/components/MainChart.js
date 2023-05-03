import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext.js";
import { Wrapper } from "../assets/wrappers/MainChart.js";
import ChartJs from "./Chart.js";
import { useFullscreen } from "../context/fullscreenContext.js";
import FormRowDropDown from "./FormRowDropDown.js";
import NoDataMessage from "./NoDataMessage.js";
import FullscreenToggle from "./FullscreenToggle.js";

const getViewByOptions = (monthsDuration, weeksDuration) => {
  let options = ["Day"];
  if (monthsDuration >= 2) options.push("Month");
  if (weeksDuration >= 2) options.push("Week");
  return options;
};
const setInitialViewBy = (weeksDuration, monthsDuration, setViewBy) => {
  if (weeksDuration >= 4) {
    setViewBy("Week");
  } else if (monthsDuration >= 5) {
    setViewBy("Month");
  } else {
    setViewBy("Day");
  }
};

const MainChart = () => {
  const { noData, monthsDuration, weeksDuration, screenSize } = useAppContext();
  const [chartType, setChartType] = useState("line");
  const [viewBy, setViewBy] = useState("");

  useEffect(() => {
    setInitialViewBy(weeksDuration, monthsDuration, setViewBy);
  }, [weeksDuration, monthsDuration]);

  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } =
    useFullscreen();

  const viewByOptions = getViewByOptions(monthsDuration, weeksDuration);

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
          list={viewByOptions}
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
        <FullscreenToggle
          screenSize={screenSize}
          fullscreenActive={fullscreenActive}
          enterFullscreen={enterFullscreen}
          exitFullscreen={exitFullscreen}
        />
      </div>

      {noData ? (
        <NoDataMessage />
      ) : (
        <ChartJs chartType={chartType} viewBy={viewBy} />
      )}
    </Wrapper>
  );
};
export default MainChart;
