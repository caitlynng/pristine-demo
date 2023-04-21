import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useWindowDimensions } from "../../utils/Helpers";
import banner from "../../assets/images/banner.svg";
import SVG from "react-inlinesvg";
import Wrapper from "../../assets/wrappers/Dashboard";
import {
  DatePicker,
  StatsContainer,
  Loading,
  OverviewChart,
  MainChart,
} from "../../components";
import SideChart from "../../components/SideChart";
import FormRowDropDown from "../../components/FormRowDropDown";

const Dashboard = () => {
  const { handleDateChange, isLoading, handleScreenResize } = useAppContext();

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // a "-" in date will give RangeError: Invalid Date (Safari & Firefox)
    handleDateChange();
  }, []);

  useEffect(() => {
    if (width) handleScreenResize(width);
  }, [width]);

  const compareToList = ["Last week", "Last month", "Last Year"];
  return (
    <Wrapper className="max-width">
      {isLoading && <Loading />}
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Dashboard</h4>
      </div>
      {/* overview */}
      <section className="section-container">
        <div className="flex align-center justify-end">
          <h5 className="margin-auto-r">Sales activities</h5>
          <DatePicker />
          <FormRowDropDown
            labelText="compare to"
            name="compareTo"
            list={compareToList}
            inputType="radio"
          />
        </div>
        <div className="chart-container">
          <MainChart />
          <SideChart />
        </div>
      </section>
      {/* <StatsContainer /> */}
    </Wrapper>
  );
};

export default Dashboard;
