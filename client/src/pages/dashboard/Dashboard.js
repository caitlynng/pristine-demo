import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Dashboard";
import {
  StatsContainer,
  Loading,
  MainChart,
} from "../../components";
import SideChart from "../../components/SideChart";
import FormRowDropDown from "../../components/FormRowDropDown";

const Dashboard = () => {
  const { handleDateChange, isLoading } = useAppContext();

  useEffect(() => {
    // a "-" in date will give RangeError: Invalid Date (Safari & Firefox)
    handleDateChange();
  }, []);

  const compareToList = ["Last week", "Last month", "Last Year"];
  return (
    <Wrapper className="max-width dashboard-joyride flex flex-column">
      {isLoading && <Loading />}
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Dashboard</h4>
      </div>
      <StatsContainer />
      <section className="section-container flex-1">
        <div className="flex align-center justify-end flex-wrap padding-1">
          <h5 className="margin-auto-r">Sales activities</h5>
          <div className="flex flex-nowrap align-center">
           
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
