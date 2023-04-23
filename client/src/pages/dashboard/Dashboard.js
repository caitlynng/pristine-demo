import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
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

  useEffect(() => {
    // a "-" in date will give RangeError: Invalid Date (Safari & Firefox)
    handleDateChange();
  }, []);


  const compareToList = ["Last week", "Last month", "Last Year"];
  return (
    <Wrapper className="max-width flex flex-column">
      {isLoading && <Loading />}
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Dashboard</h4>
      </div>
      <StatsContainer />
      <section className="section-container flex-1">
        <div className="flex align-center justify-end flex-wrap padding-0-1">
          <h5 className="margin-auto-r">Sales activities</h5>
          <div className="flex flex-nowrap align-center">
            <DatePicker />
            <FormRowDropDown
              labelText="compare to"
              name="compareTo"
              list={compareToList}
              inputType="radio"
            />
          </div>
        </div>
        <div className="chart-container">
          <MainChart />
          <SideChart />
        </div>
      </section>
    </Wrapper>
  );
};

export default Dashboard;
