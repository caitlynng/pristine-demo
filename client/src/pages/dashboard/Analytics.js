import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useWindowDimensions } from "../../utils/Helpers";
import banner from "../../assets/images/banner.svg";
import SVG from "react-inlinesvg";
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
      <div className="banner-container item-box">
        <div className="banner-content">
          <h4>Welcome!</h4>
          <p> You're viewing the Demo Version of Pristine. </p>
        </div>
        <SVG src={banner} alt="banner" />
      </div>
      <StatsContainer />
      <MainChart />
      <OverviewPanel />
    </Wrapper>
  );
};

export default Analytics;
