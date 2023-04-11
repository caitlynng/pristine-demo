import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useWindowDimensions } from "../../utils/Helpers";

import Wrapper from "../../assets/wrappers/Analytics";
import {
  DatePicker,
  StatsContainer,
  Loading,
  OverviewPanel,
  MainChart,
} from "../../components";

const Analytics = () => {
  const { handleDateChange, isLoading, handleScreenResize } = useAppContext();

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // a "-" in date will give RangeError: Invalid Date (Safari & Firefox)
    handleDateChange();
  }, []);

  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  return (
    <Wrapper className="max-width">
      {isLoading && <Loading />}
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Dashboard</h4>
        <div className="date-picker-container">
          <DatePicker />
        </div>
      </div>
      <div className="analytics__banner item-box"></div>
      <StatsContainer />
      <MainChart />
      <OverviewPanel />
    </Wrapper>
  );
};

export default Analytics;
