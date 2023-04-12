import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext.js";
import { Wrapper } from "../assets/wrappers/MainChart.js";
import {
  MdWidgets,
  MdOpenInFull,
  MdOutlineCloseFullscreen,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Button from "./Button.js";
import ChartJs from "./Chart.js";
import { useFullscreen } from "../context/fullscreenContext.js";
const MainChart = () => {
  const { noData, monthsDuration, yearsDuration } = useAppContext();

  const viewByOptions = () => {
    let options = ["Daily"];
    if (monthsDuration >= 2) options.push("Monthly");

    if (yearsDuration >= 2) options.push("Yearly");
    return options;
  };
  const [chartType, setChartType] = useState("line");
  const [dropDown, setDropDown] = useState(false);
  const [viewBy, setViewBy] = useState("");

  useEffect(() => {
    if (yearsDuration >= 2) {
      setViewBy("Yearly");
    } else if (monthsDuration >= 5) {
      setViewBy("Monthly");
    } else {
      setViewBy("Daily");
    }  
  },[yearsDuration, monthsDuration])

  
  const { fullscreenRef, enterFullscreen, exitFullscreen, fullscreenActive } =
    useFullscreen();

  return (
    <Wrapper ref={fullscreenRef} className="item-box">
      <div className="header-wrapper">
        <div className="title-wrapper">
          <h6>General Activities</h6>
        </div>
        <div className="viewby-container">
          {/* <label htmlFor="view-by">View By:</label> */}
          <select
            id="view-by"
            className="no-border"
            onChange={(e) => setViewBy(e.target.value)}
            value={viewBy}
          >
            {viewByOptions().map((item) => {
              return (
                <option key={`viewby-${item}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <MdKeyboardArrowDown />
        </div>
        <div
          className={`chart-settings-icon tooltip ${dropDown ? "hide" : ""}`}
          onClick={() => setDropDown(!dropDown)}
          onBlur={() => setDropDown(false)}
          tabIndex="1"
        >
          <MdWidgets />
          <span className="tooltiptext bottom">chart type</span>
        </div>
        {dropDown && (
          <div className="dropdown chart-btn-height">
            <Button
              classList="dropdown-btn"
              title="bar chart"
              onSetActive={() => setChartType("bar")}
            />
            <Button
              title="line chart"
              classList="dropdown-btn"
              onSetActive={() => setChartType("line")}
            />
          </div>
        )}
        {fullscreenActive ? (
          <div className="chart-settings-icon tooltip" onClick={exitFullscreen}>
            <MdOutlineCloseFullscreen />
            <span className="tooltiptext bottom">Exit full screen</span>
          </div>
        ) : (
          <div
            className="chart-settings-icon tooltip"
            onClick={enterFullscreen}
          >
            <MdOpenInFull />
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
